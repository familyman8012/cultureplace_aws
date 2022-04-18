import React, {
  useCallback,
  useState,
  useRef,
  Dispatch,
  SetStateAction
} from "react";
import axios from "axios";
import { runInAction } from "mobx";
import { observer } from "mobx-react";
import { QuillStore } from "@src/mobx/store";
import * as tus from "tus-js-client";
import QuillEditorView from "@components/modules/QuillEditor/QuillEditorView";
import Button from "@components/elements/Button";
import { WrapLessonAdd, WrapSendFile } from "./styles";

interface ILessonLayer {
  state: string;
  show: boolean;
  selectIndex: number;
}

export interface ILayerLessonAdd {
  lessonLayer: ILessonLayer;
  _id: string;
  curriculumId: string;
  delMediaId: string;
  setLessonLayer: Dispatch<SetStateAction<ILessonLayer>>;
  refetch: () => void;
}

function LayerLessonAdd({
  lessonLayer,
  _id,
  curriculumId,
  delMediaId,
  setLessonLayer,
  refetch
}: ILayerLessonAdd) {
  let mediaId: string;
  let mediaTime: number;

  //파일올리기
  const [file, setFile] = useState<File>();
  const [percent, setPercent] = useState(0);

  const resetRef = useRef<HTMLInputElement>(null);

  const handlerWrite = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    runInAction(() => {
      QuillStore.titleData = e.target.value;
    });
  }, []);

  //비디오 파일 선택
  const onVideoSelectHadler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      setFile(e.target.files[0]);
    },
    []
  );

  //레슨추가
  const handlerLessonButton = (buttonTitle: string) => {
    if (!file) {
      return alert("동영상을 등록하셔야 합니다.");
    }
    // Create a new tus upload
    var upload =
      file &&
      new tus.Upload(file, {
        endpoint: `https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT}/stream`,
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLOUDFLARE_TOKEN}`
        },
        //resume: true,
        chunkSize: 50 * 1024 * 1024, // Required a minimum chunk size of 5MB, here we use 50MB.
        metadata: {
          name: QuillStore.titleData,
          filename: file.name,
          filetype: file.type
        },
        onError: function (error) {
          throw error;
        },
        onProgress: function (bytesUploaded, bytesTotal) {
          var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
          setPercent(Number(percentage));
        },
        onSuccess: async function () {
          if (buttonTitle === "add") {
            addLessonFunc();
          } else if (buttonTitle === "mod") {
            modLessonFunc();
          }
        },
        onAfterResponse: function (req, res) {
          return new Promise<void>(resolve => {
            var mediaIdHeader = res.getHeader("stream-media-id");
            if (mediaIdHeader) {
              mediaId = mediaIdHeader;
            }
            if (file) {
              var objectUrl = URL.createObjectURL(file);
              document.getElementById("vid")?.setAttribute("src", objectUrl);
              document
                .getElementById("vid")
                ?.addEventListener("loadedmetadata", function () {
                  mediaTime = Math.round(
                    (document.getElementById("vid") as HTMLMediaElement)
                      ?.duration
                  );
                });
            }
            resolve();
          });
        }
      });

    // 계속하려면 이전 업로드가 있는지 확인하세요.
    upload &&
      upload
        .findPreviousUploads()
        .then(function (previousUploads: string | any[]) {
          // 이전 업로드를 찾았으므로 첫 번째 업로드를 선택합니다.
          if (previousUploads.length) {
            upload && upload.resumeFromPreviousUpload(previousUploads[0]);
          }

          // 업로드 시작
          upload && upload.start();
        });
  };

  const modAxios = () => {
    axios
      .patch(
        `/api/lesson/${_id}?curriculumId=${curriculumId}&lessonIndex=${lessonLayer.selectIndex}`,
        {
          lessons: {
            title: QuillStore.titleData,
            content: QuillStore.data,
            mediaId,
            mediaTime,
            filename: file?.name
          }
        }
      )
      .then(res => {
        refetch();
        lessonLayerClose();
        alert("레슨수정이 완료되었습니다.");
      });
  };

  const addLessonFunc = () => {
    axios
      .post(`/api/lesson/${_id}?curriculumId=${curriculumId}`, {
        lessons: {
          title: QuillStore.titleData,
          content: QuillStore.data,
          mediaId,
          mediaTime,
          filename: file?.name
        }
      })
      .then(res => {
        refetch();
        lessonLayerClose();
        alert("레슨추가가 완료되었습니다.");
      });
  };

  const modLessonFunc = () => {
    // alert(lessonLayer.selectId);
    axios
      .delete(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT}/stream/${delMediaId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLOUDFLARE_TOKEN}`
          }
        }
      )
      .then(res => {
        modAxios();
      })
      .catch(error => {
        if (error.response.status === 404) {
          modAxios();
        }
      });
  };

  //reset
  const lessonLayerClose = () => {
    QuillStore.titleData = "";
    QuillStore.data = "";
    mediaId = "";
    mediaTime = 0;
    setFile(undefined);
    setPercent(0);
    if (resetRef.current) {
      resetRef.current.value = "";
    }
    setLessonLayer({ state: "", show: false, selectIndex: 0 });
  };

  return (
    <WrapLessonAdd>
      <div className="head">
        <input
          type="text"
          name="title"
          onChange={handlerWrite}
          value={QuillStore.titleData || ""}
          placeholder="제목"
        />
        <button onClick={lessonLayerClose}>x</button>
      </div>
      <div className="cont">
        <video controls width="500px" id="vid" />
        <QuillEditorView category="vod등록" />
        <div className="box_inp_file">
          <input
            type="file"
            id="upload"
            ref={resetRef}
            className="image-upload"
            onChange={onVideoSelectHadler}
          />
        </div>
        <WrapSendFile percent={percent}>
          <div className="bar"></div>
          <span className="txt">전송율 {percent}%</span>
        </WrapSendFile>
      </div>
      <div className="box_btn_group">
        {lessonLayer.state === "add" ? (
          <Button
            color="submit"
            size="xs"
            width="100px"
            onClick={() => handlerLessonButton("add")}
          >
            추가
          </Button>
        ) : (
          <Button
            color="submit"
            size="xs"
            width="100px"
            onClick={() => handlerLessonButton("mod")}
          >
            수정
          </Button>
        )}
      </div>
    </WrapLessonAdd>
  );
}

export default observer(LayerLessonAdd);

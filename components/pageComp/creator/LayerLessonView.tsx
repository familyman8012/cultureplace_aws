import { Dispatch, SetStateAction } from "react";
import { Stream } from "@cloudflare/stream-react";
import { ILesson } from "@src/typings/db";
import { WrapLessonDetailView } from "./styles";

interface ILayerLessonView {
  showDetailLesson: ILesson;
  setShowDetailLesson: Dispatch<SetStateAction<ILesson | undefined>>;
}

function LayerLessonView({
  showDetailLesson,
  setShowDetailLesson
}: ILayerLessonView) {
  return (
    <WrapLessonDetailView>
      <div className="head">
        <div>{showDetailLesson?.title}</div>
        <button
          className="close"
          onClick={() => setShowDetailLesson(undefined)}
        >
          x
        </button>
      </div>
      <div>mediaId : {showDetailLesson?.mediaId}</div>
      <div>mediaTime : {showDetailLesson?.mediaTime}</div>
      <div>filename : {showDetailLesson?.filename}</div>
      {showDetailLesson && (
        <>
          <div className="video_area">
            <Stream controls src={showDetailLesson.mediaId} />
          </div>
          <div className="cont_txt">
            <div
              dangerouslySetInnerHTML={{ __html: showDetailLesson.content }}
            />
          </div>
        </>
      )}
    </WrapLessonDetailView>
  );
}

export default LayerLessonView;

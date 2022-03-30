// @ts-nocheck
import { useState, useEffect, useRef } from "react";
import ReactS3Client from "react-aws-s3-typescript";
import { QuillStore } from "@/../src/mobx/store";
import { QuillStyle } from "./styles";

import dayjs from "dayjs";

export default function QuillEditor({ mountBody }) {
  const quillElement = useRef();
  const quillInstance = useRef();

  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [quillView, setQuillView] = useState(false);

  useEffect(() => {
    setQuillView(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      /* isLoaded가 true인 상태에서 rerenderBody를 통해 body 적용시 Quill 초기화 없이
               innerHTML만 body로 바꿉니다. 이 조건이 없을 시 툴바가 중복되어 여러 개 나타나게
               됩니다. */
      const quill = quillInstance.current;
      quill.root.innerHTML = QuillStore.data;
      return;
    }
    if (quillElement.current && window.Quill) {
      /* isLoaded가 false일 때는 Quill을 초기화합니다. */

      /* hr 태그생성 */
      var Embed = Quill.import("blots/block/embed");
      class Hr extends Embed {
        static create(value) {
          let node = super.create(value);
          // give it some margin
          node.setAttribute(
            "style",
            "width:100%;border-bottom:1px solid #f3f3f6;"
          );
          return node;
        }
      }

      Hr.blotName = "hr"; //now you can use .ql-hr classname in your toolbar
      Hr.className = "hr";
      Hr.tagName = "hr";

      var customHrHandler = function () {
        // get the position of the cursor
        var range = quill.getSelection();
        if (range) {
          // insert the <hr> where the cursor is
          quill.insertEmbed(range.index, "hr", "null");
        }
      };

      /* Quill 옵션을 원하는 대로 수정하세요. */
      const toolbarOptions = {
        container: [
          [{ size: ["small", false, "large", "huge"] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ align: [] }],
          ["bold", "italic", "underline", "strike"], // toggled buttons
          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }], // superscript/subscript
          [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
          [{ direction: "rtl" }], // text direction
          ["clean"], // remove formatting button
          [
            "table",
            "hr",
            "blockquote",
            "link",
            "code-block",
            "formula",
            "image",
            "video"
          ] // media
        ],
        handlers: {
          hr: customHrHandler
        }
      };
      Quill.register({
        "formats/hr": Hr
      });
      Quill.register(
        {
          "modules/tableUI": quillTableUI.default
        },
        true
      );

      Quill.register("modules/htmlEditButton", htmlEditButton);
      quillInstance.current = new window.Quill(quillElement.current, {
        modules: {
          history: {
            delay: 2000,
            maxStack: 500,
            userOnly: true
          },
          // syntax: true,
          toolbar: toolbarOptions,
          htmlEditButton: {},
          table: true,
          tableUI: true,
          imageResize: {
            // See optional "config" below
            modules: ["Resize", "DisplaySize"]
          }
        },
        placeholder: "본문 입력",
        theme: "snow"
      });

      const quill = quillInstance.current;

      // 이미지 S3에 보냄.
      const toolbar = quill.getModule("toolbar");
      console.log("toolbar", toolbar);
      toolbar.addHandler("image", () => {
        onClickImageBtn();
      });

      // s3 upload setting start
      const onClickImageBtn = () => {
        // s3 upload setting
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = function (e) {
          const file = input.files[0];
          const nowDate = dayjs(Date.now()).format("YYMMDDHHMM");
          const fileName = `${nowDate}_${file?.name.replace(
            /(.png|.jpg|.jpeg|.gif)$/,
            ""
          )}`;

          const s3Config = {
            bucketName: "cultureplace",
            dirName: QuillStore.dir,
            region: "ap-northeast-2",
            accessKeyId: String(process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID),
            secretAccessKey: String(
              process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY
            )
          };

          const s3 = new ReactS3Client(s3Config);
          const filename = "filename-to-be-uploaded";

          s3.uploadFile(file, fileName).then(data => {
            if (data.status === 204) {
              //커서 위치 받아오기 위함.
              const range = quillInstance.current.getSelection(true);
              // 1.현재 커서 위치에 2. 이미지를 3.src="" 로 나타냄.
              quillInstance.current.insertEmbed(
                range.index,
                "image",
                `${data.location}`
              );

              // 이미지 업로드 후 커서 이미지 한칸 옆으로 이동.
              quillInstance.current.setSelection(range.index + 1);
            } else {
              alert("error");
            }
          });
        };
      };

      quill.root.setAttribute("spellcheck", "false");

      // 초기 body state 적용
      quill.root.innerHTML = QuillStore.data;
      //quill.root.innerHTML = `<h2>지금까지 자기계발서는 다 소용없었다는 분들! 주목!</h2><p><br></p><p>"대박이었습니다!!!!! 100점 만점에 1500점 드리고 싶습니다."</p><p>"앞으로 제 커리어가 나름 성공한다면 봉준 님 덕이 클 거 같습니다!"</p><p>"커리어를 어떻게 발전시켜 나갈 지에 대한 방향성을 잡을 수 있어서 좋았습니다."</p><p><br></p><p>진짜 행복하고 탁월해질 수 있는 커리어를 준비하고 계신가요? 무엇을 할 때 가장 즐겁고 행복한가요? 나답게 산다는 것은 무엇일까요? 나를 한 문장으로 표현한다면?</p><p><br></p><p>살면서 꼭 한 번은 마주해야 할 질문입니다. 그러나 자기 자신을 잘 모른다면 이 질문에 답하기란 쉽지 않죠. 인생의 중요한 선택인 커리어를 준비하는 것은 생각보다 매우 긴 여정입니다. 단순히 전공을 선택하거나 첫 직장을 선택할 때 끝나지 않습니다.</p><p><br></p><p>그럼 커리어의 여정을 잘 준비하려면 어떻게 해야 할까요?</p><p><br></p><p>1. 내가 진짜 좋아하는 것은 무엇인지 2. 어떤 방식으로 일할 때, 탁월해질 수 있는지 3. 어떨 때 몰입하고, 만족감을 느끼는지 정확하게 파악하고 의도적으로 활용하는 것이 필요합니다.</p><p><br></p><p>하지만 일상에 치여 온전히 자신에게 집중할 시간이 없는 우리에게, 커리어의 여정을 다듬어 가기란 쉽지 않지요. 태니지먼트 대표 김봉준 클럽장님과 함께 #나다움 #커리어 #탁월함&amp;성장 #일의의미 #행복한직장생활 등에 대한 답을 찾아보아요!</p><p><br></p><h3>어떤 사람들과 함께 하나요?</h3><p><br></p><ol><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span> 진짜 자신이 좋아하고 잘하는 일에 관심이 많은 사람들</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span> 자신에 대한 막연하게 아는 것을 떠나 자신에 대해 진지하게 탐구할 사람들</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span> 강점을 기반으로 자신의 커리어를 한 단계 한 단계 구체적으로 설계하고 싶은 사람들</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span> 일에 대한 의미를 스스로 정의하고 만족스러운 커리어를 준비하고 싶은 사람들</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span> 자신만의 강점으로 탁월한 일잘러가 되고 싶은 사람들</li></ol><p><br></p><hr class="hr" style="width:100%;border-bottom:1px solid #f3f3f6;"><h2><br></h2><h2>클럽장 김봉준 님은</h2><h2><br></h2><h2 class="ql-align-center"><img src="https://cultureplace.s3-ap-northeast-2.amazonaws.com/notice/2110291110_c4ee11aa-ec58-4dc2-8921-a9d9955f6e7c.김봉준님.jpeg" width="136"></h2><p><br></p><ol><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span> 개인의 강점을 진단하고 개발할 수 있는 커리어 컨설팅 및 기업HR 컨설팅을 제공하는 태니지먼트를&nbsp;운영하고 있습니다.</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span> 개인의 강점을 진단하는 TANAGEMENT Wheel©을 개발했습니다.</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span> SKT, 카카오, 대학내일, 클래스101 등 50개 기업/공공기관/대학에서 강점 개발 및 리더십 강의를 진행하고 있습니다.&nbsp;</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span> 이랜드에서 그룹 인재개발 팀장을 하면서 인재 육성 및 커리어 코칭을 주로 진행하였습니다. 또한 조직의 강점개발 및 몰입도 향상 프로젝트를 진행하였습니다.</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span> 강점 기반의 커리어 개발 및 조직 운영에 대한 책 <a href="https://book.naver.com/bookdb/book_detail.nhn?bid=15876319" target="_blank" style="color: rgb(23, 120, 181); background-color: transparent;"> 『강점 발견』</a> 을 썼습니다.</li></ol><p><br></p><hr class="hr" style="width:100%;border-bottom:1px solid #f3f3f6;"><p><br></p><h2>첫 모임의 읽을거리는?</h2><p><br></p><p class="ql-align-center"><img src="https://cultureplace.s3-ap-northeast-2.amazonaws.com/notice/2110291110_0100022299885-00.jpeg" width="200"></p><p class="ql-align-center"><a href="https://search.daum.net/search?w=bookpage&amp;bookId=5145586&amp;q=%EA%B0%95%EC%A0%90+%EB%B0%9C%EA%B2%AC" target="_blank" style="color: rgb(30, 63, 255); background-color: transparent;"> 강점 발견</a></p><p class="ql-align-center">김봉준, 장영학</p><p class="ql-align-center"><br></p><p>우리는 저마다 타고난 강점이 있습니다. 이것을 제대로 발견하고 적절히 노력하면 탁월한 성취와 성과를 거머쥘 수 있는데요. 이처럼 중요한 강점에 대해 우리는 제대로 알고 있는 걸까요?</p><p><br></p><p><span class="ql-size-small" style="color: rgb(136, 136, 136);"> ※첫 책 이후 함께 읽을 거리는 멤버들의 논의와 투표를 통해 선정됩니다. 클럽장 클럽이나 일부 클럽의 경우, 읽을거리가 정해져 있는 클럽이 있을 수 있습니다.</span></p><p><br></p><hr class="hr" style="width:100%;border-bottom:1px solid #f3f3f6;"><p><br></p><h2>앞으로 4개월 동안 우리 클럽은 이런 걸 할 거예요.</h2><p><br></p><p class="ql-align-center"><img src="https://cultureplace.s3-ap-northeast-2.amazonaws.com/notice/2110291110_book.png" width="366"></p><p>두 번째 모임</p><p>📖 이항심, 『시그니처』</p><p>이항심 진로심리 전문가가 이 책에서 말하는 '시그니처'는 남과 다른 나만의 고유성, 강점을 뜻합니다. 저자가 직접 기업인 등 리더들을 인터뷰해 그들의 '시그니처'는 무엇인지 알아 보았습니다.</p><p>세 번째 모임</p><p>📖&nbsp;피터 드러커, 『자기경영노트』</p><p>일 잘하는 사람은 타고나는 것이 아니라 만들어진다? 지식근로자를 위한 변화와 혁신의 5가지 법칙!</p><p><br></p><p>네 번째 모임</p><p>📖 최인철, 『굿 라이프』</p><p>우리가 가지고 있던 행복에 관한 오해들을 바로잡고,&nbsp;각자가 가지고 있는 행복 프레임을 들여다보고, 나아가 자신의 삶에 대해 각자가 가지고 있는 인생 프레임을 스스로 점검해 봅시다.</p><p><br></p><hr class="hr" style="width:100%;border-bottom:1px solid #f3f3f6;"><p class="ql-align-center"><br></p><p><span style="background-color: rgb(255, 255, 255); color: rgb(255, 132, 0);">우린 이렇게 달라질 거예요</span></p><h2>나 자신을 제대로 알고, 쓸 줄 알게 됩니다.</h2><p><br></p><ol><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span> 나 자신을 제대로 파악하게 됩니다.</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span> 자신이 어떤 사람인지 알아야 본인이 하는 일부터 업무 환경, 일하는 방식까지 빠르게 정의내릴 수 있고, 진짜 만족감을 찾을 수 있습니다.</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span> 지금까지 수많은 자기계발 관련 책이나 강연을 들어도 해소가 되지 않았던 분들이라면, 나다운 강점에서 시작하여 커리어를 찾아가는 여정을 함께 떠나 보시죠!</li></ol>`;

      /* quill에서 text-change 이벤트 발생시에 setBody(innerHTML)을 통해 body를 업데이트합니다.
               body가 업데이트되어도 useEffect 발생 조건 인자([isError, mountBody])에 body가 없으므로
               QuillEditor 컴포넌트는 다시 렌더링되지 않습니다. 이는 입력 중 커서가 맨 앞으로 이동하는
               문제를 방지합니다. 대신 외부에서 body가 수정되어도 rerenderBody가 호출되지 않으면 변경된
               body가 적용되지 않습니다. */
      quill.on("text-change", () => {
        //handleQuillChange(quill.root.innerHTML);
        QuillStore.data = quill.root.innerHTML;
      });

      setIsLoaded(true);
    } else {
      /* quill.min.js가 로드되어 있지 않아 window.Quill이 undefined이면 isError가
               계속 변경되면서 재시도합니다. */
      setIsError(prevIsError => !prevIsError);
    }
  }, [isLoaded, isError, mountBody]);

  if (!quillView)
    return (
      <div
        style={{ display: "flex", height: "200px", justifyContent: "center" }}
      >
        ...로딩중
      </div>
    );
  return (
    <QuillStyle>
      <div ref={quillElement}></div>
    </QuillStyle>
  );
}

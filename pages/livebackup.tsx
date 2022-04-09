import React, {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import StreamChat from "../components/modules/StreamChat";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import { Stream, StreamPlayerApi } from "@cloudflare/stream-react";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import Button from "@components/elements/Button";
import axios from "axios";
import { useLives } from "@src/hooks/api/useLive";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

function LiveStream() {
  const [session] = useSession();
  const router = useRouter();
  const [videoLoad, setVideoLoad] = useState({ Load: false, Loaded: false });
  const videoAreaRef: React.MutableRefObject<any> = useRef();

  //
  const { status, data, error, refetch } = useLives();

  console.log("uselive", data);

  //chat
  const [inputMessage, setInputMessage] = useState("");
  const [showRoom, setShowRoom] = useState({
    liveMain: true,
    liveRoom: false
  });
  const [roomName, setRoomName] = useState("");
  const [roomTItle, setRoomTitle] = useState("");
  const [roomList, setRoomList] = useState([]);

  //append chat
  const [chat, setChat] = useState([""]);

  // chat bottom
  //bottom
  const messageBoxRef = useRef<HTMLUListElement>(null);

  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  useEffect(() => {
    const socketInitializer = async () => {
      await fetch("/api/socket");
      socket = io({ reconnection: false });

      socket.on("connect", () => {
        console.log("connected");
      });

      // socket.on("update-input", (msg) => {
      //   setInput(msg);
      // });
      socket.on("welcome", (roomName, user, newCount) => {
        setRoomTitle(`Room ${roomName} (${newCount} People)`);
        addMessage(`<span class="notice">🎉 ${user} arrived!</span>`);
      });

      socket.on("bye", (room, left, newCount) => {
        setRoomTitle(`Room ${room} (${newCount})`);
        addMessage(`<span class="notice">🚶‍♂️${left} left ㅠㅠ</span>`);
      });

      socket.on("new_message", addMessage);

      socket.on("room_change", rooms => {
        setRoomList([]);
        if (rooms.length === 0) {
          setRoomList([]);
        }
        setRoomList(rooms);
      });

      return () => {
        socket.disconnect();
        socket.off("welcome");
        socket.off("bye");
        socket.off("new_message");
        socket.off("room_change");
      };
    };
    socketInitializer();
  }, []);

  //뒤로가기 막기
  useEffect(() => {
    const preventGoBack = () => {
      // change start
      history.pushState(null, "", location.href);
      // change end
      console.log("prevent go back!");
    };

    history.pushState(null, "", location.href);
    window.addEventListener("popstate", preventGoBack);

    return () => window.removeEventListener("popstate", preventGoBack);
  }, []);

  const onChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const addMessage = (message: string) => {
    console.log(message);
    setChat(previousMessages => [...previousMessages, message]);
  };

  const handleMessageSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    socket.emit("new_message", inputMessage, roomName);
    setInputMessage("");
  };

  // const handleRoomSubmit = (e) => {
  //   e.preventDefault();
  //   //socket.emit("input-change", e.target.value);
  //   socket.emit("enter_room", input, handlerShowRoom);
  //   setRoomName(input);
  //   setInput("");
  // };

  const handlerJoinBtn = () => {
    socket.emit("nickname", session?.user.name);
    socket.emit("enter_room", "live");
    setRoomName("live");
    setShowRoom({
      liveMain: false,
      liveRoom: true
    });
  };
  //chat end

  // 방송
  const [btnDisable, setbtnDisable] = useState(false);

  //방송시작
  const [liveStartData, setliveStartData] = useState<any>(null);
  const liveStart = useCallback(() => {
    setbtnDisable(true);
    axios
      .post(`/api/live`)
      .then((res: any) => {
        console.log(res);
        setliveStartData(res);
        setbtnDisable(false);
        refetch();
      })
      .catch(err => {
        console.log(err);
        setbtnDisable(false);
      });
  }, [refetch]);

  useEffect(() => {
    console.log(liveStartData);
  }, [liveStartData]);

  //방송삭제
  const liveDelete = useCallback(() => {
    setbtnDisable(true);
    axios
      .delete(
        `/api/live?liveid=${data && data[0]?.result?.uid}&dbid=${
          data && data[0]?._id
        }`
      )
      .then((res: any) => {
        console.log(res);
        setbtnDisable(false);
        refetch();
      })
      .catch(err => {
        console.log(err);
        setbtnDisable(false);
      });
  }, [data, refetch]);

  return (
    <div
      css={css`
        display: flex;
        max-width: 1650px;
        margin: 60px auto 0;
      `}
    >
      <div
        css={css`
          width: 70%;
          padding: 24px;
        `}
      >
        <div
          className="stream_area"
          css={css`
            position: relative;
            background: black;
            ${videoLoad.Loaded
              ? "height:auto !important"
              : `height:${videoAreaRef?.current?.offsetWidth * 0.563}px`}
          `}
          ref={videoAreaRef}
        >
          <iframe
            src={`https://iframe.videodelivery.net/${
              data && data[0]?.result?.uid
            }`}
            css={css`
              border: none;
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 100%;
            `}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen
          ></iframe>
          {/* <Stream
            controls
            src="dd37c67942b733e6babf2fd879b79e5a"
            responsive={true}
            onLoadStart={() => setVideoLoad({ Load: true, Loaded: false })}
            onLoadedMetaData={() => setVideoLoad({ Load: false, Loaded: true })}
            preload={true}
          /> */}
        </div>
        <div>
          {session?.user.role === "master" && (
            <div
              css={css`
                display: flex;
                margin: 20px 0;
                align-items: center;
              `}
            >
              OBS 설정을 위한 URL, streamkey 구하기
              {Number(data?.length) >= 1 ? (
                <Button
                  color="submit"
                  size="xs"
                  onClick={() => liveDelete()}
                  disabled={btnDisable}
                  css={css`
                    width: fit-content;
                    padding: 0 10px;
                    margin-left: 10px;
                  `}
                >
                  라이브삭제
                </Button>
              ) : (
                <Button
                  color="primary"
                  size="xs"
                  onClick={liveStart}
                  disabled={btnDisable}
                  css={css`
                    width: fit-content;
                    padding: 0 10px;
                    margin-left: 10px;
                  `}
                >
                  라이브만들기
                </Button>
              )}
            </div>
          )}
          {Number(data?.length) >= 1 && (
            <table
              css={css`
                border-collapse: collapse;
                td {
                  padding: 8px;
                  &:nth-of-type(1) {
                    width: 20%;
                  }
                  &:nth-of-type(2) {
                    width: 80%;
                  }
                  border: 1px solid;
                }
              `}
            >
              <tbody>
                <tr>
                  <td>URL</td>
                  <td>{data && data[0]?.result?.rtmps.url}</td>
                </tr>
                <tr>
                  <td>streamKey</td>
                  <td>{data && data[0]?.result?.rtmps.streamKey}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div
        css={css`
          position: fixed;
          right: 100px;
          top: 10px;
        `}
      >
        {showRoom.liveMain && (
          <div>
            스트리밍 라이브서비스123!{" "}
            <button onClick={handlerJoinBtn}>입장</button>
          </div>
        )}
        {showRoom.liveRoom && (
          <button
            onClick={() => {
              socket.disconnect();
              router.push("/");
            }}
          >
            나가기
          </button>
        )}
      </div>
      <div
        css={css`
          max-width: 382px;
          height: auto;
          width: 30%;
          padding: 24px;
        `}
      >
        <div
          css={css`
            width: 100%;
            height: 100%;
          `}
        >
          {showRoom.liveRoom && (
            <div
              id="room"
              css={css`
                width: 100%;
                height: 100%;
              `}
            >
              <h3
                css={css`
                  display: flex;
                  align-items: center;
                  padding-left: 15px;
                  height: 48px;
                  border: 1px solid #e0e0e0;
                `}
              >
                {roomTItle}
              </h3>
              <ul
                ref={messageBoxRef}
                css={css`
                  overflow: auto;
                  height: ${videoAreaRef?.current?.offsetHeight - 91}px;
                  border: 1px solid #e0e0e0;
                  border-top: none;
                  border-bottom: none;
                  padding: 10px 15px;
                `}
              >
                {chat.map((el, i) => (
                  <li
                    key={i}
                    css={css`
                      margin-bottom: 8px;
                      font-size: 15px;
                      .nickname {
                        color: #6e6e6e;
                      }
                      .msg {
                        color: #030352;
                      }
                      .notice {
                        display: block;
                        border-radius: 4px;
                        padding: 3px 16px;
                        text-align: center;
                        background: #eeeeee;
                      }
                    `}
                    dangerouslySetInnerHTML={{ __html: String(el) }}
                  />
                ))}
              </ul>
              <div
                css={css`
                  position: relative;
                  display: flex;
                  align-items: center;
                  height: 45px;
                  padding: 8px;
                  border: 1px solid #e0e0e0;
                `}
              >
                <form
                  onSubmit={handleMessageSubmit}
                  css={css`
                    width: 100%;
                  `}
                >
                  <div
                    css={css`
                      display: flex;
                      width: 100%;
                    `}
                  >
                    <input
                      placeholder="message"
                      value={inputMessage}
                      required
                      type="text"
                      onChange={onChangeMessage}
                      css={css`
                        width: 70%;
                        padding-left: 8px;
                        border-radius: 5px;
                        border: 1px solid #e0e0e0;
                      `}
                    />
                    <Button
                      color="black"
                      size="xs"
                      type="submit"
                      css={css`
                        width: 28%;
                        margin-left: auto;
                      `}
                    >
                      전송
                    </Button>
                    {/* <p
                      css={css`
                        position: absolute;
                        bottom: -70px;
                        font-size: 12px;
                        border: 1px solid #ccc;
                        padding: 0 8px;
                      `}
                    >
                      * 이모지 단축키
                      <br /> 윈도우 : (윈도우 로고키) + (마침표키)
                      <br /> 맥 : Ctrl+Cmd+Space
                    </p> */}
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LiveStream;

// import { Stream } from "@cloudflare/stream-react";
// import { css } from "@emotion/react";
// import React from "react";

// function LiveStreaming() {
//   return (
//     <div
//       css={css`
//         width: 500px;
//         height: 500px;
//       `}
//     >
//       sd
//       <Stream controls src="9aa75cfe7fc6f80fb508c779272135c0" />
//     </div>
//   );
// }

// export default LiveStreaming;

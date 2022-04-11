import React, {
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
  Dispatch,
  SetStateAction
} from "react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import Button from "@components/elements/Button";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

interface IShowRoom {
  liveMain: boolean;
  liveRoom: boolean;
}

interface IChat {
  showRoom: IShowRoom;
  setShowRoom: Dispatch<SetStateAction<IShowRoom>>;
}

function Chat({ showRoom, setShowRoom }: IChat) {
  const [session] = useSession();
  const router = useRouter();

  //chat
  const [inputMessage, setInputMessage] = useState("");

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

  return (
    <div>
      <div
        css={css`
          position: fixed;
          top: 50px;
          right: 100px;
        `}
      >
        <button
          css={css`
            font-size: 20px;
          `}
          onClick={() => {
            socket.disconnect();
            router.push("/");
          }}
        >
          나가기
        </button>
      </div>
      <div
        css={css`
          position: fixed;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        `}
      >
        {showRoom.liveMain && (
          <div
            onClick={handlerJoinBtn}
            css={css`
              cursor: pointer;
            `}
          >
            <div>
              <img src="/images/livestream.jpg" alt="Live Stream" />
            </div>
            <div
              css={css`
                text-align: center;
              `}
            >
              <h1
                css={css`
                  margin: 10px 0;
                  font-size: 30px;
                `}
              >
                스트리밍 라이브서비스 123!
              </h1>
              <p>입장</p>
            </div>
          </div>
        )}
      </div>
      <div
        css={css`
          max-width: 382px;
          height: 100%;
          padding: 24px 12px;
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
                  height: calc(100% - 163px);
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

export default Chat;

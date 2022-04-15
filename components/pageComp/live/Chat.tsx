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
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { toast, ToastContainer } from "react-toastify";
import Button from "@components/elements/Button";
import "react-toastify/dist/ReactToastify.css";
import {
  ChatWrap,
  ExitArea,
  LiveChatStart,
  LiveRoom,
  WriteArea
} from "./styles";

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
      toast("라이브방을 나가실 때는 오른쪽 상단의 나기기를 클릭해주세요.");
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
    <ChatWrap>
      <ExitArea className="exit_area">
        <button
          onClick={() => {
            socket.disconnect();
            router.push("/");
          }}
        >
          나가기
        </button>
      </ExitArea>
      <LiveChatStart>
        {showRoom.liveMain && (
          <div className="wrap" onClick={handlerJoinBtn}>
            <div>
              <img src="/images/livestream.jpg" alt="Live Stream" />
            </div>
            <div className="txtbox">
              <h1>스트리밍 라이브서비스 123!</h1>
              <p>입장</p>
            </div>
          </div>
        )}
      </LiveChatStart>
      <LiveRoom>
        {showRoom.liveRoom && (
          <div id="room">
            <h1>{roomTItle}</h1>
            <ul ref={messageBoxRef}>
              {chat.map((el, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: String(el) }} />
              ))}
            </ul>
            <WriteArea>
              <form onSubmit={handleMessageSubmit}>
                <div className="box">
                  <input
                    placeholder="message"
                    value={inputMessage}
                    required
                    type="text"
                    onChange={onChangeMessage}
                  />
                  <Button color="black" size="xs" type="submit">
                    전송
                  </Button>
                </div>
              </form>
            </WriteArea>
          </div>
        )}
      </LiveRoom>
      <ToastContainer position="top-center" />
    </ChatWrap>
  );
}

export default Chat;

import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useRouter } from "next/router";
let socket;

const StreamChat = ({ username }) => {
  const router = useRouter();
  const [inputMessage, setInputMessage] = useState("");
  const [showRoom, setShowRoom] = useState({
    liveMain: true,
    liveRoom: false
  });
  const [roomName, setRoomName] = useState("");
  const [roomTItle, setRoomTitle] = useState("");
  const [roomList, setRoomList] = useState([]);

  //append chat
  const [chat, setChat] = useState([]);

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
        setRoomTitle(`Room ${roomName} (${newCount})`);
        addMessage(`${user} arrived!`);
      });

      socket.on("bye", (room, left, newCount) => {
        setRoomTitle(`Room ${room} (${newCount})`);
        addMessage(`${left} left ㅠㅠ`);
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
        socket.off("welcome");
        socket.off("bye");
        socket.off("new_message");
        socket.off("room_change");
      };
    };
    socketInitializer();
  }, []);

  const onChangeMessage = e => {
    setInputMessage(e.target.value);
  };

  const addMessage = message => {
    console.log(message);
    setChat(previousMessages => [...previousMessages, message]);
  };

  const handleMessageSubmit = event => {
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
    socket.emit("nickname", username);
    socket.emit("enter_room", "live");
    setRoomName("live");
    setShowRoom({
      liveMain: false,
      liveRoom: true
    });
  };

  return (
    <header>
      <h1>Live</h1>
      <h4>Open Rooms123 :</h4>
      {roomList.map((el, i) => (
        <li key={i}>{el}</li>
      ))}
      {showRoom.liveMain && (
        <div>
          스트리밍 라이브서비스123!{" "}
          <button onClick={handlerJoinBtn}>입장</button>
        </div>
      )}
      {showRoom.liveRoom && (
        <main>
          <div id="room">
            <h3>{roomTItle}</h3>
            <button
              onClick={() => {
                socket.disconnect();
                router.push("/");
              }}
            >
              나가기
            </button>
            <ul>
              {chat.map((el, i) => (
                <li key={i}>{el}</li>
              ))}
            </ul>
            <form onSubmit={handleMessageSubmit}>
              <input
                placeholder="message"
                value={inputMessage}
                required
                type="text"
                onChange={onChangeMessage}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </main>
      )}
    </header>
  );
};

export default StreamChat;

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

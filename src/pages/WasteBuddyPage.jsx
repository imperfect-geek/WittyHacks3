import { Zoom } from "@mui/material";
import api from "api/apiService";
import CommongNav from "components/nav/CommonNav";
import { respPX } from "constants/styles";
import SendIcon from "@mui/icons-material/Send";
import chatGptGIF from "assets/chatGPT.gif";
import React from "react";

const WasteBuddyPage = () => {
  const chatsRef = React.useRef();
  const [chats, setChats] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);
  const addBotChat = (message) => {
    setChats((prev) => [...prev, { role: "bot", message }]);
  };
  const addUserChat = (message) => {
    setChats((prev) => [...prev, { role: "user", message }]);
  };
  const sendUserMessage = async () => {
    if (value.length === 0 || value.trim().length === 0) return;
    setDisabled(true);
    const newMessage = value;
    const newChats = [...chats, { message: newMessage }];
    addUserChat(value);
    setValue("");
    const { data } = await api.post("/chat", {
      prompt: newChats.map((chat) => chat.message).join(" \n "),
    });
    setDisabled(false);
    addBotChat(data.bot);
  };
  React.useEffect(() => {
    chatsRef.current?.scroll(0, chatsRef.current.scrollHeight, "smooth");
  }, [chats]);
  return (
    <div className="h-screen flex flex-col overflow-y-clip">
      <CommongNav />
      <main className={`${respPX} py-6`}>
        <h1 className="text-3xl flex gap-2 items-center">
          <span>Chat with your Waste Buddy</span>
          <div className="text-4xl flex items-center justify-center">💬</div>
        </h1>
        <p className="text-lg my-4">
          Ask about your waste related queries and get answers from our waste
          buddy
        </p>
      </main>

      {/* chat window */}
      <section
        className={`${respPX} flex-grow flex h-[50%] md:h-[70%] flex-col gap-4 py-4 `}
      >
        {/* Chats */}
        <div
          className="overflow-y-scroll flex flex-col flex-grow gap-2 px-4 relative"
          ref={chatsRef}
        >
          {chats.length === 0 && (
            <img
              src={chatGptGIF}
              alt="Waste Buddy saying hi"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-50"
            />
          )}
          {chats.map((chat, index) => {
            return (
              <Zoom
                direction="up"
                in={index <= chats.length - 1}
                mountOnEnter
                unmountOnExit
              >
                <div
                  key={index}
                  className={`flex ${
                    chat.role === "bot" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`rounded-lg p-2 ${
                      chat.role === "bot" ? "bg-green-100" : "bg-slate-100"
                    }`}
                  >
                    {chat.message}
                  </div>
                </div>
              </Zoom>
            );
          })}
        </div>
        <span className="flex gap-2">
          <input
            disabled={disabled}
            value={value}
            placeholder="Type your message here..."
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (disabled) return;
              if (e.key === "Enter") {
                sendUserMessage();
              }
            }}
            className="w-80 h-11 rounded-lg bg-slate-100 text-black-600 p-2 flex-1 border border-2 border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-transparent [placeholder-gray-400"
          />
          <button
            disabled={disabled}
            className="w-20 h-11 rounded-lg bg-[#303030] text-slate-100 p-2"
            onClick={sendUserMessage}
          >
            <SendIcon />
          </button>
        </span>
      </section>
    </div>
  );
};

export default WasteBuddyPage;

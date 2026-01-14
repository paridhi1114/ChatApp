import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage.js";
import Loading from "../../components/Loading.jsx";
import useGetSocketMessage from "../../context/useGetSocketMessage.js";

function Messages() {
  const { loading, messages } = useGetMessage();
  useGetSocketMessage();

  const lastMsgRef = useRef(null);
  const prevMsgLengthRef = useRef(0);

  useEffect(() => {
    if (!Array.isArray(messages)) return;

    // 🔑 scroll ONLY when a new message is added
    if (messages.length > prevMsgLengthRef.current) {
      lastMsgRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }

    prevMsgLengthRef.current = messages.length;
  }, [messages]);

  if (!Array.isArray(messages)) return null;

  return (
    <div style={{ minHeight: "calc(92vh - 8vh)" }}>
      {loading ? (
        <Loading />
      ) : messages.length > 0 ? (
        messages.map((message, index) => {
          const isLastMessage = index === messages.length - 1;

          return (
            <div
              key={message._id}
              ref={isLastMessage ? lastMsgRef : null}
            >
              <Message message={message} />
            </div>
          );
        })
      ) : (
        <div>
          <p className="text-center mt-[20%]">
            Say! Hi to start the conversation
          </p>
        </div>
      )}
    </div>
  );
}

export default Messages;

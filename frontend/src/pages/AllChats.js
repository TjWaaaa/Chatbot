import React, {useState, useLayoutEffect} from "react";

import ChatsDesktop from "../components/ChatsDesktop";
import ChatsMobile from "../components/ChatsMobile";

import {chatData} from "../demoData/chatDemo";

function Index() {
  const [isMobile, setIsMobile] = useState(true);

  useLayoutEffect(() => {
    function updateSize() {
      setIsMobile(window.innerWidth <= 800);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <>
      {isMobile ? (
        <ChatsMobile chatData={chatData} />
      ) : (
        <ChatsDesktop chatData={chatData} />
      )}
    </>
  );
}

export default Index;

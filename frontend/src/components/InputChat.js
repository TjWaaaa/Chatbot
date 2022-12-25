import React, {useState} from "react";
import {PaperAirplaneIcon} from "@heroicons/react/24/solid";

function Index({sendMessage, isMobile}) {
  const [text, setText] = useState("");
  return (
    <div
      className="mt-8 bg-white border-t border-slate-300 fixed bottom-0 right-0 z-50"
      style={!isMobile ? {width: "calc(100vw - 412px)"} : {width: "100vw"}}
    >
      <div className="flex flex-row justify-between items-center ml-2 pt-2 pb-2">
        <input
          className="w-full p-2"
          value={text}
          onChange={event => {
            setText(event.target.value);
          }}
        />
        <div
          className="pl-4 pr-4 cursor-pointer"
          onClick={() => {
            sendMessage(text);
            setText("");
          }}
        >
          <PaperAirplaneIcon className="flex h-7 w-7 text-indigo-600" />
        </div>
      </div>
    </div>
  );
}

export default Index;

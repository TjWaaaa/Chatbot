import {PaperAirplaneIcon} from "@heroicons/react/24/solid";

function Index({sendMessage}) {
  return (
    <div className="mt-8 bg-white border-t border-slate-300 fixed bottom-0 left-0 w-screen z-50">
      <div className="flex flex-row justify-between items-center ml-2 pt-2 pb-2">
        <input className="w-full p-2" />
        <div className="pl-4 pr-4 cursor-pointer" onClick={sendMessage}>
          <PaperAirplaneIcon className="flex h-7 w-7 text-indigo-600" />
        </div>
      </div>
    </div>
  );
}

export default Index;

import {Link} from "react-router-dom";
import {Cog6ToothIcon} from "@heroicons/react/24/solid";

function Index() {
  return (
    <div className="pl-4 pr-4 pt-8 pb-4 bg-white sticky top-0 z-50">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl font-bold">All Chats</h1>
        <Link to="/settings">
          <Cog6ToothIcon className="flex h-8 w-8 text-indigo-600" />
        </Link>
      </div>
    </div>
  );
}

export default Index;

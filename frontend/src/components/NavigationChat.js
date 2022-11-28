import {Link} from "react-router-dom";
import {ChevronLeftIcon} from "@heroicons/react/24/solid";

function Index({name, img}) {
  return (
    <div className="pl-4 pr-4 pt-4 pb-4 bg-indigo-600 sticky top-0 z-50">
      <div className="flex flex-row justify-between items-center">
        <Link to="/">
          <ChevronLeftIcon className="flex h-8 w-8 text-white" />
        </Link>
        <h1 className="text-xl font-semibold text-white">{name}</h1>

        <img
          src={img}
          alt="Business Mann 42"
          className="h-12 w-12 rounded-full"
        />
      </div>
    </div>
  );
}

export default Index;

import {Link} from "react-router-dom";

function Index({name, img, text, time}) {
  return (
    <div className="pl-4 pr-4">
      <Link to="/singleChat">
        <div className="mt-4">
          <div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row items-center">
                <img
                  src={img}
                  alt="Business Mann 42"
                  className="h-16 w-16 rounded-full"
                />
                <div className="ml-4 mr-4">
                  <h1 className="text-xl font-bold">{name}</h1>
                  <h1 className="text max-h-12 overflow-hidden">{text}</h1>
                </div>
              </div>
              <div className="flex flex-row items-center">
                <h1 className="text">{time}</h1>
              </div>
            </div>
          </div>
          <div className="ml-20 mt-4 -mr-4 h-px bg-slate-300" />
        </div>
      </Link>
    </div>
  );
}

export default Index;

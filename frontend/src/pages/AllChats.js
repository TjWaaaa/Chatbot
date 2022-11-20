import {Link} from "react-router-dom";

function Index() {
  return (
    <div>
      <h1 className="text-3xl font-bold">All Chats</h1>
      <Link to="/dashboard">
        <button type="button">Click Me!</button>
      </Link>
    </div>
  );
}

export default Index;

import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
	return (
		<>
			{/*
  <nav>
        <ul className="flex flex-row justify-between pr-8 pl-8 pt-2 pb-2 bg-blue-200">
          <li>
            <Link to="/">AllChats</Link>
          </li>
          <li>
            <Link to="/singleChat">SingleChat</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link to="/error">Error</Link>
          </li>
        </ul>
      </nav>
      */}
			<Outlet />
		</>
	);
};

export default Layout;

/*
<nav>
        <ul className="flex flex-row justify-between pr-8 pl-8 pt-2 pb-2 bg-blue-200">
          <li>
            <Link to="/">AllChats</Link>
          </li>
          <li>
            <Link to="/singleChat">SingleChat</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link to="/error">Error</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
*/

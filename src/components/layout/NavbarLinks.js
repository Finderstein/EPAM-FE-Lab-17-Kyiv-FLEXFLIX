import { Link } from "react-router-dom";
import "./layout.css";

const NavbarLinks = () => {
	return (
		<>
			<li className="header-link">
				<Link
					to="/find"
					className="nav-link px-4 text-white d-flex align-items-center"
					aria-current="page"
					id="find-nav"
				>
					Find
				</Link>
			</li>
			<li className="header-link">
				<Link
					to="/users"
					className="nav-link px-4 text-white d-flex align-items-center"
					aria-current="page"
					id="users-nav"
				>
					Users
				</Link>
			</li>
		</>
	);
};

export default NavbarLinks;

import { NavLink } from "react-router-dom";
import "../layout.css";

const NavbarLinks = () => {
	return (
		<>
			<li className="header-link">
				<NavLink
					to="/find"
					className="nav-link px-4 text-white d-flex align-items-center"
					aria-current="page"
					id="find-nav"
				>
					Find
				</NavLink>
			</li>
			<li className="header-link">
				<NavLink
					to="/users"
					className="nav-link px-4 text-white d-flex align-items-center"
					aria-current="page"
					id="users-nav"
				>
					Users
				</NavLink>
			</li>
		</>
	);
};

export default NavbarLinks;

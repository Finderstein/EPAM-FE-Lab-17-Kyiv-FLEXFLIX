import { NavLink } from "react-router-dom";
import { useUser } from "../../../context/UserContext";
import "../layout.css";

const NavbarLinks = () => {
	const { currentUser } = useUser();
	return (
		<>
			<li className="header-link">
				<NavLink
					to="/find"
					className="nav-link px-4 text-white d-flex align-items-center"
					aria-current="page"
					id="find-nav"
				>
					Search
				</NavLink>
			</li>
			<li className="header-link">
				<NavLink
					to="/airing-today"
					className="nav-link px-4 text-white d-flex align-items-center"
					aria-current="page"
					id="find-nav"
				>
					Today
				</NavLink>
			</li>
			<li className="header-link">
				{currentUser && (
					<NavLink
						to="/users"
						className="nav-link px-4 text-white d-flex align-items-center"
						aria-current="page"
						id="users-nav"
					>
						Users
					</NavLink>
				)}
			</li>
		</>
	);
};

export default NavbarLinks;

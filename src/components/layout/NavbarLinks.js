import { Link } from "react-router-dom";

const NavbarLinks = () => {
	return (
		<>
			<li className="nav-item">
				<Link
					to="/find"
					className="nav-link active px-3"
					aria-current="page"
					id="find-nav"
				>
					Find
				</Link>
			</li>
			<li className="nav-item">
				<Link
					to="/users"
					className="nav-link active px-3"
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

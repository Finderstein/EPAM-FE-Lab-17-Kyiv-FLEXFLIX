import { Link } from "react-router-dom";
import "./layout.css";
import "react-tabs/style/react-tabs.css";
import NavbarLinks from "./layoutSubComponents/NavbarLinks";
import NavbarAuth from "./layoutSubComponents/NavbarAuth";

const Navbar = () => {
	return (
		<>
			<header className="bg-dark text-white">
				<div className="container">
					<div className="d-flex flex-wrap align-items-stretch justify-content-center justify-content-lg-start">
						<Link
							to="/"
							className="navbar-brand logo text-danger py-3"
						>
							FLEXFLIX
						</Link>

						<ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center align-items-center mb-md-0 ms-lg-4">
							<NavbarLinks />
						</ul>

						<form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3 d-flex align-items-center">
							<input
								type="search"
								className="form-control form-control-dark"
								placeholder="Search..."
								aria-label="Search"
							/>
						</form>
						<NavbarAuth />
					</div>
				</div>
			</header>
		</>
	);
};

export default Navbar;

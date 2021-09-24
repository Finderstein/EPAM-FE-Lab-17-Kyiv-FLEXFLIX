import { useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import "./layout.css";
import "react-tabs/style/react-tabs.css";
import NavbarLinks from "./NavbarLinks";
// import Breadcrumbs from "./Breadcrumbs";

const Navbar = () => {
	const history = useHistory();
	const navLinks = useRef({
		find: undefined,
		users: undefined,
		active: undefined,
	});

	const activateLi = (target) => {
		clearActiveLi();
		target.classList.add("active-navbar");
		navLinks.current.active = target;
	};

	const clearActiveLi = () => {
		if (navLinks.current.active) {
			navLinks.current.active.classList.remove("active-navbar");
		}
		navLinks.current.active = null;
	};

	const manageActiveLi = (pathname) => {
		switch (pathname) {
			case "/find":
				activateLi(navLinks.current.find);
				break;
			case "/users":
				activateLi(navLinks.current.users);
				break;
			default:
				clearActiveLi();
		}
	};

	useEffect(() => {
		return history.listen((location) => {
			manageActiveLi(location.pathname);
		});
	}, [history]);

	useEffect(() => {
		navLinks.current.find = document.getElementById("find-nav");
		navLinks.current.users = document.getElementById("users-nav");
		manageActiveLi(window.location.pathname);
	}, []);

	return (
		<>
			<header className="bg-dark text-white">
				<div className="container">
					<div className="d-flex flex-wrap align-items-stretch justify-content-center justify-content-lg-start">
						<Link
							to="/"
							className="navbar-brand logo text-danger ms-5 py-3"
						>
							FLEXFLIX
						</Link>

						<ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center align-items-center mb-md-0 ms-4">
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
						{true && (
							<div className="text-end d-flex align-items-center">
								<Link
									to="/sign-in"
									className="btn btn-outline-light me-2"
								>
									Sign In
								</Link>
								<Link to="/sign-up" className="btn btn-warning">
									Sign Up
								</Link>
							</div>
						)}

						{false && (
							<div class="dropdown text-end">
								<a
									href="#"
									class="d-block link-dark text-decoration-none dropdown-toggle"
									id="dropdownUser1"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									<img
										src="https://github.com/mdo.png"
										alt="mdo"
										width="32"
										height="32"
										class="rounded-circle"
									/>
								</a>
								<ul
									class="dropdown-menu text-small"
									aria-labelledby="dropdownUser1"
								>
									<li>
										<a class="dropdown-item" href="#">
											New project...
										</a>
									</li>
									<li>
										<a class="dropdown-item" href="#">
											Settings
										</a>
									</li>
									<li>
										<a class="dropdown-item" href="#">
											Profile
										</a>
									</li>
									<li>
										<hr class="dropdown-divider" />
									</li>
									<li>
										<a class="dropdown-item" href="#">
											Sign out
										</a>
									</li>
								</ul>
							</div>
						)}
					</div>
				</div>
			</header>
		</>
	);
};

export default Navbar;

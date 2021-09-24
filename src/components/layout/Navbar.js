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
		console.log(navLinks.current.active);
		if (navLinks.current.active) {
			navLinks.current.active.classList.remove("active-navbar");
		}
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
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container-fluid">
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarToggler"
						aria-controls="navbarToggler"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<Link to="/" className="navbar-brand logo text-danger ms-5">
						FLEXFLIX
					</Link>
					<div
						className="collapse navbar-collapse"
						id="navbarToggler"
					>
						<ul className="navbar-nav ms-5 mt-2">
							<NavbarLinks />
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;

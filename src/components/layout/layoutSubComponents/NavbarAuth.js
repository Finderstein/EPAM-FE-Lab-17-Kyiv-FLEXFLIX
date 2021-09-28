import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signOutAction } from "../../../store/actions/authActions";
import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";
import { useHistory } from "react-router";

const NavbarAuth = () => {
	const [error, setError] = useState("");
	const { currentUser, logout } = useAuth();
	const history = useHistory();

	async function handleLogout() {
		setError("");

		try {
			await logout();
			history.push("/");
		} catch {
			setError("Failed to log out");
		}
	}

	return (
		<>
			{!currentUser && (
				<div className="text-end d-flex align-items-center">
					<Link to="/sign-in" className="btn btn-outline-light me-2">
						Sign In
					</Link>
					<Link to="/sign-up" className="btn btn-warning">
						Sign Up
					</Link>
				</div>
			)}

			{currentUser && (
				<div className="dropdown text-end d-flex align-items-center">
					<a
						href="#"
						className="d-block text-decoration-none dropdown-toggle"
						id="dropdownUser1"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						<img
							src="https://github.com/mdo.png"
							alt="mdo"
							width="80"
							height="80"
							className="rounded-circle"
						/>
					</a>
					<ul
						className="dropdown-menu text-small"
						aria-labelledby="dropdownUser1"
					>
						<li>
							<a className="dropdown-item" href="#">
								New project...
							</a>
						</li>
						<li>
							<a className="dropdown-item" href="#">
								Settings
							</a>
						</li>
						<li>
							<a className="dropdown-item" href="#">
								Profile
							</a>
						</li>
						<li>
							<hr className="dropdown-divider" />
						</li>
						<li>
							<a
								className="dropdown-item"
								href="#"
								onClick={handleLogout}
							>
								Sign out
							</a>
						</li>
					</ul>
				</div>
			)}
		</>
	);
};

// const mapStateToProps = (state) => {
// 	return {
// 		user: state.auth.user,
// 	};
// };

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		signOut: () => dispatch(signOutAction()),
// 	};
// };

export default NavbarAuth;

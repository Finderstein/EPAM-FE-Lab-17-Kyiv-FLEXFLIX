import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useGetAsyncData } from "../../hooks/useGetAsyncData";

const UserAuthorized = () => {
	const history = useHistory();
	const { userPhoto, signout } = useAuth();

	const handleLogout = async () => {
		try {
			await signout();
			if (history.location !== "/") {
				history.push("/");
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className="dropdown text-end d-flex align-items-center">
			<Link
				to="/profile"
				className="d-block text-decoration-none dropdown-toggle"
				id="dropdownUser1"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				<img
					src={
						userPhoto
							? userPhoto
							: "https://static.tvmaze.com/images/no-img/no-img-portrait-clean.png"
					}
					alt="mdo"
					width="80"
					height="80"
					className="rounded-circle"
				/>
			</Link>
			<ul
				className="dropdown-menu text-small"
				aria-labelledby="dropdownUser1"
			>
				<li>
					<Link className="dropdown-item" to="/profile">
						Profile
					</Link>
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
	);
};

export default UserAuthorized;

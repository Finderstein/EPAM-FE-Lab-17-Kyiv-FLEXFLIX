import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";

const UserAuthorized = () => {
	const [userInfo, setUserInfo] = useState();
	const history = useHistory();
	const { currentUser, getUserInfo, signout } = useAuth();

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

	useGetUserInfo(currentUser, getUserInfo, setUserInfo);

	return (
		<div className="dropdown text-end d-flex align-items-center">
			<Link
				to="profile"
				className="d-block text-decoration-none dropdown-toggle"
				id="dropdownUser1"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				<img
					src={
						userInfo
							? userInfo.photo
							: "https://e7.pngegg.com/pngimages/753/432/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-thumbnail.png"
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
					<Link className="dropdown-item" to="profile">
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

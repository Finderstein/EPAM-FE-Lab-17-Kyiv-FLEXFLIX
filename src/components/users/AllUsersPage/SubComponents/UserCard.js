import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../../../context/UserContext";
import "../../users.css";

const UserCard = ({ user }) => {
	const [photo, setPhoto] = useState();
	const { getProfilePhoto } = useUser();

	const getAndSetPhoto = async () => {
		setPhoto(await getProfilePhoto(user.userInfo));
	};

	useEffect(() => {
		getAndSetPhoto();
	});

	return (
		<div className="col-sm-4 col-lg-2 mt-4 d-flex align-items-stretch">
			<div className="card">
				<img
					className="card-img"
					src={
						photo ||
						"https://static.tvmaze.com/images/no-img/no-img-portrait-clean.png"
					}
					alt={user.userInfo.firstname + user.userInfo.lastname}
					width="203"
					height="285"
				/>
				<div className="card-body d-flex flex-column">
					<h5 className="card-title">
						<Link
							to={`/user/${user.uid}`}
							className="link-dark stretched-link"
						>
							{user.userInfo.firstname +
								" " +
								user.userInfo.lastname}
						</Link>
					</h5>
				</div>
			</div>
		</div>
	);
};

export default UserCard;

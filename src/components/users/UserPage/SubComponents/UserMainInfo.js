import { useState } from "react";
import { Button } from "react-bootstrap";
import { useUser } from "../../../../context/UserContext";
import { useGetAsyncData } from "../../../hooks/useGetAsyncData";
import "../../users.css";

const UserMainInfo = ({ user }) => {
	console.log(user);
	const [userPhoto, setUserPhoto] = useState();
	const { getProfilePhoto, updateUserInfo, currentUser, currentUserInfo } =
		useUser();

	useGetAsyncData(() => getProfilePhoto(user.userInfo), setUserPhoto);

	const handleAddFriend = async () => {
		try {
			await updateUserInfo(currentUser.uid, {
				friends: [...currentUserInfo.friends, user.uid],
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleRemoveFriend = async () => {
		try {
			await updateUserInfo(currentUser.uid, {
				friends: currentUserInfo.friends.filter(
					(friendUID) => friendUID !== user.uid
				),
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="container mt-3 p-3 show-wrap">
			<div className="row">
				<div className="col-sm-12 col-md-3 d-flex flex-column align-items-center">
					<div className="profilepic img-shadow">
						<img
							className="profilepic__image "
							src={
								userPhoto
									? userPhoto
									: "https://static.tvmaze.com/images/no-img/no-img-portrait-clean.png"
							}
							alt={
								user.userInfo.firstname +
								" " +
								user.userInfo.lastname
							}
							width="300"
						/>
					</div>
					<div className="d-flex justify-content-center w-100">
						{currentUserInfo.friends.includes(user.uid) ? (
							<Button
								className="mt-4 px-4"
								variant="danger"
								onClick={handleRemoveFriend}
							>
								Remove from friends
							</Button>
						) : (
							<Button
								className="mt-4 px-4"
								variant="success"
								onClick={handleAddFriend}
							>
								Add to friends
							</Button>
						)}
					</div>
				</div>
				<div className="col-sm-12 col-md-9 px-4 mt-2">
					<h2 className="h2">
						{user.userInfo.firstname + " " + user.userInfo.lastname}
					</h2>
					<h5 className="h5 text-muted ms-3">
						{user.userInfo.email}
					</h5>
					<div className="bg-light mt-4 p-3">
						<h5 className="h5">About yourself:</h5>
						<p className="multiline-article">
							{user.userInfo.about ||
								"Write something about yourself ;)"}
						</p>
					</div>
					<p className="h5 mt-4">
						<strong>Favourite genres:</strong>{" "}
						{user.userInfo.favGenres.join(", ")}
					</p>
				</div>
			</div>
		</div>
	);
};

export default UserMainInfo;

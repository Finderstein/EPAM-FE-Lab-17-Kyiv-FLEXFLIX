import { useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useAuth } from "../../../../context/AuthContext";
import { useGetAsyncData } from "../../../hooks/useGetAsyncData";
import "../../users.css";
import EditCredentials from "./EditCredentials";
import EditInfo from "./EditInfo";
import ShowInfo from "./ShowInfo";

const ProfileMainInfo = () => {
	const [editForm, setEditForm] = useState(false);
	const { userInfo, userPhoto, updateProfilePhoto } = useAuth();
	const fileInput = useRef();

	const updateProfilePicture = async (e) => {
		const photo = e.target.files[0];

		try {
			await updateProfilePhoto(photo);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className="container mt-3 p-3 show-wrap">
			{userInfo && (
				<div className="row">
					<div className="col-sm-12 col-md-3 d-flex flex-column align-items-center">
						<div
							className="profilepic img-shadow"
							onClick={() => fileInput.current.click()}
						>
							<input
								id="file"
								name="file"
								type="file"
								onChange={updateProfilePicture}
								ref={fileInput}
							/>
							<img
								className="profilepic__image "
								src={
									userPhoto
										? userPhoto
										: "https://static.tvmaze.com/images/no-img/no-img-portrait-clean.png"
								}
								alt={
									userInfo.firstname + " " + userInfo.lastname
								}
								width="300"
							/>
							<div className="profilepic__content">
								<span className="profilepic__icon">
									<i className="fas fa-camera"></i>
								</span>
								<span className="profilepic__text">
									Edit Profile
								</span>
							</div>
						</div>
						<div className="d-flex justify-content-between w-100">
							{!editForm && (
								<>
									<Button
										className="mt-4 px-4"
										variant="success"
										onClick={() => setEditForm("info")}
									>
										Edit Info
									</Button>
									<Button
										className="mt-4"
										variant="warning"
										onClick={() =>
											setEditForm("credentials")
										}
									>
										Change Credentials
									</Button>
								</>
							)}
						</div>
					</div>
					{editForm ? (
						editForm === "info" ? (
							<EditInfo closer={() => setEditForm(false)} />
						) : (
							<EditCredentials
								closer={() => setEditForm(false)}
							/>
						)
					) : (
						<ShowInfo />
					)}
				</div>
			)}
		</div>
	);
};

export default ProfileMainInfo;

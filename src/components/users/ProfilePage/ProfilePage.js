import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import ProfileMainInfo from "./SubComponents/ProfileMainInfo";
import ProfileTabs from "./SubComponents/ProfileTabs";

const Profile = () => {
	const [userInfo, setUserInfo] = useState();
	const { currentUser, getUserInfo } = useAuth();

	useGetUserInfo(currentUser, getUserInfo, setUserInfo);

	return (
		<>
			<ProfileMainInfo userInfo={userInfo} />
			<ProfileTabs userInfo={userInfo} />
		</>
	);
};

export default Profile;

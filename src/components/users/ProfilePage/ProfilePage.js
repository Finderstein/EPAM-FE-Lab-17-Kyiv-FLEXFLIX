import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useGetAsyncData } from "../../hooks/useGetAsyncData";
import ProfileMainInfo from "./SubComponents/ProfileMainInfo";
import ProfileTabs from "./SubComponents/ProfileTabs";

const Profile = () => {
	// const [userInfo, setUserInfo] = useState();
	// const { currentUser, getUserInfo } = useAuth();

	// useGetAsyncData(() => getUserInfo(currentUser), setUserInfo);

	return (
		<>
			{<ProfileMainInfo />}
			{/* {userInfo && <ProfileMainInfo userInfo={userInfo} />} */}
			{/* userInfo && <ProfileTabs userInfo={userInfo} /> */}
		</>
	);
};

export default Profile;

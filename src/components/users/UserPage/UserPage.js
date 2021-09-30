import { useState } from "react";
import { useUser } from "../../../context/UserContext";
import { useGetAsyncData } from "../../hooks/useGetAsyncData";
import UserMainInfo from "./SubComponents/UserMainInfo";

// This UserPage component and sub components are very much like ProfilePage component and its sub components,
// and it is possible to merge them to make only one page but due to time constraints I will leave as it is
const UserPage = ({
	match: {
		params: { id },
	},
}) => {
	const [user, setUser] = useState();
	const { getUserInfo } = useUser();

	useGetAsyncData(() => getUserInfo(id), setUser);

	return <>{user && <UserMainInfo user={{ uid: id, userInfo: user }} />}</>;
};

export default UserPage;

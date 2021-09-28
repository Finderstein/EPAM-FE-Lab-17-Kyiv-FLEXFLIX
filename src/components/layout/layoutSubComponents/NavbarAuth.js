import { useAuth } from "../../../context/AuthContext";
import UserNotAuthorized from "./UserNotAuthorized";
import UserAuthorized from "./UserAuthorized";

const NavbarAuth = () => {
	const { currentUser } = useAuth();

	console.log(currentUser);

	return <>{currentUser ? <UserAuthorized /> : <UserNotAuthorized />}</>;
};

export default NavbarAuth;

import { useAuth } from "../../../context/AuthContext";
import UserNotAuthorized from "./UserNotAuthorized";
import UserAuthorized from "./UserAuthorized";

const NavbarAuth = () => {
	const { currentUser } = useAuth();

	return <>{currentUser ? <UserAuthorized /> : <UserNotAuthorized />}</>;
};

export default NavbarAuth;

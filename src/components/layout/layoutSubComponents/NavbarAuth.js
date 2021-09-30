import { useUser } from "../../../context/UserContext";
import UserNotAuthorized from "./UserNotAuthorized";
import UserAuthorized from "./UserAuthorized";

const NavbarAuth = () => {
	const { currentUser } = useUser();

	return <>{currentUser ? <UserAuthorized /> : <UserNotAuthorized />}</>;
};

export default NavbarAuth;

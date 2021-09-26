import UserPopular from "./UserPopular";
import RandomShow from "./RandomShow";
import AiringToday from "./AiringToday";

const MainPage = () => {
	return (
		<div>
			<AiringToday />
			<div className="container mt-5 mb-3">
				<div className="row d-flex justify-content-between">
					<UserPopular />
					<RandomShow />
				</div>
			</div>
		</div>
	);
};

export default MainPage;

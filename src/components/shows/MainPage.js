import AiringToday from "./PagesSubComponents/AiringToday";
import RandomShow from "./PagesSubComponents/RandomShow";

import UserPopular from "./PagesSubComponents/UserPopular";

const MainPage = () => {
	return (
		<>
			<AiringToday />
			<div className="container mt-5 mb-3">
				<div className="row d-flex justify-content-between">
					<UserPopular />
					<RandomShow />
				</div>
			</div>
		</>
	);
};

export default MainPage;

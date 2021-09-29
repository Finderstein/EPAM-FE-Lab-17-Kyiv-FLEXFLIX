import { useState } from "react";
import UserPopularShowCard from "./UserPopularShowCard";
import { getTodayShows } from "../../../../api/tvmaze.api";
import { useGetAsyncData } from "../../../hooks/useGetAsyncData";

// TO DO: change from todayShows to user popular shows

const UserPopular = () => {
	const [todayShows, setTodayShows] = useState();

	useGetAsyncData(() => getTodayShows(11), setTodayShows);

	return (
		<div className="col-8">
			<h2 className="mb-4">You may be interested</h2>
			{/* заглушка, потім будуть шоу з лайками від користувачів*/}
			{todayShows &&
				todayShows.map((show) => (
					<UserPopularShowCard key={`ShowRow${show.id}`} {...show} />
				))}
		</div>
	);
};

export default UserPopular;

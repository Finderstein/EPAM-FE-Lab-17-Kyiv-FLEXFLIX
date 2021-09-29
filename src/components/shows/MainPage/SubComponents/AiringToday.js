import { useState } from "react";
import { Link } from "react-router-dom";
import AiringTodayShowCard from "./AiringTodayShowCard";
import { getTodayShows } from "../../../../api/tvmaze.api";
import { useGetAsyncData } from "../../../hooks/useGetAsyncData";

const AiringToday = () => {
	const [todayShows, setTodayShows] = useState();

	const now = new Date();
	const strNow =
		now.getFullYear() +
		"-" +
		("0" + (now.getMonth() + 1)).slice(-2) +
		"-" +
		now.getUTCDate();

	useGetAsyncData(getTodayShows, setTodayShows);

	return (
		<div className="container">
			<h2 className="mt-3">Popular shows airing today</h2>
			<div className="row">
				{todayShows &&
					todayShows.map((show) => (
						<AiringTodayShowCard
							key={`ShowCard${show.id}`}
							{...show}
						/>
					))}
				<Link
					to={`/shows?date=${strNow}}`}
					className="btn btn-outline-info btn-lg mt-4 btn-more-shows"
				>
					More shows today...
				</Link>
			</div>
		</div>
	);
};

export default AiringToday;

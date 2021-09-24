import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AiringTodayShowCard from "./AiringTodayShowCard";

const AiringToday = () => {
	const [todayShows, setTodayShows] = useState();

	// Get today string
	const now = new Date();
	const strNow =
		now.getFullYear() +
		"-" +
		("0" + (now.getMonth() + 1)).slice(-2) +
		"-" +
		now.getUTCDate();

	// Get airing today shows
	const getTodayShows = async () => {
		const response = await fetch(
			`https://api.tvmaze.com/schedule?date=${strNow}`
		);
		if (!response.ok) {
			throw response;
		}

		const data = await response.json();
		const shows = data.map((item) => item.show); // Get only shows data
		shows.sort((a, b) => {
			return +b.weight - +a.weight;
		}); // Sort by weight AKA popularity

		const uniqueID = new Set();
		const todayShows = shows
			.filter((show) => {
				if (!uniqueID.has(show.id)) {
					uniqueID.add(show.id);
					return true;
				}
				return false;
			}) // Only unique entries by show ID
			.slice(0, 8);

		setTodayShows(todayShows);
	};

	useEffect(() => {
		getTodayShows();
	}, []);

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

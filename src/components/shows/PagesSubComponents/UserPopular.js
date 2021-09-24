import { useEffect, useState } from "react";
import UserPopularShowCard from "./UserPopularShowCard";

// TO DO: change from todayShows to user popular shows
const UserPopular = () => {
	const [todayShows, setTodayShows] = useState();

	const now = new Date();
	const strNow =
		now.getFullYear() +
		"-" +
		("0" + (now.getMonth() + 1)).slice(-2) +
		"-" +
		now.getUTCDate();

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
			.slice(0, 11);

		setTodayShows(todayShows);
	};

	useEffect(() => {
		getTodayShows();
	}, []);

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

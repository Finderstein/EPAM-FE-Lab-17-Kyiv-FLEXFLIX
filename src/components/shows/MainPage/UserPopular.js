import { useEffect, useState } from "react";
import UserPopularShowCard from "./UserPopularShowCard";
import { getTodayShows } from "../../../api/tvmaze.api";
import { connect } from "react-redux";

// TO DO: change from todayShows to user popular shows
const UserPopular = (shows) => {
	const [todayShows, setTodayShows] = useState();
	console.log(shows);

	useEffect(() => {
		getTodayShows(setTodayShows, 11);
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

const mapStateToProps = (state) => {
	return {
		shows: state.show.shows,
	};
};

export default connect(mapStateToProps)(UserPopular);

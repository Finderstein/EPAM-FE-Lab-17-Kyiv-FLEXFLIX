import { useEffect, useState } from "react";
import UserPopularShowCard from "./UserPopularShowCard";
import { getTodayShows } from "../../../../api/tvmaze.api";
import { useGetAsyncData } from "../../../hooks/useGetAsyncData";
import { getAllLikedShows } from "../../../../api/firestore.shows.api";
import { Button } from "react-bootstrap";

// TO DO: change from todayShows to user popular shows

const UserPopular = () => {
	const [allLikedShows, setAllLikedShows] = useState([]);
	const [displayLikedShows, setDisplayLikedShows] = useState([]);

	const loadData = async () => {
		const data = await getAllLikedShows();
		setAllLikedShows(data);
	};

	useEffect(() => {
		loadData();
	}, []);

	useEffect(() => {
		if (allLikedShows.length !== 0) {
			setDisplayLikedShows(allLikedShows.slice(0, 11));
		}
	}, [allLikedShows]);

	const displayAllLikedShows = () => {
		setDisplayLikedShows(allLikedShows);
	};

	return (
		<div className="col-8">
			<h2 className="mb-4">You may be interested</h2>
			{/* заглушка, потім будуть шоу з лайками від користувачів*/}
			{displayLikedShows &&
				displayLikedShows.map((show) => (
					<UserPopularShowCard
						key={`ShowRow${show.id}`}
						id={show.id}
					/>
				))}
			<Button
				className="mt-3"
				variant="outline-primary"
				onClick={(e) => {
					e.target.style.display = "none";
					setDisplayLikedShows(allLikedShows);
				}}
			>
				Show more user popular shows
			</Button>
		</div>
	);
};

export default UserPopular;

import "../shows.css";
import { useEffect, useState } from "react";
import RandomShowCard from "./RandomShowCard";

const RandomShow = () => {
	const [randomShows, setRandomShows] = useState();
	const [loading, setLoading] = useState(true);

	// Get random shows
	const getRandomShows = async () => {
		let data;
		let lastPage = false;
		let pageNum = 231;

		// Finding last page
		while (!lastPage) {
			/* Ignore error if failed to fetch.
			It is because the page is empty and now we found out the last page. */
			const response = await fetch(
				`https://api.tvmaze.com/shows?page=${pageNum}`
			);

			if (!response.ok) {
				lastPage = true;
			} else {
				data = await response.json();
				if (data.length !== 0) {
					pageNum++;
				}
			}
		}

		// Retrieving biggest show id from data on the last page
		const biggestID = data[data.length - 1].id;

		// Getting and setting random shows in range
		const randomShowsArray = [];
		const randomShowsIDSet = new Set();

		for (let i = 0; i < 4; i++) {
			const randomID =
				Math.floor(Math.random() * (biggestID - 1 + 1)) + 1; // max and min including

			/* Ignore error if failed to fetch.
			Some ID's are empty. If we don't want to get ALL shows and check 
			if this ID exist than it is unavoidable that there will be some empty ID's */
			const response = await fetch(
				`https://api.tvmaze.com/shows/${randomID}`
			);
			if (!response.ok) {
				i--;
				continue;
			}

			const show = await response.json();

			// Checking if unique, has image and rating. If not, try again
			if (
				randomShowsIDSet.has(show.id) ||
				!show.image ||
				!show.rating.average
			) {
				i--;
				continue;
			}

			randomShowsArray.push(show);
		}

		setRandomShows(randomShowsArray);
	};

	useEffect(() => {
		getRandomShows();
	}, []);

	return (
		<div className="col-3">
			<h2 className="mb-4" id="try-text">
				Try something new
			</h2>
			<div
				className="spinner-border"
				role="status"
				style={{ display: loading ? "flex" : "none" }}
			>
				<span className="visually-hidden">Loading...</span>
			</div>
			<div
				style={{ visibility: loading ? "hidden" : "visible" }}
				onLoad={() => (
					(document.getElementById("random-wrapper").style.display =
						"block"),
					setLoading(false)
				)}
				id="random-wrapper"
			>
				{randomShows &&
					randomShows.map((show) => (
						<RandomShowCard
							key={`RandomShowCard${show.id}`}
							{...show}
						/>
					))}
				<button
					type="button"
					onClick={() => (
						setLoading(true),
						getRandomShows(),
						document.getElementById("try-text").scrollIntoView(),
						(document.getElementById(
							"random-wrapper"
						).style.display = "none")
					)}
					className="btn btn-warning btn-try-again mt-4"
				>
					Try again?
				</button>
			</div>
		</div>
	);
};

export default RandomShow;

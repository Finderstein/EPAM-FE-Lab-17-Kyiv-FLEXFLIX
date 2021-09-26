import "../shows.css";
import { useEffect, useState } from "react";
import RandomShowCard from "./RandomShowCard";
import { getRandomShows } from "../../../api/tvmaze.api";

const RandomShow = () => {
	const [randomShows, setRandomShows] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getRandomShows(setRandomShows);
	}, []);

	return (
		<div className="col-3">
			<h2 className="mb-4" id="try-text">
				Feeling lucky?
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
				onLoad={() => {
					document.getElementById("random-wrapper").style.display =
						"block";
					setLoading(false);
				}}
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
					onClick={() => {
						setLoading(true);
						getRandomShows(setRandomShows);
						document.getElementById("try-text").scrollIntoView();
						document.getElementById(
							"random-wrapper"
						).style.display = "none";
					}}
					className="btn btn-warning btn-try-again mt-4"
				>
					Try again?
				</button>
			</div>
		</div>
	);
};

export default RandomShow;

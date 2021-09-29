const ShowMainInfo = ({ show }) => {
	return (
		<div className="container mt-3 p-3 show-wrap">
			<div className="row">
				<div className="col-sm-12 col-md-2">
					<img
						className="img-shadow"
						src={show.image.medium}
						alt={show.name}
					/>
				</div>
				<div className="col-sm-12 col-md-9 ms-3">
					<h2 className="h2">{show.name}</h2>
					<p>{show.summary.replace(/(<([^>]+)>)/gi, "")}</p>
					<div className="row">
						<div className="col-sm-12 col-md-6">
							<p className="mb-1">
								<strong>Language: </strong>
								{show.language}
							</p>
							<p className="mb-1">
								<strong>Genres: </strong>
								{show.genres.join(", ")}
							</p>
							<p className="mb-1">
								<strong>Genres: </strong>
								{show.type}
							</p>
							<p className="mb-1">
								<strong>
									Rating:{" "}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										className="bi bi-star-fill"
										viewBox="0 0 16 16"
									>
										<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
									</svg>
								</strong>{" "}
								{show.rating.average} stars
							</p>
						</div>
						<div className="col-sm-12 col-md-6">
							<p className="mb-1">
								<strong>Status: </strong>
								{show.status}
							</p>
							<p className="mb-1">
								<strong>Schedule: </strong>
								{show.schedule.time ? show.schedule.time : ""}
								{show.schedule.days.length !== 0
									? " at " + show.schedule.days.join(", ")
									: ""}
							</p>
							<p className="mb-1">
								<strong>Runtime: </strong>
								{show.runtime ? show.runtime + " minutes" : ""}
							</p>
							<p className="mb-1">
								<strong>Premiere: </strong>
								{show.premiered}
							</p>
						</div>
					</div>
					<p className="mt-3 mb-1">
						<strong>Official site: </strong>
						<a href={show.officialSite}>{show.officialSite}</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default ShowMainInfo;

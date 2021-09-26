import { Accordion, Card } from "react-bootstrap";

const SeasonsTab = ({ seasons, episodes }) => {
	return (
		<div
			className="tab-pane active"
			id="seasons"
			role="tabpanel"
			aria-labelledby="seasons-tab"
		>
			<Accordion className="mt-3">
				{seasons.map((season) => (
					<Card
						className="accordion-card mt-2"
						key={"cardSeason" + season.number}
					>
						<Accordion.Toggle
							as={Card.Header}
							eventKey={season.number}
						>
							<div className="row">
								{season.image && (
									<div className="col-2">
										<img
											src={season.image.medium}
											alt={"Season " + season.number}
										/>
									</div>
								)}
								<div className="col-9 ms-3">
									<h3 className="h3 mt-3">
										Season {season.number}{" "}
										<span className="text-muted">
											{season.name}
										</span>
									</h3>

									<p className="text-muted">
										{season.episodeOrder} episodes
									</p>
									{season.summary && (
										<p>
											{season.summary.replace(
												/(<([^>]+)>)/gi,
												""
											)}
										</p>
									)}
								</div>
							</div>
						</Accordion.Toggle>
						<Accordion.Collapse eventKey={season.number}>
							<Card.Body>
								<Accordion>
									{episodes
										.filter(
											(episode) =>
												episode.season === season.number
										)
										.map((episode) => (
											<Card
												className="accordion-card"
												key={
													"episodeCard" +
													episode.name +
													episode.number
												}
											>
												<Accordion.Toggle
													as={Card.Header}
													eventKey={episode.number}
												>
													{episode.number}.{" "}
													{episode.name}
												</Accordion.Toggle>

												<Accordion.Collapse
													eventKey={episode.number}
												>
													<Card.Body>
														<p>
															{episode.summary !==
																null &&
																episode.summary.replace(
																	/(<([^>]+)>)/gi,
																	""
																)}
														</p>
													</Card.Body>
												</Accordion.Collapse>
											</Card>
										))}
								</Accordion>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
				))}
			</Accordion>
		</div>
	);
};

export default SeasonsTab;

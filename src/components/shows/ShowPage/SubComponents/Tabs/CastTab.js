const CastTab = ({ cast }) => {
	return (
		<div
			className="tab-pane"
			id="cast"
			role="tabpanel"
			aria-labelledby="cast-tab"
		>
			<div className="container">
				<div className="row">
					{cast.map((member) => (
						<div
							className="col-sm-6 col-md-4"
							key={"Cast " + member.person.name}
						>
							<div className="row mt-4">
								<div className="col-6">
									<img
										src={
											member.character.image
												? member.character.image.medium
												: "https://static.tvmaze.com/images/no-img/no-img-portrait-clean.png"
										}
										alt={member.character.name}
										width="210"
									/>
								</div>
								<div className="col-6 ps-4">
									<h3 className="h3">{member.person.name}</h3>
									<p>as {member.character.name}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CastTab;

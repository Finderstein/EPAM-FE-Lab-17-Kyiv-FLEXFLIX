const CrewTab = ({ crew }) => {
	return (
		<div
			className="tab-pane"
			id="crew"
			role="tabpanel"
			aria-labelledby="crew-tab"
		>
			<div className="container">
				<div className="row">
					{crew.map((member) => (
						<div
							className="col-sm-6 col-md-4"
							key={"Crew " + member.person.name + member.type}
						>
							<div className="row mt-4">
								<div className="col-6">
									<img
										src={
											(member.person.image !== null &&
												member.person.image.medium) ||
											"https://static.tvmaze.com/images/no-img/no-img-portrait-clean.png"
										}
										alt={member.person.name}
										width="210"
									/>
								</div>
								<div className="col-6 ps-4">
									<h3 className="h3">{member.person.name}</h3>
									<p>as {member.type}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CrewTab;

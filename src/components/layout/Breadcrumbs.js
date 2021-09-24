import "./layout.css";

const Breadcrumbs = () => {
	return (
		<nav className="container breadcrumbs">
			<div className="nav-wrapper blue lighten-4">
				<div className="col">
					<a href="#!" className="breadcrumb">
						First
					</a>
					<a href="#!" className="breadcrumb">
						Second
					</a>
					<a href="#!" className="breadcrumb">
						Third
					</a>
				</div>
			</div>
		</nav>
	);
};

export default Breadcrumbs;

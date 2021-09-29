import * as bootstrap from "bootstrap";
import { useEffect } from "react";
import CastTab from "./Tabs/CastTab";
import CrewTab from "./Tabs/CrewTab";
import GalleryTab from "./Tabs/GalleryTab";
import SeasonsTab from "./Tabs/SeasonsTab";

const ShowTabs = ({ show }) => {
	useEffect(() => {
		// Activate bootstrap tabs
		const triggerTabList = [].slice.call(
			document.querySelectorAll("#showTab a")
		);
		triggerTabList.forEach((triggerEl) => {
			const tabTrigger = new bootstrap.Tab(triggerEl);

			triggerEl.addEventListener("click", (event) => {
				event.preventDefault();
				tabTrigger.show();
			});
		});
	}, []);

	console.log(show, show._embedded.cast, show._embedded.crew);

	return (
		<div className="container mt-3 p-3">
			<ul className="nav nav-tabs" id="showTab" role="tablist">
				<li className="nav-item" role="presentation">
					<button
						className="nav-link active"
						id="home-tab"
						data-bs-toggle="tab"
						data-bs-target="#seasons"
						type="button"
						role="tab"
						aria-controls="home"
						aria-selected="true"
					>
						Seasons
					</button>
				</li>
				<li className="nav-item" role="presentation">
					<button
						className="nav-link"
						id="profile-tab"
						data-bs-toggle="tab"
						data-bs-target="#cast"
						type="button"
						role="tab"
						aria-controls="profile"
						aria-selected="false"
					>
						Cast
					</button>
				</li>
				<li className="nav-item" role="presentation">
					<button
						className="nav-link"
						id="messages-tab"
						data-bs-toggle="tab"
						data-bs-target="#crew"
						type="button"
						role="tab"
						aria-controls="messages"
						aria-selected="false"
					>
						Crew
					</button>
				</li>
				<li className="nav-item" role="presentation">
					<button
						className="nav-link"
						id="settings-tab"
						data-bs-toggle="tab"
						data-bs-target="#gallery"
						type="button"
						role="tab"
						aria-controls="settings"
						aria-selected="false"
					>
						Gallery
					</button>
				</li>
			</ul>

			<div className="tab-content">
				<SeasonsTab
					seasons={show._embedded.seasons}
					episodes={show._embedded.episodes}
				/>
				<CastTab cast={show._embedded.cast} />
				<CrewTab crew={show._embedded.crew} />
				<GalleryTab images={show._embedded.images} />
			</div>
		</div>
	);
};

export default ShowTabs;

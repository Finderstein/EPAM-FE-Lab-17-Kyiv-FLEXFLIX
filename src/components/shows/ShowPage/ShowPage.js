import { useEffect, useState } from "react";
import { getShow } from "../../../api/tvmaze.api";
import "../shows.css";
import ShowMainInfo from "./ShowMainInfo";
import ShowTabs from "./ShowTabs";

const ShowPage = ({
	match: {
		params: { id },
	},
}) => {
	const [show, setShow] = useState();

	useEffect(() => {
		getShow(setShow, id);
	}, []);

	return (
		<>
			{show && <ShowMainInfo show={show} />}
			{show && <ShowTabs show={show} />}
		</>
	);
};

export default ShowPage;

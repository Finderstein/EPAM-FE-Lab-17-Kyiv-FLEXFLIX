import { useCallback, useEffect, useRef, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import useShowSearch from "../../hooks/useShowSearch";
import SearchShowCard from "./SubComponents/SearchShowCard";
import SelectCountry from "./SubComponents/Selectors/SelectCountry";
import SelectGenre from "./SubComponents/Selectors/SelectGenre";
import SelectLanguage from "./SubComponents/Selectors/SelectLanguage";
import SelectRuntime from "./SubComponents/Selectors/SelectRuntime";
import SelectSort from "./SubComponents/Selectors/SelectSort";
import SelectStatus from "./SubComponents/Selectors/SelectStatus";
import SelectType from "./SubComponents/Selectors/SelectType";

const FindShowPage = () => {
	const [pageNumber, setPageNumber] = useState(1);
	const [data, setData] = useState({
		status: "",
		type: "",
		genre: "",
		language: "",
		country: "",
		runtime: "",
		sort: "Most popular",
		query: "",
	});
	const { shows, hasMore, loading, error } = useShowSearch(data, pageNumber);

	const observer = useRef();
	const lastBookElementRef = useCallback(
		(node) => {
			if (loading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (
					entries[0].isIntersecting &&
					hasMore &&
					pageNumber < 232 &&
					data.query === ""
				) {
					setPageNumber((prevPageNumber) => prevPageNumber + 1);
				}
			});
			if (node) observer.current.observe(node);
		},
		[loading, hasMore]
	);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const formDataObj = Object.fromEntries(formData.entries());

		setData(formDataObj);
		setPageNumber(1);
	};

	return (
		<div className="container mt-3">
			<h2 className="">Find something that you would like to see</h2>
			<Form onSubmit={handleSubmit}>
				<Row className="mb-3">
					<SelectStatus />
					<SelectType />
					<SelectGenre />
					<SelectLanguage />
					<SelectCountry />
				</Row>
				<Row className="mb-3">
					<SelectRuntime />
					<SelectSort />
				</Row>

				<Form.Group as={Col} controlId="formGridZip">
					<Form.Label>Type show name</Form.Label>
					<Form.Control type="text" name="query" />
					<Form.Text className="text-muted">
						Because of the problems with API search by show name
						will return maximum 10 shows. That's why you may not
						find show that you are searching for. If you have
						additional params from selects higher it further
						dimishes your chances to find the target show.
					</Form.Text>
				</Form.Group>

				<Button className="mt-3" variant="primary" type="submit">
					Search
				</Button>
			</Form>
			<div className="row">
				{shows &&
					shows.map((show, index) => {
						if (shows.length === index + 1) {
							return (
								<SearchShowCard
									ref={lastBookElementRef}
									key={show.id}
									show={show}
								/>
							);
						} else {
							return <SearchShowCard key={show.id} show={show} />;
						}
					})}
				{loading && (
					<div
						className="spinner-border"
						role="status"
						style={{ display: loading ? "flex" : "none" }}
					>
						<span className="visually-hidden">Loading...</span>
					</div>
				)}
				{error && <p className="text-danger">ERROR...</p>}
			</div>
		</div>
	);
};

export default FindShowPage;

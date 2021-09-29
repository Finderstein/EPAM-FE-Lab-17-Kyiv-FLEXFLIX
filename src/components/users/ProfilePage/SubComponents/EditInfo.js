import { Button, Form } from "react-bootstrap";
import { useAuth } from "../../../../context/AuthContext";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { genresOptions } from "../../../../utilities/genresArray";
import { useEffect, useState } from "react";

const EditInfo = ({ closer }) => {
	const { userInfo, updateInfo } = useAuth();
	console.log(userInfo);
	const [userGenres, setUserGenres] = useState(userInfo.favGenres);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const formDataObj = Object.fromEntries(formData.entries());

		try {
			await updateInfo({
				favGenres: userGenres,
				about: formDataObj.about,
				firstname: formDataObj.firstname,
				lastname: formDataObj.lastname,
			});
			closer();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="col-sm-12 col-md-7 ms-3 mt-2">
			<Form onSubmit={handleSubmit}>
				<Form.Group
					className="mb-3"
					controlId="exampleForm.ControlInput1"
				>
					<Form.Label className="h5">First name:</Form.Label>
					<Form.Control
						type="text"
						name="firstname"
						defaultValue={userInfo.firstname}
					/>
				</Form.Group>
				<Form.Group
					className="mb-3"
					controlId="exampleForm.ControlInput1"
				>
					<Form.Label className="h5">Last name:</Form.Label>
					<Form.Control
						type="text"
						name="lastname"
						defaultValue={userInfo.lastname}
					/>
				</Form.Group>
				<Form.Group
					className="mb-3"
					controlId="exampleForm.ControlTextarea1"
				>
					<Form.Label className="h5">About yourself:</Form.Label>
					<Form.Control
						name="about"
						as="textarea"
						rows={5}
						defaultValue={userInfo.about}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="my_multiselect_field">
					<Form.Label>My multiselect</Form.Label>
					<DropdownMultiselect
						selected={userGenres}
						options={genresOptions}
						name="countries"
						handleOnChange={(selected) => setUserGenres(selected)}
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Save changes
				</Button>
				<Button className="ms-3" variant="secondary" onClick={closer}>
					Cancel
				</Button>
			</Form>
		</div>
	);
};

export default EditInfo;

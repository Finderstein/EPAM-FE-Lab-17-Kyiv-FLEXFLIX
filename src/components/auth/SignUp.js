import { useEffect } from "react";
import "./auth.css";
import ReactTooltip from "react-tooltip";

const SignUp = () => {
	const validatePassword = (event) => {
		console.log(event.target.value);
		const pass = event.target.value;
		const errorList = document.getElementById("passError");
		let errorMessageList = [];

		if (!/(?=.*\d)/.test(pass)) {
			errorMessageList.push("Must contain number\n");
		}
		if (!/(?=.*[a-z])/.test(pass)) {
			errorMessageList.push("Must contain lowercase letter\n");
		}
		if (!/(?=.*[A-Z])/.test(pass)) {
			errorMessageList.push("Must contain uppercase letter\n");
		}
		if (!/(?=.*[-+_!@#$%^&*.,?])/.test(pass)) {
			errorMessageList.push("Must contain symbol\n");
		}
		if (pass.length < 8) {
			errorMessageList.push("Must have at least 8 characters\n");
		}

		errorList.innerHTML = "";
		if (errorMessageList.length === 0) {
			errorList.classList.add("visually-hidden");
		} else {
			for (const errorMessage of errorMessageList) {
				const errorLi = document.createElement("li");
				errorLi.innerText = errorMessage;
				errorList.append(errorLi);
			}
			errorList.classList.remove("visually-hidden");
		}
	};

	const validateRepeatPassword = (event) => {
		console.log(event.target.value);
		const repeatPass = event.target.value;
		const userPass = document.getElementById("userPassword").value;
		const errorSpan = document.getElementById("passRepeatError");

		if (repeatPass !== userPass) {
			errorSpan.classList.remove("visually-hidden");
		} else {
			errorSpan.classList.add("visually-hidden");
		}
	};

	useEffect(() => {});
	return (
		<main className="form-signin text-center">
			<form>
				<h1 className="h3 mt-5 mb-3 fw-normal">Sign up</h1>

				<div className="form-floating">
					<input
						type="email"
						className="form-control"
						id="userEmail"
						placeholder="name@example.com"
						required
					/>
					<label htmlFor="floatingInput">Email address</label>
				</div>

				<div className="form-floating mt-2 d-flex field-with-popover">
					<input
						type="password"
						className="form-control"
						id="userPassword"
						placeholder="Password"
						onBlur={validatePassword}
						required
					/>
					<label htmlFor="floatingPassword">Password</label>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						fill="currentColor"
						className="bi bi-info-circle-fill"
						viewBox="0 0 16 16"
						data-tip
						data-for="tooltip"
					>
						<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
					</svg>
					<ReactTooltip
						id="tooltip"
						place="bottom"
						type="dark"
						effect="solid"
					>
						<ul className="text-start">
							<li>Be at least 8 characters</li>
							<li>Have at least one number</li>
							<li>Have at least one symbol</li>
							<li>Have at least one upper case letter</li>
							<li>Have at least one lower case letter</li>
						</ul>
					</ReactTooltip>
				</div>
				<ul
					className="text-danger text-start visually-hidden mt-1"
					id="passError"
				></ul>

				<div className="form-floating mt-2">
					<input
						type="password"
						className="form-control"
						id="repeatUserPassword"
						placeholder="Password"
						onBlur={validateRepeatPassword}
						required
					/>
					<label htmlFor="floatingPassword">Repeat password</label>
				</div>
				<ul
					className="text-danger text-start visually-hidden"
					id="passRepeatError"
				>
					<li>Passwords must be the same</li>
				</ul>

				<button
					className="w-100 btn btn-lg btn-primary mt-4"
					type="submit"
				>
					Sign up
				</button>
			</form>
		</main>
	);
};

export default SignUp;

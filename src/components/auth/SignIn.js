import { Link } from "react-router-dom";
import "./auth.css";

const SignIn = () => {
	return (
		<main className="form-signin text-center">
			<form>
				<h1 className="h3 mt-5 mb-3 fw-normal">Please sign in</h1>

				<div className="form-floating">
					<input
						type="email"
						className="form-control"
						id="floatingInput"
						placeholder="name@example.com"
						required
					/>
					<label htmlFor="floatingInput">Email address</label>
				</div>

				<div className="form-floating mt-2">
					<input
						type="password"
						className="form-control"
						id="floatingPassword"
						placeholder="Password"
						required
					/>
					<label htmlFor="floatingPassword">Password</label>
				</div>

				<div className="checkbox mb-3 mt-3 text-start">
					<label>
						<input type="checkbox" value="remember-me" /> Remember
						me
					</label>
				</div>

				<button className="w-100 btn btn-lg btn-primary" type="submit">
					Sign in
				</button>
			</form>
		</main>
	);
};

export default SignIn;

import "./auth.css";
import { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router";

const SignIn = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();
		console.log("handleSubmit");

		try {
			setError("");
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			history.push("/");
		} catch {
			setError("Failed to log in");
		}

		setLoading(false);
	}

	return (
		<main className="form-signin text-center">
			<form onSubmit={handleSubmit}>
				<h1 className="h3 mt-5 mb-3 fw-normal">Please sign in</h1>
				{error && <Alert variant="danger">{error}</Alert>}

				<div className="form-floating">
					<input
						type="email"
						className="form-control"
						id="userEmail"
						placeholder="name@example.com"
						required
						ref={emailRef}
					/>
					<label htmlFor="userEmail">Email address</label>
				</div>

				<div className="form-floating mt-2">
					<input
						type="password"
						className="form-control"
						id="userPassword"
						placeholder="Password"
						required
						ref={passwordRef}
					/>
					<label htmlFor="userPassword">Password</label>
				</div>

				<div className="checkbox mb-3 mt-3 text-start">
					<label>
						<input type="checkbox" value="remember-me" /> Remember
						me
					</label>
				</div>

				<button
					className="w-100 btn btn-lg btn-primary"
					type="submit"
					disabled={loading}
				>
					Sign in
				</button>
			</form>
		</main>
	);
};

export default SignIn;

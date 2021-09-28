import { signInWithEmailAndPassword, signOut } from "@firebase/auth";
import { auth } from "../../config/fbConfig";

export const SignInAction = (credentials) => {
	return (dispatch, getState) => {
		signInWithEmailAndPassword(
			auth,
			credentials.email,
			credentials.password
		)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				dispatch({ type: "SIGNIN_SUCCESS" });
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				dispatch({
					type: "SIGNIN_ERROR",
					payload: {
						errorCode,
						errorMessage,
					},
				});
			});
	};
};

export const signOutAction = () => {
	return (dispatch, getState) => {
		signOut()
			.then(() => {
				dispatch({
					type: "SIGNOUT_SUCCESS",
				});
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				dispatch({
					type: "SIGNOUT_ERROR",
					payload: {
						errorCode,
						errorMessage,
					},
				});
			});
	};
};

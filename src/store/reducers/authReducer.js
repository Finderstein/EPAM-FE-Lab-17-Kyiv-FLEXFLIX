const initState = {
	authError: null,
};

const authReducer = (state = initState, action) => {
	switch (action.type) {
		case "SIGNIN_SUCCESS":
			console.log("sign in success");
			return {
				...state,
				authError: null,
			};
		case "SIGNIN_ERROR":
			console.log("sign in error");
			return {
				...state,
				authError: action.payload,
			};
		case "SIGNOUT_SUCCESS":
			console.log("sign out success");
			return { ...state };
		case "SIGNOUT_ERROR":
			console.log("sign out error");
			return {
				...state,
				authError: action.payload,
			};
		default:
			return state;
	}
};

export default authReducer;

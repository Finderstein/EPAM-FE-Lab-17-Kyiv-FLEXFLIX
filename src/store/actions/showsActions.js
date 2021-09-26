export const addShow = (show) => {
	return (dispatch, getState) => {
		// make async call to database
		dispatch({
			type: "ADD_SHOW",
			payload: show,
		});
	};
};

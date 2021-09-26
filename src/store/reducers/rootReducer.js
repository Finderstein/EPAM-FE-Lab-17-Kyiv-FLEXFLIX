import authReducer from "./authReducer";
import showReducer from "./showReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
	auth: authReducer,
	show: showReducer,
});

export default rootReducer;

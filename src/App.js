import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import FindShowPage from "./components/shows/FindShowPage/FindShowPage";
import MainPage from "./components/shows/MainPage/MainPage";
import ShowPage from "./components/shows/ShowPage/ShowPage";
import Profile from "./components/users/ProfilePage/ProfilePage";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./utilities/PrivateRoute";

const App = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<div className="App">
					<Navbar />
					<Switch>
						<Route exact path="/" component={MainPage} />
						<Route exact path="/find" component={FindShowPage} />
						<Route exact path="/show/:id" component={ShowPage} />
						<Route exact path="/sign-in" component={SignIn} />
						<Route exact path="/sign-up" component={SignUp} />
						<PrivateRoute
							exact
							path="/profile"
							component={Profile}
						/>
					</Switch>
					<Footer />
				</div>
			</AuthProvider>
		</BrowserRouter>
	);
};

export default App;

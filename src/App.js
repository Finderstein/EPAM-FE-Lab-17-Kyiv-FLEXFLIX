import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import MainPage from "./components/shows/MainPage/MainPage";
import ShowPage from "./components/shows/ShowPage/ShowPage";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<div className="App">
					<Navbar />
					<Switch>
						<Route exact path="/" component={MainPage} />
						<Route exact path="/show/:id" component={ShowPage} />
						<Route exact path="/sign-in" component={SignIn} />
						<Route exact path="/sign-up" component={SignUp} />
					</Switch>
					<Footer />
				</div>
			</AuthProvider>
		</BrowserRouter>
	);
};

export default App;

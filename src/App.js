import { BrowserRouter } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import MainPage from "./components/shows/MainPage";

const App = () => {
	return (
		<BrowserRouter>
			<div className="App">
				<Navbar />
				<MainPage />
				<Footer />
			</div>
		</BrowserRouter>
	);
};

export default App;

import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
import Result from "./Result";

export default function App() {
	return (
		<Router>
			<Route path="/" exact component={Home} />
			<Route path="/result" exact component={Result} />
		</Router>
	);
}

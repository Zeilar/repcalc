import { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import styled from "styled-components";
import Home from "./Home";
import Result from "./Result";

export default function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/result" exact component={Result} />
				<Route>404</Route>
			</Switch>
		</Router>
	);
}

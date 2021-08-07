import { useState, useEffect } from "react";
import { Route, Router, Switch } from "react-router-dom";
import styled from "styled-components";

export default function App() {
	return (
		<Router>
			<Route path="/" />
			<Route path="/result" exact />
		</Router>
	);
}

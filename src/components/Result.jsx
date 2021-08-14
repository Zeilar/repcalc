import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import levels from "../levels.json";

/**
 * @return Amount of days, clamped to 0
 */
function calculateRep(currentLevel, currentRep, goal, perDay) {
	let goalRep = 0;

	for (let i = 0; i < levels.findIndex(level => currentLevel in level); i++) {
		currentRep += Object.values(levels[i])[0];
	}

	for (let i = 0; i < levels.findIndex(level => goal in level); i++) {
		goalRep += Object.values(levels[i])[0];
	}

	return Math.max(Math.ceil((goalRep - currentRep) / perDay), 0);
}

export default function Result({ location }) {
	const params = useMemo(() => new URLSearchParams(location.search), [location.search]);

	const currentLevel = params.get("currentLevel"),
		currentRep = Number(params.get("currentRep")),
		goal = params.get("goal"),
		perDay = Number(params.get("perDay"));

	const days = calculateRep(currentLevel, currentRep, goal, perDay);
	return (
		<div>
			<InfoBox>
				<h2>Current level</h2>
				<span>{currentLevel}</span>
			</InfoBox>
			<h1>{days} days</h1>
		</div>
	);
}

const InfoBox = styled.div`
	text-align: center;
	background-color: var(--transparent);
`;

import { useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import levels from "./levels.json";

function calculateRep(current, goal, perDay) {
	let currentRep = current.rep;
	let goalRep = 0;

	for (let i = 0; i < levels.findIndex(level => current.level in level); i++) {
		currentRep += Object.values(levels[i])[0];
	}

	for (let i = 0; i < levels.findIndex(level => goal in level); i++) {
		goalRep += Object.values(levels[i])[0];
	}

	return Math.ceil((goalRep - currentRep) / perDay); // Amount of days
}

export default function Result({ location }) {
	const { push } = useHistory();

	const [currentLevel, setCurrentLevel] = useState("friendly");
	const [currentRep, setCurrentRep] = useState(0);
	const [goal, setGoal] = useState("exalted");
	const [perDay, setPerDay] = useState(500);
	const [result, setResult] = useState();

	const params = useMemo(() => new URLSearchParams(location.search), [location.search]);

	useEffect(() => {
		params.set("currentLevel", currentLevel);
	}, [currentLevel, params]);

	useEffect(() => {
		params.set("currentRep", currentRep);
	}, [currentRep, params]);

	useEffect(() => {
		params.set("goal", goal);
	}, [goal, params]);

	useEffect(() => {
		params.set("perDay", perDay);
	}, [perDay, params]);

	useEffect(() => {
		push(`?${params.toString()}`);
	}, [currentLevel, currentRep, goal, perDay, params, push]);

	function submit() {
		const days = calculateRep({ level: currentLevel, rep: currentRep }, goal, perDay);
		setResult(days);
	}

	function getLevels() {
		return levels.map(level => Object.keys(level)[0]);
	}

	return (
		<div>
			<select value={currentLevel} onChange={e => setCurrentLevel(e.target.value)}>
				{getLevels().map((level, i) => (
					<option key={i}>{level}</option>
				))}
			</select>
			<select value={goal} onChange={e => setGoal(e.target.value)}>
				{getLevels().map((level, i) => (
					<option key={i}>{level}</option>
				))}
			</select>
			<input
				type="number"
				value={currentRep}
				placeholder="Current rep"
				onChange={e => setCurrentRep(Number(e.target.value))}
			/>
			<input
				type="number"
				value={perDay}
				placeholder="Per day"
				onChange={e => setPerDay(Number(e.target.value))}
			/>
			<button onClick={submit}>Go</button>
			<h1>{result}</h1>
		</div>
	);
}

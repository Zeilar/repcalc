import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import levels from "../levels.json";

export default function Home() {
	const localCurrentLevel = localStorage.getItem("currentLevel") ?? "friendly",
		localCurrentRep = localStorage.getItem("currentRep") ?? 0,
		localGoal = localStorage.getItem("goal") ?? "exalted",
		localPerDay = localStorage.getItem("perDay") ?? 500;

	const [currentLevel, setCurrentLevel] = useState(localCurrentLevel);
	const [currentRep, setCurrentRep] = useState(Number(localCurrentRep));
	const [goal, setGoal] = useState(localGoal);
	const [perDay, setPerDay] = useState(Number(localPerDay));

	const { push } = useHistory();

	useEffect(() => {
		localStorage.setItem("currentLevel", currentLevel);
		currentRepBlurHandler();
	}, [currentLevel]);

	useEffect(() => {
		localStorage.setItem("currentRep", currentRep);
	}, [currentRep]);

	useEffect(() => {
		localStorage.setItem("goal", goal);
	}, [goal]);

	useEffect(() => {
		localStorage.setItem("perDay", perDay);
	}, [perDay]);

	function currentRepBlurHandler() {
		const max = levels[currentLevel];
		if (currentRep > max) setCurrentRep(max);
	}

	function perDayBlurHandler() {
		if (perDay <= 0) setPerDay(1);
	}

	function submit() {
		push(
			`/result?currentLevel=${currentLevel}&currentRep=${currentRep}&goal=${goal}&perDay=${perDay}`
		);
	}

	function getLevelKeys() {
		return Object.keys(levels);
	}

	return (
		<Container>
			<h1>How many days do I need to grind?</h1>
			<h2>I am currently</h2>
			<SelectBoxes>
				{getLevelKeys().map((level, i) => (
					<SelectBox
						className={level === currentLevel ? "active" : null}
						key={i}
						onClick={() => setCurrentLevel(level)}
					>
						{level}
					</SelectBox>
				))}
			</SelectBoxes>
			<input
				placeholder="Current progress"
				onChange={e => setCurrentRep(Number(e.target.value))}
				onBlur={currentRepBlurHandler}
				min={0}
				type="number"
				value={currentRep}
			/>
			<h2>My goal is</h2>
			<SelectBoxes>
				{getLevelKeys().map((level, i) => (
					<SelectBox
						className={level === goal ? "active" : null}
						key={i}
						onClick={() => setGoal(level)}
					>
						{level}
					</SelectBox>
				))}
			</SelectBoxes>
			<h2 style={{ marginTop: "3rem" }}>I should get this much reputation per day</h2>
			<input
				onBlur={perDayBlurHandler}
				min={1}
				type="number"
				value={perDay}
				placeholder="Per day"
				onChange={e => setPerDay(Number(e.target.value))}
			/>
			<SubmitButton onClick={submit}>Run</SubmitButton>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	position: fixed;
	transform: translate(-50%, -50%);
	top: 50%;
	left: 50%;
	min-width: 1000px;
`;

const SelectBoxes = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 0.5rem;
`;

const SelectBox = styled.button`
	font-family: "LifeCraft";
	font-size: 1.5rem;
	user-select: none;
	text-transform: capitalize;
	background-color: rgba(0, 0, 0, 0.65);
	border: 2px solid transparent;
	padding: 1rem 2rem;
	outline: 0;
	color: white;
	&.active {
		border-color: rgb(var(--main));
	}
	&.active,
	&:hover {
		color: rgb(var(--main));
	}
`;

const SubmitButton = styled.button`
	background-color: rgb(var(--main));
	font-family: "LifeCraft";
	font-size: 2.5rem;
	padding: 0.5rem 1rem;
	border-radius: 0.5rem;
	width: 15rem;
	letter-spacing: 1px;
	border: 2px solid black;
	margin: 2rem auto 0 auto;
	&:hover {
		background-color: rgb(var(--mainDark));
	}
`;

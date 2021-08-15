import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import levels from "../levels.json";
import { Input, H1, H2 } from "../styles/styledComponents";

export default function Home() {
	const [currentLevel, setCurrentLevel] = useState(
		localStorage.getItem("currentLevel") ?? "friendly"
	);
	const [currentRep, setCurrentRep] = useState(Number(localStorage.getItem("currentRep") ?? 0));
	const [goal, setGoal] = useState(localStorage.getItem("goal") ?? "exalted");
	const [perDay, setPerDay] = useState(Number(localStorage.getItem("perDay") ?? 500));

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

	const levelKeys = Object.keys(levels);

	return (
		<Container>
			<H1>How many days do I need to grind?</H1>
			<Grid>
				<GridHeader>I am currently</GridHeader>
				<SelectBoxes>
					{levelKeys.map((level, i) => (
						<SelectBox
							className={level === currentLevel ? "active" : null}
							key={i}
							onClick={() => setCurrentLevel(level)}
						>
							{level}
						</SelectBox>
					))}
				</SelectBoxes>
				<CurrentRepInput>
					<Input
						placeholder="Current progress"
						onChange={e => setCurrentRep(Number(e.target.value))}
						onBlur={currentRepBlurHandler}
						min={0}
						type="number"
						value={currentRep}
					/>
					<InputDivider>/</InputDivider>
					<Input value={levels[currentLevel]} readOnly />
				</CurrentRepInput>
			</Grid>
			<Grid>
				<GridHeader>My goal is</GridHeader>
				<SelectBoxes>
					{levelKeys.map((level, i) => (
						<SelectBox
							className={level === goal ? "active" : null}
							key={i}
							onClick={() => setGoal(level)}
						>
							{level}
						</SelectBox>
					))}
				</SelectBoxes>
			</Grid>
			<Grid>
				<GridHeader>I should get this much reputation per day</GridHeader>
				<PerDayInput
					onBlur={perDayBlurHandler}
					min={1}
					type="number"
					value={perDay}
					placeholder="Per day"
					onChange={e => setPerDay(Number(e.target.value))}
				/>
			</Grid>
			<SubmitButton onClick={submit}>Run</SubmitButton>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding: 3rem;
	max-width: 1000px;
	margin: auto;
`;

const SelectBoxes = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 0.5rem;
`;

const SelectBox = styled.button`
	font: inherit;
	font-size: 1rem;
	user-select: none;
	text-transform: uppercase;
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

const CurrentRepInput = styled.div`
	background-color: var(--transparent);
	width: fit-content;
	margin: 0.5rem auto 0 auto;
`;

const InputDivider = styled.span`
	margin: 0 0.5rem;
	color: white;
`;

const Grid = styled.div`
	display: flex;
	flex-direction: column;
	margin: 2rem 0;
`;

const GridHeader = styled(H2)`
	margin-bottom: 1rem;
`;

const PerDayInput = styled(Input)`
	background-color: var(--transparent);
	margin: 0 auto;
`;

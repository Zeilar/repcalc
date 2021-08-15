import { useMemo } from "react";
import styled from "styled-components";
import levels from "../levels.json";
import { H1, H3 } from "../styles/styledComponents";
import CountUp from "react-countup";

function calculateRep(currentLevel, currentRep, goal, perDay) {
	const levelsArr = Object.entries(levels);
	let goalRep = 0;

	for (let i = 0; i < levelsArr.findIndex(level => level[0] === currentLevel); i++) {
		currentRep += Object.values(levelsArr[i])[1];
	}

	for (let i = 0; i < levelsArr.findIndex(level => level[0] === goal); i++) {
		goalRep += Object.values(levelsArr[i])[1];
	}

	return Math.max(Math.ceil((goalRep - currentRep) / perDay), 0);
}

export default function Result({ location }) {
	const params = useMemo(() => new URLSearchParams(location.search), [location.search]);

	const currentLevel = params.get("currentLevel"),
		currentRep = Number(params.get("currentRep")),
		goal = params.get("goal"),
		perDay = Number(params.get("perDay")),
		days = calculateRep(currentLevel, currentRep, goal, perDay);

	return (
		<Container>
			<H3>
				From{" "}
				<HeaderBigParts>
					{currentLevel} ({currentRep})
				</HeaderBigParts>{" "}
				to <HeaderBigParts>{goal}</HeaderBigParts> at{" "}
				<HeaderBigParts>{perDay}</HeaderBigParts> reputation per day
			</H3>
			<ResultHeader>
				<CountUp end={days} duration={0.25} />
				<span> days</span>
			</ResultHeader>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin: auto;
	padding: 3rem;
`;

const ResultHeader = styled(H1)`
	margin-top: 1rem;
	font-family: "LifeCraft";
	font-size: 4rem;
	font-weight: normal;
`;

const HeaderBigParts = styled.span`
	font-size: 2rem;
`;

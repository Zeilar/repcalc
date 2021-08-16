import styled, { css } from "styled-components";

export const Input = styled.input`
	color: white;
	width: 8rem;
	text-align: center;
	font-family: "Montserrat-Black";
	padding: 1rem;
	font-size: 1.5rem;
	border: 2px solid transparent;
	outline: 0;
	background: none;

	&:not([readonly]):focus {
		border-color: rgb(var(--main));
	}

	&[type="number"] {
		-moz-appearance: textfield;
		appearance: textfield;
	}

	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		appearance: none;
		margin: 0;
	}
`;

export const H1 = styled.h1`
	font-size: 3rem;
	@media (max-width: 768px) {
		font-size: 2rem;
	}
`;

export const H2 = styled.h2`
	font-size: 2rem;
	@media (max-width: 768px) {
		font-size: 1.5rem;
	}
`;

export const H3 = styled.h3`
	font-size: 1.5rem;
	@media (max-width: 768px) {
		font-size: 1.25rem;
	}
`;

export const Button = styled.button`
	background-color: rgb(var(--main));
	font-family: "LifeCraft";
	font-size: 2.5rem;
	padding: 0.5rem 1rem;
	border-radius: 0.5rem;
	color: black;
	text-decoration: none;
	width: 15rem;
	letter-spacing: 1px;
	border: 2px solid black;
	margin: 2rem auto 0 auto;
	&:hover {
		background-color: rgb(var(--mainDark));
	}
`;

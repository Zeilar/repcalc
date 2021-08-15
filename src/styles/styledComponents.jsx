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
	font-size: 2.5rem;
`;

export const H2 = styled.h2`
	font-size: 2rem;
`;

export const H3 = styled.h3`
	font-size: 1.5rem;
`;

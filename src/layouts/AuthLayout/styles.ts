import { styled } from '@mui/material';

export const StyledMain = styled('main')`
	display: grid;
	grid-template-rows: repeat(3, min-content);
	row-gap: 1.5rem;

	width: var(--auth-layout-width);

	margin: 0 auto;

	@media (min-width: 600px) {
		--auth-layout-width: 600px;
	}

	@media (max-width: 600px) {
		--auth-layout-width: 100%;
	}
`;

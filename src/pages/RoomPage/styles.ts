import { styled } from '@mui/material';
import { MainLayout } from '@/layouts/MainLayout';
import { Tasks } from '@/components/Tasks';
import { AsideBar } from '@/components/AsideBar';

export const StyledLayout = styled(MainLayout)`
	display: grid;
	grid-template-columns: var(---room-page-template-columns);
	grid-template-rows: min-content 1fr;
	gap: 1em;

	overflow: hidden;

	@media (min-width: 1300px) {
		---room-page-template-columns: 4fr 1fr;

		height: 100vh;
	}

	@media (max-width: 1300px) {
		---room-page-template-columns: 1fr;
	}
`;

export const StyledTasks = styled(Tasks)`
	grid-column: var(--room-page-grid-column);

	height: 100%;

	@media (min-width: 1300px) {
		grid-row: 2;
	}

	@media (max-width: 1300px) {
		--room-page-grid-column: span 2;
	}
`;

export const StyledAside = styled(AsideBar)`
	@media (min-width: 1300px) {
		grid-row: 1 / -1;

		display: grid;
		row-gap: 2rem;

		border-left: 1px solid #d9e0e9;
	}

	@media (max-width: 1300px) {
		grid-template-columns: repeat(2, 1fr);
		grid-row: 3;
		gap: 10px;
	}

	@media (max-width: 600px) {
		grid-template-columns: 1fr;
	}
`;

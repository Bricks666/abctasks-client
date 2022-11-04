import { styled } from '@mui/material';
import { TasksProgress } from '../TasksProgress';

export const StyledWrapper = styled('div')`
	display: grid;
	grid-template-rows: max-content 1fr;
`;

export const StyledProgress = styled(TasksProgress)`
	max-height: 300px;
`;

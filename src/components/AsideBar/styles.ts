import { styled } from '@mui/material';
import { TasksProgress } from '../TasksProgress';

export const StyledWrapper = styled('div')`
	display: grid;
`;

export const StyledProgress = styled(TasksProgress)`
	max-height: 300px;
`;

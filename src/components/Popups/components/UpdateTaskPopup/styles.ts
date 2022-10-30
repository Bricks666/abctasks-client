import { styled } from '@mui/material';
import { SkeletonTaskForm } from '../SkeletonTaskForm';
import { TaskForm } from '../TaskForm';

export const StyledForm = styled(TaskForm)`
	@media (min-width: 640px) {
		min-width: 550px;
	}
`;

export const StyledSkeleton = styled(SkeletonTaskForm)`
	@media (min-width: 640px) {
		min-width: 550px;
	}
`;

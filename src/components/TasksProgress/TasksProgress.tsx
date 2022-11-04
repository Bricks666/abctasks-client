import * as React from 'react';
import { Typography } from '@mui/material';
import { useStore } from 'effector-react';
import { useQuery } from '@farfetched/react';
import { useTranslation } from 'react-i18next';
import { getProgressQuery } from '@/models/progress';
import { $GroupsMap } from '@/models/groups';
import { ui } from '@/const';
import { CommonProps } from '@/types';
import { TaskProgress } from './TaskProgress';
import { SkeletonTaskProgress } from './SkeletonTaskProgress';
import { StyledList, StyledWrapper, titleSx } from './styles';

export const TasksProgress: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('room');
	const { data: progresses } = useQuery(getProgressQuery);
	const groups = useStore($GroupsMap);

	const isLoading = !groups || !progresses;

	return (
		<StyledWrapper className={className} spacing={1.5}>
			<Typography variant='body2' component='h2' sx={titleSx}>
				{t('taskProgress.title')}
			</Typography>
			<StyledList spacing={1.5}>
				{isLoading
					? ui.getEmptyArray(2).map(() => <SkeletonTaskProgress />)
					: progresses.map((progress) => {
							const group = groups[progress.groupId];
							if (!group) {
								return null;
							}
							return (
								<TaskProgress {...progress} {...group} key={progress.groupId} />
							);
					  })}
			</StyledList>
		</StyledWrapper>
	);
};

import * as React from 'react';
import { SxProps, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { TaskStatus } from '@/models';
import { roomRoute } from '@/routes';
import { CommonProps } from '@/types';
import { getParams, popups } from '@/const';
import { EditMenu, MenuOption } from '@/shared/components';
import { StyledWrapper } from './styles';

export interface TaskListHeaderComponent extends CommonProps {
	readonly columnStatus: TaskStatus;
	readonly roomId: number;
}

const titleSx: SxProps = {
	fontWeight: 700,
};

export const TaskListHeader: React.FC<
	React.PropsWithChildren<TaskListHeaderComponent>
> = (props) => {
	const { children, className, columnStatus, roomId } = props;
	const { t } = useTranslation('common');

	const options = React.useMemo<MenuOption<any>[]>(
		() => [
			{
				icon: <AddIcon />,
				label: t('actions.create'),
				to: roomRoute,
				params: { id: roomId },
				query: {
					[getParams.popup]: popups.createTask,
					[getParams.taskStatus]: columnStatus,
				},
			},
		],
		[columnStatus]
	);

	return (
		<StyledWrapper className={className}>
			<Typography variant='h6' component='h3' sx={titleSx}>
				{children}
			</Typography>
			<EditMenu options={options} alt="Open tasks list's edit menu" />
		</StyledWrapper>
	);
};

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExitRoomIcon from '@mui/icons-material/MeetingRoom';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { routes, getParams, popups } from '@/shared/configs';
import { CommonProps } from '@/shared/types';
import { MenuOption, EditMenu } from '@/shared/ui';
import { exitRoomModel, removeRoomModel } from '../../model';

export interface RoomCardMenuProps extends CommonProps {
	readonly id: number;
}

export const RoomCardMenu: React.FC<RoomCardMenuProps> = (props) => {
	const { id, className, } = props;
	const { t, } = useTranslation('rooms');
	const removeRoom = useUnit(removeRoomModel.mutation);
	const exitRoom = useUnit(exitRoomModel.mutation);
	const options = React.useMemo<MenuOption<object>[]>(
		() => [
			{
				label: t('actions.update', { ns: 'common', }),
				to: routes.rooms,
				params: {},
				query: {
					[getParams.popup]: popups.updateRoom,
					[getParams.roomId]: id,
				},
				icon: <EditIcon />,
			},
			{
				label: 'Exit',
				onClick: () => exitRoom.start({ id, }),
				icon: <ExitRoomIcon />,
			},
			{
				label: t('actions.remove', { ns: 'common', }),
				onClick: () => removeRoom.start({ id, }),
				icon: <DeleteIcon />,
			}
		],
		[id]
	);
	return <EditMenu className={className} options={options} />;
};

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExitRoomIcon from '@mui/icons-material/MeetingRoom';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { routes, getParams, popupsMap } from '@/shared/configs';
import { useToggle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { MenuOption, EditMenu, Confirm } from '@/shared/ui';
import { exitRoomModel, removeRoomModel } from '../../model';

export interface RoomCardMenuProps extends CommonProps {
	readonly id: number;
}

export const RoomCardMenu: React.FC<RoomCardMenuProps> = (props) => {
	const { id, className, } = props;
	const { t, } = useTranslation('rooms');
	const removeRoom = useUnit(removeRoomModel.mutation);
	const exitRoom = useUnit(exitRoomModel.mutation);
	const [
		removeToggled,
		{ toggleOff: toggleRemoveOff, toggleOn: toggleRemoveOn, }
	] = useToggle(false);
	const [exitToggled, { toggleOff: toggleExitOff, toggleOn: toggleExitOn, }] =
		useToggle(false);

	const onRemoveAgree = React.useCallback(() => {
		removeRoom.start({ id, });
		toggleRemoveOff();
	}, [toggleRemoveOff, id]);

	const onExitAgree = React.useCallback(() => {
		exitRoom.start({ id, });
		toggleExitOff();
	}, [toggleExitOff, id]);

	const options = React.useMemo<MenuOption<object>[]>(
		() => [
			{
				label: t('actions.update', { ns: 'common', }),
				to: routes.rooms,
				params: {},
				query: {
					[getParams.popup]: popupsMap.updateRoom,
					[getParams.roomId]: id,
				},
				icon: <EditIcon />,
			},
			{
				label: 'Exit',
				onClick: toggleExitOn,
				icon: <ExitRoomIcon />,
			},
			{
				label: t('actions.remove', { ns: 'common', }),
				onClick: toggleRemoveOn,
				icon: <DeleteIcon />,
			}
		],
		[id]
	);
	return (
		<>
			<EditMenu className={className} options={options} />
			<Confirm
				isOpen={exitToggled}
				onClose={toggleExitOff}
				title='Are you sure?'
				content='Don you want to exit this room?'
				agreeText='Exit'
				onAgree={onExitAgree}
				disagreeText='Cancel'
				onDisagree={toggleExitOff}
			/>
			<Confirm
				isOpen={removeToggled}
				onClose={toggleRemoveOff}
				title='Are you sure?'
				content='Don you want to delete this room? All tasks and tags will be deleted'
				agreeText='Delete'
				onAgree={onRemoveAgree}
				disagreeText='Cancel'
				onDisagree={toggleRemoveOff}
			/>
		</>
	);
};

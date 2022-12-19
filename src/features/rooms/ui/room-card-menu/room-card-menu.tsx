import { useMutation } from '@farfetched/react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { routes, getParams, popups } from '@/shared/configs';
import { CommonProps } from '@/shared/types';
import { MenuOption, EditMenu } from '@/shared/ui';
import { removeRoomModel } from '../../model';

export interface RoomCardMenuProps extends CommonProps {
	readonly id: number;
}

export const RoomCardMenu: React.FC<RoomCardMenuProps> = (props) => {
	const { id, className, } = props;
	const { t, } = useTranslation('rooms');
	const removeRoom = useMutation(removeRoomModel.mutation);
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
			},
			{
				label: t('actions.remove', { ns: 'common', }),
				onClick: () => removeRoom.start({ id, }),
			}
		],
		[id]
	);
	return <EditMenu className={className} options={options} />;
};

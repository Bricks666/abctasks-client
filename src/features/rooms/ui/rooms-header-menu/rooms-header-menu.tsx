import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { routes, getParams, popups } from '@/shared/configs';
import { CommonProps } from '@/shared/types';
import { MenuOption, EditMenu } from '@/shared/ui';

export interface RoomsHeaderMenuProps extends CommonProps {}

export const RoomsHeaderMenu: React.FC<RoomsHeaderMenuProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('rooms');

	const options = React.useMemo<MenuOption<any>[]>(
		() => [
			{
				label: t('actions.create', { ns: 'common', }),
				to: routes.rooms,
				params: {},
				query: {
					[getParams.popup]: popups.createRoom,
				},
			}
		],
		[]
	);

	return <EditMenu className={className} options={options} />;
};

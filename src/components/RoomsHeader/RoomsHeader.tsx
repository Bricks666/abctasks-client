import * as React from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { Block } from '@/ui/Block';
import { Text } from '@/ui/Text';
import { EditMenu } from '../EditMenu';
import { MenuOption } from '@/ui/MenuItem';
import { usePrepareLink } from '@/hooks';
import { GET_PARAMS, POPUPS } from '@/const';
import { CommonProps } from '@/interfaces/common';

import styles from './RoomsHeader.module.css';

export const RoomsHeader: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('rooms');
	const createLink = usePrepareLink({
		addQuery: {
			[GET_PARAMS.popup]: POPUPS.createRoom,
		},
	});
	const options = React.useMemo<MenuOption[]>(
		() => [
			{
				label: 'Create room',
				to: createLink,
			},
		],
		[createLink]
	);
	return (
		<Block className={cn(styles.header, className)}>
			<Text component='h2'>{t('title')}</Text>
			<EditMenu options={options} />
		</Block>
	);
};

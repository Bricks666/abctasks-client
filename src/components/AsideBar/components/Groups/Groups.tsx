import * as React from 'react';
import cn from 'classnames';
import { Button } from '@mui/material';
import { Link } from 'atomic-router-react';
import { useUnit } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { roomRoute } from '@/routes';
import { getParams, popups } from '@/const';
import { CommonProps } from '@/types';
import { GroupsList } from './components';

import styles from './Groups.module.css';

export interface GroupsProps extends CommonProps {}

export const Groups: React.FC<GroupsProps> = React.memo(function Groups(props) {
	const { className, } = props;
	const { t, } = useTranslation('common');
	const params = useUnit(roomRoute.$params);

	return (
		<section className={cn(styles.groups, className)}>
			<Button
				className={styles.button}
				to={roomRoute as any}
				params={params}
				query={{ [getParams.popup]: popups.createGroup, }}
				component={Link}>
				{t('actions.create')}
			</Button>
			<GroupsList />
		</section>
	);
});

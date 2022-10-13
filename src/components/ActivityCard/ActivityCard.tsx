import * as React from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { Avatar } from '@/ui/Avatar';
import { Activity, ActivityType } from '@/models/activities/types';
import { Color } from '@/types/ui';
import { Text } from '@/ui/Text';
import { RemoveIcon } from '@/ui/RemoveIcon';
import { EditIcon } from '@/ui/EditIcon';
import { PlusIcon } from '@/ui/PlusIcon';
import { CommonProps } from '@/types/common';
import { Card } from '@/ui/Card';
import { DateTime } from '@/ui/DateTime';

import styles from './ActivityCard.module.css';

export interface ActivityCardProps extends CommonProps, Activity {}

const colorMap: Record<ActivityType, Color> = {
	create: 'success',
	remove: 'error',
	update: 'warning',
};

const iconMap: Record<ActivityType, React.ReactNode> = {
	create: <PlusIcon className={styles.icon} />,
	remove: <RemoveIcon className={styles.icon} />,
	update: <EditIcon className={styles.icon} />,
};

export const ActivityCard: React.FC<ActivityCardProps> = ({
	type,
	sphere,
	className,
	createdAt,
}) => {
	const { t } = useTranslation('room');
	return (
		<Card className={cn(styles.card, className)}>
			<Avatar
				className={styles.avatar}
				size='medium'
				alt={t(`activities.type.${type}`)}
				color={colorMap[type]}>
				{iconMap[type]}
			</Avatar>
			<Text component='p'>
				{t('activities.text', {
					type,
					sphere,
				})}
			</Text>

			<DateTime date={createdAt} format='MMM DD' />
		</Card>
	);
};

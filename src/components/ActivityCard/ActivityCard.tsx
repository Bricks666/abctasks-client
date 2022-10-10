import * as React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Avatar } from '@/ui/Avatar';
import { Activities, ActivityStructure } from '@/models/Activities/types';
import { Color } from '@/interfaces/ui';
import { Text } from '@/ui/Text';
import { DeleteIcon } from '@/ui/DeleteIcon';
import { EditIcon } from '@/ui/EditIcon';
import { PlusIcon } from '@/ui/PlusIcon';
import { CommonProps } from '@/interfaces/common';
import { Card } from '@/ui/Card';
import { DateTime } from '@/ui/DateTime';

import ActivityCardStyle from './ActivityCard.module.css';

export interface ActivityCardProps extends CommonProps, ActivityStructure {}

const colorMap: Record<Activities, Color> = {
	[Activities.CREATE]: 'success',
	[Activities.DELETE]: 'error',
	[Activities.EDIT]: 'warning',
};

const iconMap: Record<Activities, React.ReactNode> = {
	[Activities.CREATE]: <PlusIcon className={ActivityCardStyle.icon} />,
	[Activities.DELETE]: <DeleteIcon className={ActivityCardStyle.icon} />,
	[Activities.EDIT]: <EditIcon className={ActivityCardStyle.icon} />,
};

export const ActivityCard: React.FC<ActivityCardProps> = ({
	activity,
	sphere,
	activist,
	className,
	date,
}) => {
	const { t } = useTranslation('room');
	return (
		<Card className={classNames(ActivityCardStyle.card, className)}>
			<Avatar
				className={ActivityCardStyle.avatar}
				size='medium'
				alt={t(`activities.activityType.${activity}`)}
				color={colorMap[activity]}>
				{iconMap[activity]}
			</Avatar>
			<Text component='p'>
				{t('activities.text', {
					activist,
					activity,
					sphere,
				})}
			</Text>

			<DateTime date={date} format='MMM DD' />
		</Card>
	);
};

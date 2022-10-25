import * as React from 'react';
import { Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { Activity, ActivityType } from '@/models/activities';
import { Color, CommonProps } from '@/types';
import { DateTime } from '@/ui/DateTime';
import { StyledAvatar, StyledCard, StyledCardContent } from './styles';

export interface ActivityCardProps extends CommonProps, Activity {}

const colorMap: Record<
	ActivityType,
	Exclude<Color, 'primary' | 'secondary' | 'dark'>
> = {
	create: 'success',
	remove: 'error',
	update: 'warning',
};

const iconMap: Record<ActivityType, React.ReactNode> = {
	create: <AddIcon />,
	remove: <DeleteIcon />,
	update: <EditIcon />,
};

export const ActivityCard: React.FC<ActivityCardProps> = ({
	type,
	sphere,
	className,
	createdAt,
}) => {
	const { t } = useTranslation('room');
	return (
		<StyledCard className={className}>
			<StyledCardContent>
				<StyledAvatar alt={t(`activities.type.${type}`)} color={colorMap[type]}>
					{iconMap[type]}
				</StyledAvatar>
				<div>
					<Typography component='p'>
						{t('activities.text', {
							type,
							sphere,
						})}
					</Typography>
					<DateTime date={createdAt} format='MMM DD' />
				</div>
			</StyledCardContent>
		</StyledCard>
	);
};

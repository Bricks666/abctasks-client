import { Avatar, Card, CardHeader } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { User } from '@/shared/api';
import { CommonProps } from '@/shared/types';

import styles from './template-user-card.module.css';

export interface TemplateUserCardProps extends CommonProps, User {
	readonly actions?: React.ReactElement | null;
}

export const TemplateUserCard: React.FC<TemplateUserCardProps> = (props) => {
	const { login, actions, className, photo, } = props;

	return (
		<Card className={cn(styles.card, className)}>
			<CardHeader
				avatar={<Avatar src={photo || ''} alt={login} />}
				title={login}
				action={actions}
			/>
		</Card>
	);
};

import { Card, CardHeader } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { User } from '@/shared/api';
import { CommonProps } from '@/shared/types';
import { UserAvatar } from '../user-avatar';

import styles from './template-user-card.module.css';

export interface TemplateUserCardProps extends CommonProps, User {
	readonly actions?: React.ReactElement | null;
	readonly onClick?: React.MouseEventHandler;
	readonly extra?: React.ReactElement | null;
}

export const TemplateUserCard: React.FC<TemplateUserCardProps> = (props) => {
	const { login, actions, className, photo, onClick, extra, } = props;

	return (
		<Card className={cn(styles.card, className)} onClick={onClick}>
			<CardHeader
				avatar={<UserAvatar login={login} photo={photo} />}
				title={login}
				action={actions}
			/>
			{extra}
		</Card>
	);
};

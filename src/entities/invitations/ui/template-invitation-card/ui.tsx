import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Typography
} from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { CommonProps, Slots } from '@/shared/types';

import styles from './ui.module.css';


export interface TemplateInvitationCardProps extends CommonProps {
	readonly slots: Required<Slots<'userAvatar' | 'inviterAvatar'>> &
		Slots<'actions'>;
	readonly inviterName: string;
	readonly username: string;
	readonly roomName: string;
}

export const TemplateInvitationCard: React.FC<TemplateInvitationCardProps> = (
	props
) => {
	const { inviterName, roomName, slots, username, className, } = props;

	const { t, } = useTranslation('room-invitation');

	const { inviterAvatar, userAvatar, actions, } = slots;

	const title = t('card.title', {
		inviter_name: inviterName,
	});

	const text = t('card.text', {
		inviter_name: inviterName,
		user_name: username,
		room_name: roomName,
		returnObjects: true,
	}) as Array<string>;

	return (
		<Card className={cn(styles.card, className)}>
			<CardHeader
				avatar={inviterAvatar}
				title={title}
				titleTypographyProps={{ fontWeight: 500, }}
			/>
			<CardContent>
				<div className={styles.content}>
					{inviterAvatar}
					<Typography className={styles.text} variant='body2' component='p'>
						{text[0]}
						<b>{text[1]}</b>
						{text[2]}
						<b>{text[3]}</b>
						{text[4]}
						<b>{text[5]}</b>
					</Typography>
					{userAvatar}
				</div>
			</CardContent>
			{actions ? (
				<CardActions className={styles.actions}>{actions}</CardActions>
			) : null}
		</Card>
	);
};

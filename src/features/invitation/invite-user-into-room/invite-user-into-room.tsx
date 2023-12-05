import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { Paper, IconButton } from '@mui/material';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { TemplateUserListItem, UserSearch } from '@/entities/users';

import { usePreventDefault } from '@/shared/lib';
import { CommonProps } from '@/shared/types';

import styles from './invite-user-into-room.module.css';
import { form, mutation } from './model';

export interface InviteUserIntoRoomProps extends CommonProps {}

export const InviteUserIntoRoom: React.FC<InviteUserIntoRoomProps> = (
	props
) => {
	const { className, } = props;
	const { t, } = useTranslation('room-users');
	const submit = useUnit(form.submit);
	const isLoading = useUnit(mutation.$pending);
	const user = useUnit(form.fields.user.$value);

	const onSubmit: React.FormEventHandler = usePreventDefault(submit);

	const buttonText = user
		? t('actions.invite_user.actions.submit', { username: user.username, })
		: t('actions.invite_user.actions.submit', { context: 'disabled', });

	return (
		<form className={cn(styles.form, className)} onSubmit={onSubmit}>
			<User />
			<LoadingButton
				type='submit'
				variant='contained'
				disabled={!user}
				loading={isLoading}
				loadingPosition='start'
				disableElevation>
				{buttonText}
			</LoadingButton>
		</form>
	);
};

const User: React.FC = () => {
	const user = useUnit(form.fields.user);
	const { t, } = useTranslation('room-users');

	if (user.value) {
		return (
			<Paper>
				<TemplateUserListItem
					{...user.value}
					slots={{
						actions: (
							<IconButton onClick={user.reset as any}>
								<CloseIcon />
							</IconButton>
						),
					}}
				/>
			</Paper>
		);
	}
	const label = t('actions.invite_user.fields.user');

	return (
		<UserSearch
			value={user.value}
			onChange={user.onChange}
			onBlur={user.onBlur}
			isValid={user.isValid}
			helperText={user.errorText}
			name='user'
			label={label}
			autoComplete='off'
		/>
	);
};

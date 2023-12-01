import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { Paper, IconButton } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { TemplateUserListItem, UserSearch } from '@/entities/users';

import { usePreventDefault } from '@/shared/lib';
import { BasePopupProps, CommonProps } from '@/shared/types';
import { MainPopup } from '@/shared/ui';

import styles from './invite-user-into-room.module.css';
import { close, form, mutation } from './model';

export interface InviteUserIntoRoomProps extends CommonProps, BasePopupProps {}

export const InviteUserIntoRoom: React.FC<InviteUserIntoRoomProps> = (
	props
) => {
	const { isOpen, className, } = props;
	const { t, } = useTranslation('room-users');
	const submit = useUnit(form.submit);
	const onClose = useUnit(close);
	const isLoading = useUnit(mutation.$pending);
	const user = useUnit(form.fields.user.$value);

	const onSubmit: React.FormEventHandler = usePreventDefault(submit);

	const title = t('actions.invite_user.title');
	const buttonText = user
		? t('actions.invite_user.actions.submit', { username: user.username, })
		: t('actions.invite_user.actions.submit', { context: 'disabled', });

	return (
		<MainPopup
			className={className}
			isOpen={isOpen}
			onClose={onClose}
			title={title}>
			<form className={styles.form} onSubmit={onSubmit}>
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
		</MainPopup>
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

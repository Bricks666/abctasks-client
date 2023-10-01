import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { Paper, IconButton } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';

import { TemplateUserListItem, UserSearch } from '@/entities/users';

import { usePreventDefault } from '@/shared/lib';
import { BasePopupProps, CommonProps } from '@/shared/types';
import { MainPopup } from '@/shared/ui';

import styles from './add-users-into-room.module.css';
import { close, form, mutation } from './model';

export interface AddUsersIntoRoomProps extends CommonProps, BasePopupProps {}

export const AddUsersIntoRoom: React.FC<AddUsersIntoRoomProps> = (props) => {
	const { isOpen, className, } = props;
	const submit = useUnit(form.submit);
	const onClose = useUnit(close);
	const isLoading = useUnit(mutation.$pending);
	const user = useUnit(form.fields.user.$value);

	const onSubmit: React.FormEventHandler = usePreventDefault(submit);

	const buttonText = user
		? `Add ${user.username} to the room`
		: 'Select user above';

	return (
		<MainPopup
			className={className}
			isOpen={isOpen}
			onClose={onClose}
			title='Add users into room'>
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

	return (
		<UserSearch
			value={user.value}
			onChange={user.onChange}
			onBlur={user.onBlur}
			isValid={user.isValid}
			helperText={user.errorText}
			name='user'
			required
		/>
	);
};

import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { Paper, IconButton } from '@mui/material';
import { useForm } from 'effector-forms';
import { useUnit } from 'effector-react';
import * as React from 'react';

import { addUserRoomModel } from '@/features/rooms';

import { TemplateUserListItem, UserSearch } from '@/entities/users';

import { BasePopupProps, CommonProps } from '@/shared/types';
import { MainPopup } from '@/shared/ui';

import styles from './add-users-into-room.module.css';

export interface AddUsersIntoRoomProps extends CommonProps, BasePopupProps {}

export const AddUsersIntoRoom: React.FC<AddUsersIntoRoomProps> = (props) => {
	const { isOpen, className, } = props;
	const { fields, submit, } = useForm(addUserRoomModel.form);
	const onClose = useUnit(addUserRoomModel.close);
	const isLoading = useUnit(addUserRoomModel.mutation.$pending);
	const { user, } = fields;

	const onSubmit: React.FormEventHandler = (evt) => {
		evt.preventDefault();
		submit();
	};

	const buttonText = user.value
		? `Add ${user.value.username} to the room`
		: 'Select user above';

	return (
		<MainPopup
			className={className}
			isOpen={isOpen}
			onClose={onClose}
			title='Add users into room'>
			<form className={styles.form} onSubmit={onSubmit}>
				{user.value ? (
					<Paper variant='outlined'>
						<TemplateUserListItem
							{...user.value}
							actions={
								<IconButton onClick={user.reset as any}>
									<CloseIcon />
								</IconButton>
							}
						/>
					</Paper>
				) : (
					<UserSearch
						value={user.value}
						onChange={user.onChange}
						isValid={user.isValid}
						helperText={user.errorText()}
						required
					/>
				)}
				<LoadingButton
					type='submit'
					variant='contained'
					disabled={!user.value}
					loading={isLoading}
					loadingPosition='start'
					disableElevation>
					{buttonText}
				</LoadingButton>
			</form>
		</MainPopup>
	);
};

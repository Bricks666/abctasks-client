import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { CommonProps } from '@/shared/types';
import { addUserRoomModel } from '../../model';

export interface AddUserButtonProps extends CommonProps {
	readonly userId: number;
	readonly roomId: number;
}

export const AddUserButton: React.FC<AddUserButtonProps> = React.memo(
	(props) => {
		const { roomId, userId, } = props;

		const addUser = useUnit(addUserRoomModel.mutation);
		const onClick = () => {
			addUser.start({
				id: roomId,
				userId,
			});
		};
		return (
			<IconButton onClick={onClick} disabled={addUser.pending}>
				<AddIcon />
			</IconButton>
		);
	}
);

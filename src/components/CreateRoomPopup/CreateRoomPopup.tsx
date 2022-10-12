import * as React from 'react';
import { useMutation } from '@farfetched/react';
import { createRoomMutation } from '@/models/rooms';
import { BasePopup } from '@/types/common';
import { MainPopup } from '@/ui/MainPopup';
import { useGoBack } from '@/hooks';
import { RoomForm } from '../RoomForm';

import styles from './CreateRoomPopup.module.css';

export const CreateRoomPopup: React.FC<BasePopup> = (props) => {
	const onClose = useGoBack();
	const { start } = useMutation(createRoomMutation);
	return (
		<MainPopup {...props} onClose={onClose}>
			<RoomForm
				className={styles.form}
				submitHandler={start}
				afterSubmit={onClose}
				buttonText='Add'
			/>
		</MainPopup>
	);
};

import * as React from 'react';
import { BasePopup } from '@/interfaces/common';
import { MainPopup } from '@/ui/MainPopup';
import { useGoBack } from '@/hooks';
import { RoomForm } from '../RoomForm';
import { createRoom } from '@/models/Rooms';

export const CreateRoomPopup: React.FC<BasePopup> = ({ isOpen, isFocus }) => {
	const onClose = useGoBack();
	return (
		<MainPopup isOpen={isOpen} isFocus={isFocus} onClose={onClose}>
			<RoomForm
				submitHandler={createRoom}
				afterSubmit={onClose}
				buttonText='Add'
			/>
		</MainPopup>
	);
};

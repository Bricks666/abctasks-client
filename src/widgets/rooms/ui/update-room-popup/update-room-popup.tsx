import { useMutation } from '@farfetched/react';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { RoomForm, RoomFormValues, updateRoomModel } from '@/features/rooms';
import { useRoom } from '@/entities/rooms';
import { $roomId, closeUpdateRoomPopup } from '@/shared/models/routes';
import { BasePopupProps } from '@/shared/types';
import { MainPopup, LoadingIndicator } from '@/shared/ui';

import styles from './update-room-popup.module.css';

export const UpdateRoomPopup: React.FC<BasePopupProps> = (props) => {
	const { t, } = useTranslation('popups');
	const roomId = useUnit($roomId);
	const { data: room, } = useRoom(roomId!);
	const onClose = useUnit(closeUpdateRoomPopup);
	const updateRoom = useMutation(updateRoomModel.updateRoomMutation);

	const loading = !room;
	const onSubmit = React.useCallback<SubmitHandler<RoomFormValues>>(
		(values) => {
			updateRoom.start({ ...values, id: Number(roomId), });
		},
		[roomId]
	);

	const defaultValues = React.useMemo<RoomFormValues>(
		() => ({
			description: room?.description || '',
			name: room?.name || '',
		}),
		[room]
	);

	return (
		<MainPopup
			{...props}
			header={t('room.updateTitle')}
			onClose={() => onClose()}>
			{loading ? (
				<LoadingIndicator />
			) : (
				<RoomForm
					className={styles.form}
					onSubmit={onSubmit}
					defaultValues={defaultValues}
					buttonText={t('actions.save', { ns: 'common', })}
				/>
			)}
		</MainPopup>
	);
};

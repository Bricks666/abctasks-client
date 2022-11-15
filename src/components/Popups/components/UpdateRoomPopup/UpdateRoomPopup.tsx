import * as React from 'react';
import { useGate, useUnit } from 'effector-react';
import { useMutation } from '@farfetched/react';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
	getRoomQuery,
	RoomGate,
	updateRoomMutation,
	$roomId,
	closeUpdateRoomPopup,
} from '@/models';
import { BasePopupProps } from '@/types';
import { MainPopup, LoadingIndicator } from '@/shared/components';
import { RoomForm, RoomFormValues } from '../RoomForm';

import styles from './UpdateRoomPopup.module.css';

export const UpdateRoomPopup: React.FC<BasePopupProps> = (props) => {
	const { t } = useTranslation('popups');
	const roomId = useUnit($roomId);
	const room = useUnit(getRoomQuery.$data);
	const onClose = useUnit(closeUpdateRoomPopup);
	const updateRoom = useMutation(updateRoomMutation);
	useGate(RoomGate, { roomId: Number(roomId) });

	const loading = !room;
	const onSubmit = React.useCallback<SubmitHandler<RoomFormValues>>(
		(values) => {
			updateRoom.start({ ...values, id: Number(roomId) });
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
					buttonText={t('actions.save', { ns: 'common' })}
				/>
			)}
		</MainPopup>
	);
};

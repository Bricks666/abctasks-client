import * as React from 'react';
import { useGate } from 'effector-react';
import { useMutation, useQuery } from '@farfetched/react';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { getRoomQuery, roomGate, updateRoomMutation } from '@/models/rooms';
import { BasePopupProps } from '@/types/common';
import { useGetParam, useClosePopup } from '@/hooks';
import { routes } from '@/const';
import { MainPopup } from '@/ui/MainPopup';
import { LoadingIndicator } from '@/ui/LoadingIndicator';
import { RoomForm, RoomFormValues } from '../RoomForm';

import styles from './UpdateRoomPopup.module.css';

export const UpdateRoomPopup: React.FC<BasePopupProps> = (props) => {
	const { t } = useTranslation('popups');
	const roomId = Number(useGetParam(routes.GET_PARAMS.roomId));
	useGate(roomGate, { roomId });
	const onClose = useClosePopup(
		routes.GET_PARAMS.roomId,
		routes.POPUPS.createRoom
	);
	const { data: room } = useQuery(getRoomQuery);
	const updateRoom = useMutation(updateRoomMutation);

	const loading = !room;
	const onSubmit = React.useCallback<SubmitHandler<RoomFormValues>>(
		(values) => {
			updateRoom.start({ ...values, id: Number(roomId) });
			onClose();
		},
		[roomId, onClose]
	);

	const defaultValues = React.useMemo<RoomFormValues>(
		() => ({
			description: room?.description || '',
			name: room?.name || '',
		}),
		[room]
	);

	return (
		<MainPopup {...props} header={t('room.updateTitle')} onClose={onClose}>
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

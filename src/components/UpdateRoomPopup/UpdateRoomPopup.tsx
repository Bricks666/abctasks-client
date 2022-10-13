import * as React from 'react';
import { useMutation } from '@farfetched/react';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { getRoomQuery, updateRoomMutation } from '@/models/rooms';
import { BasePopup } from '@/types/common';
import { useGetParam, useGoBack, useImminentlyQuery } from '@/hooks';
import { GET_PARAMS } from '@/const';
import { MainPopup } from '@/ui/MainPopup';
import { LoadingIndicator } from '@/ui/LoadingIndicator';
import { RoomForm, RoomFormValues } from '../RoomForm';

import styles from './UpdateRoomPopup.module.css';

export const UpdateRoomPopup: React.FC<BasePopup> = (props) => {
	const onClose = useGoBack();
	const { t } = useTranslation('popups');
	const roomId = useGetParam(GET_PARAMS.roomId);
	const { data: room, loading } = useImminentlyQuery(
		getRoomQuery,
		Number(roomId),
		roomId
	);
	const updateRoom = useMutation(updateRoomMutation);

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

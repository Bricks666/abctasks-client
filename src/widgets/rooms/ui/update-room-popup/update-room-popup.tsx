import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { RoomForm, SkeletonRoomForm } from '@/features/rooms';
import { roomsModel, useRoom } from '@/entities/rooms';
import { BasePopupProps } from '@/shared/types';
import { MainPopup } from '@/shared/ui';
import { updateRoomPopupModel } from '../../model';

import styles from './update-room-popup.module.css';

export const UpdateRoomPopup: React.FC<BasePopupProps> = (props) => {
	const { t, } = useTranslation('popups');
	const roomId = useUnit(roomsModel.$id);
	const { data: room, } = useRoom(roomId!);
	const onClose = useUnit(updateRoomPopupModel.close);

	const loading = !room;

	return (
		<MainPopup {...props} title={t('room.updateTitle')} onClose={onClose}>
			{loading ? (
				<SkeletonRoomForm />
			) : (
				<RoomForm
					className={styles.form}
					buttonText={t('actions.save', { ns: 'common', })}
				/>
			)}
		</MainPopup>
	);
};

import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { roomsModel, useRoom } from '@/entities/rooms';
import { BasePopupProps } from '@/shared/types';
import { MainPopup } from '@/shared/ui';
import { updateRoomModel } from '../../model';
import { RoomForm } from '../room-form';
import { SkeletonRoomForm } from '../skeleton-room-form';

import styles from './update-room.module.css';

export const UpdateRoom: React.FC<BasePopupProps> = (props) => {
	const { t, } = useTranslation('popups');
	const roomId = useUnit(roomsModel.$id);
	const room = useRoom(roomId!);
	const onClose = useUnit(updateRoomModel.close);

	const loading = !room.pending;

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

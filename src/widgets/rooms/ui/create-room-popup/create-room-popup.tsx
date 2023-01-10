import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { createRoomModel, RoomFormValues, RoomForm } from '@/features/rooms';
import { BasePopupProps } from '@/shared/types';
import { MainPopup } from '@/shared/ui';
import { createRoomPopupModel } from '../../model';

import styles from './create-room-popup.module.css';

const defaultValues: RoomFormValues = {
	description: '',
	name: '',
};

export const CreateRoomPopup: React.FC<BasePopupProps> = (props) => {
	const { t, } = useTranslation('popups');
	const onClose = useUnit(createRoomPopupModel.close);
	const createRoom = useUnit(createRoomModel.mutation);

	return (
		<MainPopup
			{...props}
			title={t('room.createTitle')}
			onClose={() => onClose()}>
			<RoomForm
				className={styles.form}
				onSubmit={createRoom.start}
				defaultValues={defaultValues}
				buttonText={t('actions.create', { ns: 'common', })}
			/>
		</MainPopup>
	);
};

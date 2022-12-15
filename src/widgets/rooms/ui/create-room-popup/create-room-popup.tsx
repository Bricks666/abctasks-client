import { useMutation } from '@farfetched/react';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { createRoomModel, RoomFormValues, RoomForm } from '@/features/rooms';
import { closeCreateRoomPopup } from '@/shared/models/routes';
import { BasePopupProps } from '@/shared/types';
import { MainPopup } from '@/shared/ui';

import styles from './create-room-popup.module.css';

const defaultValues: RoomFormValues = {
	description: '',
	name: '',
};

export const CreateRoomPopup: React.FC<BasePopupProps> = (props) => {
	const { t, } = useTranslation('popups');
	const onClose = useUnit(closeCreateRoomPopup);
	const createRoom = useMutation(createRoomModel.createRoomMutation);

	return (
		<MainPopup
			{...props}
			header={t('room.updateTitle')}
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

import * as React from 'react';
import { useUnit } from 'effector-react';
import { useMutation } from '@farfetched/react';
import { useTranslation } from 'react-i18next';
import { createRoomMutation } from '@/models/rooms';
import { closeCreateRoomPopup } from '@/models/routing';
import { BasePopupProps } from '@/types';
import { MainPopup } from '@/ui/MainPopup';
import { RoomForm, RoomFormValues } from '../RoomForm';

import styles from './CreateRoomPopup.module.css';

const defaultValues: RoomFormValues = {
	description: '',
	name: '',
};

export const CreateRoomPopup: React.FC<BasePopupProps> = (props) => {
	const { t } = useTranslation('popups');
	const onClose = useUnit(closeCreateRoomPopup);
	const createRoom = useMutation(createRoomMutation);

	return (
		<MainPopup
			{...props}
			header={t('room.updateTitle')}
			onClose={() => onClose()}>
			<RoomForm
				className={styles.form}
				onSubmit={createRoom.start}
				defaultValues={defaultValues}
				buttonText={t('actions.create', { ns: 'common' })}
			/>
		</MainPopup>
	);
};

import * as React from 'react';
import { useMutation } from '@farfetched/react';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { createRoomMutation } from '@/models/rooms';
import { routes } from '@/const';
import { useClosePopup } from '@/hooks';
import { BasePopupProps } from '@/types/common';
import { MainPopup } from '@/ui/MainPopup';
import { RoomForm, RoomFormValues } from '../RoomForm';

import styles from './CreateRoomPopup.module.css';

const defaultValues: RoomFormValues = {
	description: '',
	name: '',
};

export const CreateRoomPopup: React.FC<BasePopupProps> = (props) => {
	const onClose = useClosePopup(routes.POPUPS.createRoom);
	const { t } = useTranslation('popups');
	const createRoom = useMutation(createRoomMutation);

	const onSubmit = React.useCallback<SubmitHandler<RoomFormValues>>(
		(values) => {
			createRoom.start(values);
			onClose();
		},
		[onClose]
	);
	return (
		<MainPopup {...props} header={t('room.updateTitle')} onClose={onClose}>
			<RoomForm
				className={styles.form}
				onSubmit={onSubmit}
				defaultValues={defaultValues}
				buttonText={t('actions.create', { ns: 'common' })}
			/>
		</MainPopup>
	);
};

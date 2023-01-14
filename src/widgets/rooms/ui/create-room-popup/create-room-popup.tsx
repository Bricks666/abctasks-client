import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { RoomForm } from '@/features/rooms';
import { BasePopupProps } from '@/shared/types';
import { MainPopup } from '@/shared/ui';
import { createRoomPopupModel } from '../../model';

import styles from './create-room-popup.module.css';

export const CreateRoomPopup: React.FC<BasePopupProps> = (props) => {
	const { t, } = useTranslation('popups');
	const onClose = useUnit(createRoomPopupModel.close);

	return (
		<MainPopup {...props} title={t('room.createTitle')} onClose={onClose}>
			<RoomForm
				className={styles.form}
				buttonText={t('actions.create', { ns: 'common', })}
			/>
		</MainPopup>
	);
};

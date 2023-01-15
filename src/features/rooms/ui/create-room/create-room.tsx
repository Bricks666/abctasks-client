import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { BasePopupProps, CommonProps } from '@/shared/types';
import { MainPopup } from '@/shared/ui';
import { createRoomModel } from '../../model';
import { RoomForm } from '../room-form';

import styles from './create-room.module.css';

export interface CreateRoomProps extends CommonProps, BasePopupProps {}

export const CreateRoom: React.FC<CreateRoomProps> = (props) => {
	const { t, } = useTranslation('popups');
	const onClose = useUnit(createRoomModel.close);

	return (
		<MainPopup {...props} title={t('room.createTitle')} onClose={onClose}>
			<RoomForm
				className={styles.form}
				buttonText={t('actions.create', { ns: 'common', })}
			/>
		</MainPopup>
	);
};

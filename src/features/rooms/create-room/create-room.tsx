import { Button } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { deviceInfoModel } from '@/shared/models';
import { BasePopupProps, CommonProps } from '@/shared/types';
import { FullWidthPopup, MainPopup } from '@/shared/ui';

import { RoomForm } from '../form';

import styles from './create-room.module.css';
import { close, form, mutation } from './model';

export interface CreateRoomProps extends CommonProps, BasePopupProps {}

export const CreateRoom: React.FC<CreateRoomProps> = (props) => {
	const { t, } = useTranslation('popups');
	const onClose = useUnit(close);
	const [isMobile, isVertical] = useUnit([
		deviceInfoModel.$isMobile,
		deviceInfoModel.$isTabletVertical
	]);

	const onClick = useUnit(form.submit);
	const pending = useUnit(mutation.$pending);

	const isFullscreen = isMobile || isVertical;

	const Popup = isFullscreen ? FullWidthPopup : MainPopup;

	const buttonText = t('actions.create', { ns: 'common', });

	const actions = isFullscreen ? (
		<Button type='submit' onClick={onClick}>
			{buttonText}
		</Button>
	) : null;

	return (
		<Popup
			{...props}
			title={t('room.createTitle')}
			onClose={onClose}
			slots={{ actions, }}>
			<RoomForm
				className={styles.form}
				buttonText={buttonText}
				$form={form}
				hideButton={isFullscreen}
				disabled={pending}
			/>
		</Popup>
	);
};
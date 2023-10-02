import { Button } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { roomsModel, useRoom } from '@/entities/rooms';

import { deviceInfoModel } from '@/shared/models';
import { BasePopupProps } from '@/shared/types';
import { FullWidthPopup, MainPopup } from '@/shared/ui';

import { SkeletonRoomForm, RoomForm } from '../form';

import { close, mutation, form } from './model';
import styles from './update-room.module.css';

export const UpdateRoom: React.FC<BasePopupProps> = (props) => {
	const { t, } = useTranslation('popups');
	const roomId = useUnit(roomsModel.$id);
	const { pending: loading, } = useRoom(roomId!);
	const onClose = useUnit(close);
	const [isMobile, isVertical] = useUnit([
		deviceInfoModel.$isMobile,
		deviceInfoModel.$isTabletVertical
	]);

	const onClick = useUnit(form.submit);
	const pending = useUnit(mutation.$pending);

	const isFullscreen = isMobile || isVertical;

	const Popup = isFullscreen ? FullWidthPopup : MainPopup;

	const buttonText = t('actions.save', { ns: 'common', });

	const actions = isFullscreen ? (
		<Button type='submit' onClick={onClick}>
			{buttonText}
		</Button>
	) : null;

	return (
		<Popup
			{...props}
			title={t('room.updateTitle')}
			onClose={onClose}
			slots={{ actions, }}>
			{loading ? (
				<SkeletonRoomForm />
			) : (
				<RoomForm
					className={styles.form}
					buttonText={buttonText}
					$form={form}
					disabled={pending}
					hideButton={isFullscreen}
				/>
			)}
		</Popup>
	);
};

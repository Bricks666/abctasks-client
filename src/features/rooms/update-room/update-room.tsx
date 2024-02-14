import { Button } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { roomModel } from '@/entities/rooms';

import { deviceInfoModel } from '@/shared/models';
import { BasePopupProps } from '@/shared/types';
import { FullWidthPopup, MainPopup } from '@/shared/ui';

import { SkeletonRoomForm, RoomForm } from '../form';

import { popupControls, mutation, form } from './model';
import styles from './update-room.module.css';

export const UpdateRoom: React.FC<BasePopupProps> = (props) => {
	const { t, } = useTranslation('rooms');
	const { pending: loading, } = useUnit(roomModel.query);
	const onClose = useUnit(popupControls.close);
	const [isMobile, isVertical] = useUnit([
		deviceInfoModel.$isMobile,
		deviceInfoModel.$isTabletVertical
	]);
	const titleId = React.useId();

	const onClick = useUnit(form.submit);
	const pending = useUnit(mutation.$pending);

	const isFullscreen = isMobile || isVertical;

	const Popup = isFullscreen ? FullWidthPopup : MainPopup;

	const title = t('actions.update_room.title');
	const buttonText = t('actions.save', { ns: 'common', });

	const actions = isFullscreen ? (
		<Button type='submit' onClick={onClick}>
			{buttonText}
		</Button>
	) : null;

	return (
		<Popup
			{...props}
			title={title}
			onClose={onClose}
			slots={{ actions, }}
			DialogTitleProps={{
				id: titleId,
			}}>
			{loading ? (
				<SkeletonRoomForm />
			) : (
				<RoomForm
					className={styles.form}
					ariaLabelledby={titleId}
					buttonText={buttonText}
					$form={form}
					disabled={pending}
					hideButton={isFullscreen}
				/>
			)}
		</Popup>
	);
};

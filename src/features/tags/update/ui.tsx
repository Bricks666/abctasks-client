import { Button } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { tagsModel, useTag } from '@/entities/tags';

import { routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { deviceInfoModel } from '@/shared/models';
import { BasePopupProps, CommonProps } from '@/shared/types';
import { FullWidthPopup, MainPopup } from '@/shared/ui';

import { SkeletonTagForm, TagForm } from '../form';

import { close, form, mutation } from './model';
import styles from './ui.module.css';

export interface UpdateTagProps extends CommonProps, BasePopupProps {}

export const UpdateTag: React.FC<React.PropsWithChildren<UpdateTagProps>> = (
	props
) => {
	const { t, } = useTranslation('room-tags');
	const roomId = useParam(routes.room.tags, 'id');
	const id = useUnit(tagsModel.$id);
	const onClose = useUnit(close);
	const pending = useUnit(mutation.$pending);
	const onClick = useUnit(form.submit);
	const tag = useTag(Number(id), roomId);
	const isLoading = !tag.data;

	const [isMobile, isVertical] = useUnit([
		deviceInfoModel.$isMobile,
		deviceInfoModel.$isTabletVertical
	]);
	const isFullscreen = isMobile || isVertical;

	const Popup = isFullscreen ? FullWidthPopup : MainPopup;

	const title = t('actions.update_tag.title');
	const buttonText = t('actions.save', { ns: 'common', });

	const actions = isFullscreen ? (
		<Button type='submit' onClick={onClick}>
			{buttonText}
		</Button>
	) : null;

	return (
		<Popup {...props} onClose={onClose} title={title} slots={{ actions, }}>
			{isLoading ? (
				<SkeletonTagForm className={styles.form} />
			) : (
				<TagForm
					className={styles.form}
					$form={form}
					buttonText={buttonText}
					hideButton={isFullscreen}
					buttonDisabled={pending}
				/>
			)}
		</Popup>
	);
};

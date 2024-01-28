import { Button } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { tagModel } from '@/entities/tags';

import { deviceInfoModel } from '@/shared/models';
import { BasePopupProps, CommonProps } from '@/shared/types';
import { FullWidthPopup, MainPopup } from '@/shared/ui';

import { SkeletonTagForm, TagForm } from '../form';

import { popupControls, form, mutation } from './model';
import styles from './ui.module.css';

export interface UpdateTagProps extends CommonProps, BasePopupProps {}

export const UpdateTag: React.FC<React.PropsWithChildren<UpdateTagProps>> = (
	props
) => {
	const { t, } = useTranslation('room-tags');
	const onClose = useUnit(popupControls.close);
	const pending = useUnit(mutation.$pending);
	const onClick = useUnit(form.submit);
	const tag = useUnit(tagModel.query);
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

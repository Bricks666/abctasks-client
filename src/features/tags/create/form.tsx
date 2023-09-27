import { Button } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { deviceInfoModel } from '@/shared/models';
import { BasePopupProps, CommonProps } from '@/shared/types';
import { FullWidthPopup, MainPopup } from '@/shared/ui';

import { TagForm } from '../form';

import styles from './form.module.css';
import { close, form, mutation } from './model';

export interface CreateTagProps extends CommonProps, BasePopupProps {}

export const CreateTag: React.FC<CreateTagProps> = (props) => {
	const { t, } = useTranslation('popups');
	const onClose = useUnit(close);
	const pending = useUnit(mutation.$pending);
	const onClick = useUnit(form.submit);

	const [isMobile, isVertical] = useUnit([
		deviceInfoModel.$isMobile,
		deviceInfoModel.$isTabletVertical
	]);
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
			onClose={onClose}
			title={t('group.createTitle')}
			slots={{ actions, }}>
			<TagForm
				className={styles.form}
				$form={form}
				buttonText={t('actions.create', { ns: 'common', })}
				hideButton={isFullscreen}
				buttonDisabled={pending}
			/>
		</Popup>
	);
};

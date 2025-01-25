import { Button } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { useIsSmallScreen } from '@/shared/models';
import { BasePopupProps, CommonProps } from '@/shared/types';
import { FullWidthPopup, MainPopup } from '@/shared/ui';

import { TagForm } from '../form';

import styles from './form.module.css';
import { popupControls, form, mutation } from './model';

export interface CreateTagProps extends CommonProps, BasePopupProps {}

export const CreateTag: React.FC<CreateTagProps> = (props) => {
	const { t, } = useTranslation('room-tags');
	const onClose = useUnit(popupControls.close);
	const pending = useUnit(mutation.$pending);
	const onClick = useUnit(form.submit);

	const isFullscreen = useIsSmallScreen();

	const Popup = isFullscreen ? FullWidthPopup : MainPopup;

	const titleT = t('actions.create_tag.title');
	const buttonT = t('actions.create', { ns: 'common', });

	const actions = isFullscreen ? (
		<Button type='submit' onClick={onClick}>
			{buttonT}
		</Button>
	) : null;

	return (
		<Popup {...props} onClose={onClose} title={titleT} slots={{ actions, }}>
			<TagForm
				className={styles.form}
				titleText={titleT}
				$form={form}
				buttonText={buttonT}
				hideButton={isFullscreen}
				buttonDisabled={pending}
			/>
		</Popup>
	);
};

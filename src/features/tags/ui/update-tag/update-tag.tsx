import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { tagsModel, useTag } from '@/entities/tags';

import { routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { BasePopupProps, CommonProps } from '@/shared/types';
import { MainPopup } from '@/shared/ui';

import { updateTagModel } from '../../model';
import { SkeletonTagForm } from '../skeleton-tag-form';
import { TagForm } from '../tag-form';

import styles from './update-tag.module.css';

export interface UpdateTagProps extends CommonProps, BasePopupProps {}

export const UpdateTag: React.FC<React.PropsWithChildren<UpdateTagProps>> = (
	props
) => {
	const { t, } = useTranslation('popups');
	const roomId = useParam(routes.room.tags, 'id');
	const id = useUnit(tagsModel.$id);
	const onClose = useUnit(updateTagModel.close);
	const tag = useTag(Number(id), roomId);
	const isLoading = !tag.data;

	return (
		<MainPopup {...props} onClose={onClose} title={t('group.updateTitle')}>
			{isLoading ? (
				<SkeletonTagForm className={styles.form} />
			) : (
				<TagForm
					className={styles.form}
					buttonText={t('actions.save', { ns: 'common', })}
				/>
			)}
		</MainPopup>
	);
};

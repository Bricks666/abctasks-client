import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { GroupForm, SkeletonGroupForm } from '@/features/groups';
import { groupsModel, useGroup } from '@/entities/groups';
import { routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { BasePopupProps, CommonProps } from '@/shared/types';
import { MainPopup } from '@/shared/ui';
import { updateGroupPopupModel } from '../../model';
import styles from './update-group-popup.module.css';

export interface UpdateGroupPopupProps extends CommonProps, BasePopupProps {}

export const UpdateGroupPopup: React.FC<
	React.PropsWithChildren<UpdateGroupPopupProps>
> = (props) => {
	const { t, } = useTranslation('popups');
	const roomId = useParam(routes.room.groups, 'id');
	const id = useUnit(groupsModel.$id);
	const onClose = useUnit(updateGroupPopupModel.close);
	const { data: group, } = useGroup(Number(id), roomId);
	const isLoading = !group;

	return (
		<MainPopup {...props} onClose={onClose} title={t('group.updateTitle')}>
			{isLoading ? (
				<SkeletonGroupForm className={styles.form} />
			) : (
				<GroupForm
					className={styles.form}
					buttonText={t('actions.save', { ns: 'common', })}
				/>
			)}
		</MainPopup>
	);
};

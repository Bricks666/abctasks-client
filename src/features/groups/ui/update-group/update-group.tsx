import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { groupsModel, useGroup } from '@/entities/groups';
import { routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { BasePopupProps, CommonProps } from '@/shared/types';
import { MainPopup } from '@/shared/ui';
import { updateGroupModel } from '../../model';
import { GroupForm } from '../group-form';
import { SkeletonGroupForm } from '../skeleton-group-form';
import styles from './update-group.module.css';

export interface UpdateGroupProps extends CommonProps, BasePopupProps {}

export const UpdateGroup: React.FC<
	React.PropsWithChildren<UpdateGroupProps>
> = (props) => {
	const { t, } = useTranslation('popups');
	const roomId = useParam(routes.room.groups, 'id');
	const id = useUnit(groupsModel.$id);
	const onClose = useUnit(updateGroupModel.close);
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

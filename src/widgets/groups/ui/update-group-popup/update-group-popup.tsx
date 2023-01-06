import { useUnit } from 'effector-react';
import * as React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
	GroupForm,
	GroupFormValues,
	SkeletonGroupForm,
	updateGroupModel
} from '@/features/groups';
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
	const roomId = useParam(routes.room, 'id');
	const id = useUnit(groupsModel.$id);
	const onClose = useUnit(updateGroupPopupModel.close);
	const { data: group, } = useGroup(Number(id));
	const updateGroup = useUnit(updateGroupModel.mutation);
	const isLoading = !group && id !== null;

	const onSubmit = React.useCallback<SubmitHandler<GroupFormValues>>(
		(values) => {
			updateGroup.start({
				...values,
				roomId: Number(roomId),
				id: Number(id),
			});
		},
		[id, roomId]
	);

	const changeGroup = React.useMemo<GroupFormValues>(
		() => ({
			mainColor: group?.mainColor || '',
			name: group?.name || '',
			secondColor: group?.secondColor || '',
		}),
		[group]
	);

	return (
		<MainPopup {...props} onClose={onClose} header={t('group.updateTitle')}>
			{isLoading ? (
				<SkeletonGroupForm className={styles.form} />
			) : (
				<GroupForm
					className={styles.form}
					defaultValues={changeGroup}
					onSubmit={onSubmit}
					buttonText={t('actions.save', { ns: 'common', })}
				/>
			)}
		</MainPopup>
	);
};

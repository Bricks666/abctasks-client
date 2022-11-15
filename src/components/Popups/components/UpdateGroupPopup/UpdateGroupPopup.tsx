import * as React from 'react';
import { useUnit } from 'effector-react';
import { useMutation } from '@farfetched/react';
import { useTranslation } from 'react-i18next';
import { SubmitHandler } from 'react-hook-form';
import { updateGroupMutation } from '@/models/groups';
import { $groupId, closeUpdateGroupPopup } from '@/models/routing';
import { roomRoute } from '@/routes';
import { useGroup, useParam } from '@/hooks';
import { BasePopupProps, CommonProps } from '@/types';
import { MainPopup } from '@/ui/MainPopup';
import { GroupForm, GroupFormValues } from '../GroupForm';
import { SkeletonGroupForm } from '../SkeletonGroupForm';

import styles from './UpdateGroupPopup.module.css';

export interface UpdateGroupPopupProps extends CommonProps, BasePopupProps {}

export const UpdateGroupPopup: React.FC<
	React.PropsWithChildren<UpdateGroupPopupProps>
> = (props) => {
	const { t } = useTranslation('popups');
	const roomId = useParam(roomRoute, 'id');
	const id = useUnit($groupId);
	const onClose = useUnit(closeUpdateGroupPopup);
	const group = useGroup(Number(id));
	const updateGroup = useMutation(updateGroupMutation);
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
		<MainPopup
			{...props}
			onClose={() => onClose()}
			header={t('group.updateTitle')}
			alt={t('group.updateTitle')}>
			{isLoading ? (
				<SkeletonGroupForm className={styles.form} />
			) : (
				<GroupForm
					className={styles.form}
					defaultValues={changeGroup}
					onSubmit={onSubmit}
					buttonText={t('actions.save', { ns: 'common' })}
				/>
			)}
		</MainPopup>
	);
};

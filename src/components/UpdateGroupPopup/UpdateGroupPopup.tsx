import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@farfetched/react';
import { useTranslation } from 'react-i18next';
import { SubmitHandler } from 'react-hook-form';
import { updateGroupMutation } from '@/models/groups';
import { useClosePopup, useGetParam, useGroup } from '@/hooks';
import { routes } from '@/const';
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
	const { id: roomId } = useParams();
	const id = useGetParam(routes.GET_PARAMS.groupId);
	const group = useGroup(Number(id));
	const updateGroup = useMutation(updateGroupMutation);
	const onClose = useClosePopup(
		routes.GET_PARAMS.groupId,
		routes.POPUPS.updateGroup
	);
	const isLoading = !group && id !== null;

	const onSubmit = React.useCallback<SubmitHandler<GroupFormValues>>(
		(values) => {
			updateGroup.start({
				...values,
				roomId: Number(roomId),
				id: Number(id),
			});
			onClose();
		},
		[id, roomId, onClose]
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
			onClose={onClose}
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

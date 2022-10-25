import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@farfetched/react';
import { useTranslation } from 'react-i18next';
import { SubmitHandler } from 'react-hook-form';
import { updateGroupMutation } from '@/models/groups';
import { routes } from '@/const';
import { BasePopupProps, CommonProps } from '@/types';
import { MainPopup } from '@/ui/MainPopup';
import { useClosePopup, useGetParam, useGroupsMap } from '@/hooks';
import { LoadingIndicator } from '@/ui/LoadingIndicator';
import { GroupForm, GroupFormValues } from '../GroupForm';

import styles from './UpdateGroupPopup.module.css';

export interface UpdateGroupPopupProps extends CommonProps, BasePopupProps {}

export const UpdateGroupPopup: React.FC<
	React.PropsWithChildren<UpdateGroupPopupProps>
> = (props) => {
	const { t } = useTranslation('popups');
	const { id: roomId } = useParams();
	const id = Number(useGetParam(routes.GET_PARAMS.groupId));
	const { data: groups } = useGroupsMap();
	const group = groups?.[id] || null;
	const updateGroup = useMutation(updateGroupMutation);
	const onClose = useClosePopup(
		routes.GET_PARAMS.groupId,
		routes.POPUPS.updateGroup
	);
	const isLoading = !group;

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
				<LoadingIndicator />
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

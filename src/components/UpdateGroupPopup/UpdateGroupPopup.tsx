import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@farfetched/react';
import { useTranslation } from 'react-i18next';
import { SubmitHandler } from 'react-hook-form';
import { updateGroupMutation } from '@/models/groups';
import { GET_PARAMS } from '@/const';
import { BasePopup, CommonProps } from '@/types/common';
import { MainPopup } from '@/ui/MainPopup';
import { useGetParam, useGoBack, useGroupsMap } from '@/hooks';
import { LoadingIndicator } from '@/ui/LoadingIndicator';
import { GroupForm, GroupFormValues } from '../GroupForm';

import styles from './UpdateGroupPopup.module.css';

export interface UpdateGroupPopupProps extends CommonProps, BasePopup {}

export const UpdateGroupPopup: React.FC<
	React.PropsWithChildren<UpdateGroupPopupProps>
> = (props) => {
	const onClose = useGoBack();
	const { t } = useTranslation('popups');
	const { id: roomId } = useParams();
	const id = Number(useGetParam(GET_PARAMS.groupId));
	const { data: groups, status } = useGroupsMap(Number(roomId));
	const group = groups[id];
	const updateGroup = useMutation(updateGroupMutation);
	const isLoading = status === 'initial' || status === 'pending' || !group;

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

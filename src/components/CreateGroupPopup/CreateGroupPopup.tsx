import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SubmitHandler } from 'react-hook-form';
import { useMutation } from '@farfetched/react';
import { createGroupMutation } from '@/models/groups';
import { BasePopup, CommonProps } from '@/types/common';
import { MainPopup } from '@/ui/MainPopup';
import { useGoBack } from '@/hooks';
import { GroupForm, GroupFormValues } from '../GroupForm';
import { defaultFormValues } from './data';

import styles from './CreateGroupPopup.module.css';

export interface CreateGroupPopupProps extends CommonProps, BasePopup {}

export const CreateGroupPopup: React.FC<CreateGroupPopupProps> = (props) => {
	const onClose = useGoBack();
	const { t } = useTranslation('popups');
	const { id: roomId } = useParams();
	const createGroup = useMutation(createGroupMutation);

	const onSubmit = React.useCallback<SubmitHandler<GroupFormValues>>(
		(values) => {
			createGroup.start({
				...values,
				roomId: Number(roomId),
			});
		},
		[roomId]
	);
	return (
		<MainPopup
			{...props}
			onClose={onClose}
			header={t('group.createTitle')}
			alt={t('group.createTitle')}>
			<GroupForm
				className={styles.form}
				onSubmit={onSubmit}
				defaultValues={defaultFormValues}
				buttonText={t('actions.create', { ns: 'common' })}
			/>
		</MainPopup>
	);
};

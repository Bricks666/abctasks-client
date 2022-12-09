import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { SubmitHandler } from 'react-hook-form';
import { useUnit } from 'effector-react';
import { useMutation } from '@farfetched/react';
import { createGroupMutation, closeCreateGroupPopup } from '@/models';
import { BasePopupProps, CommonProps } from '@/types';
import { useParam } from '@/hooks';
import { roomRoute } from '@/routes';
import { MainPopup } from '@/shared/components';
import { GroupForm, GroupFormValues } from '../GroupForm';
import { defaultFormValues } from './data';

import styles from './CreateGroupPopup.module.css';

export interface CreateGroupPopupProps extends CommonProps, BasePopupProps {}

export const CreateGroupPopup: React.FC<CreateGroupPopupProps> = (props) => {
	const { t, } = useTranslation('popups');
	const roomId = useParam(roomRoute, 'id');
	const onClose = useUnit(closeCreateGroupPopup);
	const createGroup = useMutation(createGroupMutation);

	const onSubmit = React.useCallback<SubmitHandler<GroupFormValues>>(
		(values) => {
			createGroup.start({
				...values,
				roomId,
			});
		},
		[roomId]
	);
	return (
		<MainPopup
			{...props}
			onClose={() => onClose()}
			header={t('group.createTitle')}>
			<GroupForm
				className={styles.form}
				onSubmit={onSubmit}
				defaultValues={defaultFormValues}
				buttonText={t('actions.create', { ns: 'common', })}
			/>
		</MainPopup>
	);
};

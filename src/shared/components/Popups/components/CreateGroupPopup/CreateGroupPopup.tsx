import { useMutation } from '@farfetched/react';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { MainPopup } from '@/shared/ui';
import { GroupForm, GroupFormValues } from '../GroupForm';
import styles from './CreateGroupPopup.module.css';
import { defaultFormValues } from './data';
import { useParam } from '@/hooks';
import { createGroupMutation, closeCreateGroupPopup } from '@/models';
import { roomRoute } from '@/routes';
import { BasePopupProps, CommonProps } from '@/types';

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

import { useMutation } from '@farfetched/react';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
	createGroupModel,
	GroupForm,
	GroupFormValues
} from '@/features/groups';
import { routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { closeCreateGroupPopup } from '@/shared/models/routes';
import { BasePopupProps, CommonProps } from '@/shared/types';
import { MainPopup } from '@/shared/ui';
import styles from './create-group-popup.module.css';
import { defaultFormValues } from './data';

export interface CreateGroupPopupProps extends CommonProps, BasePopupProps {}

export const CreateGroupPopup: React.FC<CreateGroupPopupProps> = (props) => {
	const { t, } = useTranslation('popups');
	const roomId = useParam(routes.room, 'id');
	const onClose = useUnit(closeCreateGroupPopup);
	const createGroup = useMutation(createGroupModel.createGroupMutation);

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
		<MainPopup {...props} onClose={onClose} header={t('group.createTitle')}>
			<GroupForm
				className={styles.form}
				onSubmit={onSubmit}
				defaultValues={defaultFormValues}
				buttonText={t('actions.create', { ns: 'common', })}
			/>
		</MainPopup>
	);
};

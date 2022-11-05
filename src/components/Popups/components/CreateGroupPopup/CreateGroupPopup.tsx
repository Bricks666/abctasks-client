import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { SubmitHandler } from 'react-hook-form';
import { useMutation } from '@farfetched/react';
import { createGroupMutation } from '@/models/groups';
import { routes } from '@/const';
import { BasePopupProps, CommonProps } from '@/types';
import { useClosePopup, useParam } from '@/hooks';
import { roomRoute } from '@/routes';
import { MainPopup } from '@/ui/MainPopup';
import { GroupForm, GroupFormValues } from '../GroupForm';
import { defaultFormValues } from './data';

import styles from './CreateGroupPopup.module.css';

export interface CreateGroupPopupProps extends CommonProps, BasePopupProps {}

export const CreateGroupPopup: React.FC<CreateGroupPopupProps> = (props) => {
	const onClose = useClosePopup(routes.POPUPS.createGroup);
	const { t } = useTranslation('popups');
	const roomId = useParam(roomRoute, 'id');
	const createGroup = useMutation(createGroupMutation);

	const onSubmit = React.useCallback<SubmitHandler<GroupFormValues>>(
		(values) => {
			createGroup.start({
				...values,
				roomId,
			});
			onClose();
		},
		[roomId, onClose]
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

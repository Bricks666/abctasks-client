import { Button } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { CommonProps } from '@/shared/types';

import { mutation } from './model';


export interface ApproveInvitationButtonProps extends CommonProps {
	readonly id: number;
}

export const ApproveInvitationButton: React.FC<ApproveInvitationButtonProps> = (
	props
) => {
	const { id, className, } = props;

	const { t, } = useTranslation('room-invitation');
	const approve = useUnit(mutation);

	const onClick = () => {
		approve.start({ id, });
	};

	const text = t('actions.approve.actions.button');

	return (
		<Button className={className} color='success' onClick={onClick}>
			{text}
		</Button>
	);
};

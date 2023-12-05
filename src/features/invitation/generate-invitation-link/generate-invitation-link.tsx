import CopyAllIcon from '@mui/icons-material/CopyAll';
import { IconButton, Tooltip } from '@mui/material';
import { useGate, useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { CommonProps } from '@/shared/types';
import { Field, Form } from '@/shared/ui';

import styles from './generate-invitation-link.module.css';
import { Gate, copyLink, form } from './model';

export interface GenerateInvitationLinkProps extends CommonProps {
	readonly roomId: number;
}

export const GenerateInvitationLink: React.FC<GenerateInvitationLinkProps> = (
	props
) => {
	const { className, roomId, } = props;

	useGate(Gate, { roomId, });

	return (
		<Form className={className} variant='elevation' elevation={0}>
			<div className={styles.container}>
				<InvitationLink />
				<CopyButton />
			</div>
		</Form>
	);
};

const InvitationLink: React.FC = () => {
	const link = useUnit(form.fields.link);
	const { t, } = useTranslation('room-invitations');

	const label = t('actions.generate_link.fields.link');

	return (
		<Field
			value={link.value}
			onChange={link.onChange}
			onBlur={link.onBlur}
			helperText={link.errorText}
			isValid={link.isValid}
			name='link'
			label={label}
			InputProps={{ readOnly: true, }}
		/>
	);
};

const CopyButton: React.FC = () => {
	const { t, } = useTranslation('room-invitations');

	const onClick = useUnit(copyLink);

	const title = t('actions.generate_link.actions.copy');

	return (
		<Tooltip title={title}>
			<IconButton onClick={onClick} color='primary'>
				<CopyAllIcon />
			</IconButton>
		</Tooltip>
	);
};

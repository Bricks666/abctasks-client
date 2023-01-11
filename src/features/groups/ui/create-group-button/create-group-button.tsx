import { Button } from '@mui/material';
import { Link } from 'atomic-router-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { routes, getParams, popups } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';

export interface CreateGroupButtonProps extends CommonProps {}

export const CreateGroupButton: React.FC<CreateGroupButtonProps> = React.memo(
	(props) => {
		const { className, } = props;
		const roomId = useParam(routes.room.groups, 'id');
		const { t, } = useTranslation('common');

		return (
			<Button
				className={className}
				to={routes.room.groups as any}
				params={{ id: roomId, }}
				query={{ [getParams.popup]: popups.createGroup, }}
				component={Link}>
				{t('actions.create')}
			</Button>
		);
	}
);

import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Tooltip } from '@mui/material';
import { useAction } from '@reatom/npm-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { CommonProps } from '@/shared/types';

import { logoutModel } from '../../model';

export interface LogoutButtonProps extends CommonProps {}

export const LogoutButton: React.FC<LogoutButtonProps> = (props) => {
	const { className, } = props;

	const { t, } = useTranslation('common', { keyPrefix: 'profile_menu', });

	const logout = useAction(logoutModel.logout);

	const titleT = t('items.logout');

	return (
		<Tooltip title={titleT}>
			<Button className={className} onClick={logout}>
				<LogoutIcon />
			</Button>
		</Tooltip>
	);
};

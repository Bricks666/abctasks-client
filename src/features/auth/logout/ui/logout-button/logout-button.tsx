import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Tooltip } from '@mui/material';
import { reatomComponent } from '@reatom/npm-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { CommonProps } from '@/shared/types';

import { useLogout } from '../../lib';

export interface LogoutButtonProps extends CommonProps {}

export const LogoutButton: FC<LogoutButtonProps> = reatomComponent((props) => {
	const { className, ctx, } = props;

	const { t, } = useTranslation('common', { keyPrefix: 'profile_menu', });

	const model = useLogout();

	const titleT = t('items.logout');

	return (
		<Tooltip title={titleT}>
			<Button className={className} onClick={ctx.bind(model.logout)}>
				<LogoutIcon />
			</Button>
		</Tooltip>
	);
}, 'LogoutButton');

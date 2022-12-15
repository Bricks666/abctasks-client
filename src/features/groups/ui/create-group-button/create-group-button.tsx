import { Button } from '@mui/material';
import { Link } from 'atomic-router-react';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { routes } from '@/shared/configs';
import { getParams, popups } from '@/shared/const';
import { CommonProps } from '@/shared/types';

export interface CreateGroupButtonProps extends CommonProps {}

export const CreateGroupButton: React.FC<CreateGroupButtonProps> = (props) => {
	const { className, } = props;
	const params = useUnit(routes.room.$params);
	const { t, } = useTranslation('common');

	return (
		<Button
			className={className}
			to={routes.room as any}
			params={params}
			query={{ [getParams.popup]: popups.createGroup, }}
			component={Link}>
			{t('actions.create')}
		</Button>
	);
};

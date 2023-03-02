import { Button } from '@mui/material';
import { RouteInstance } from 'atomic-router';
import { Link } from 'atomic-router-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { routes, getParams, popupsMap } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';

export interface CreateTagButtonProps extends CommonProps {}

export const CreateTagButton: React.FC<CreateTagButtonProps> = React.memo(
	(props) => {
		const { className, } = props;
		const roomId = useParam(routes.room.tags, 'id');
		const { t, } = useTranslation('common');

		return (
			<Button
				className={className}
				to={routes.room.tags as RouteInstance<any>}
				params={{ id: roomId, }}
				query={{ [getParams.popup]: popupsMap.createTag, }}
				component={Link}>
				{t('actions.create')}
			</Button>
		);
	}
);

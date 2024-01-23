import AddIcon from '@mui/icons-material/Add';
import { IconButton, Tooltip } from '@mui/material';
import { RouteInstance } from 'atomic-router';
import { Link } from 'atomic-router-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { routes, getParams, popupsMap } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';

export interface OpenCreateTagFormProps extends CommonProps {}

export const OpenCreateTagForm: React.FC<OpenCreateTagFormProps> = React.memo(
	(props) => {
		const { className, } = props;
		const roomId = useParam(routes.room.tags, 'id');
		const { t, } = useTranslation('room-tags');

		const title = t('actions.create_tag.actions.open');

		return (
			<Tooltip title={title}>
				<IconButton
					className={className}
					to={routes.room.tags as RouteInstance<any>}
					params={{ id: roomId, }}
					query={{ [getParams.popup]: popupsMap.createTag, }}
					component={Link}>
					<AddIcon />
				</IconButton>
			</Tooltip>
		);
	}
);

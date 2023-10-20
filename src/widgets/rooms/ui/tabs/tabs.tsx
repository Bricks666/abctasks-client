import AssessmentIcon from '@mui/icons-material/Assessment';
import LabelIcon from '@mui/icons-material/Label';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import { TabContext, TabList } from '@mui/lab';
import { Tab } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { deviceInfoModel } from '@/shared/models';
import { CommonProps } from '@/shared/types';

export const Tabs: React.FC<CommonProps> = React.memo(() => {
	const { t, } = useTranslation('tabs');
	const tab = useParam(routes.room.base, 'tab') || 'tasks';
	const id = useParam(routes.room.base, 'id');

	const tabs = t('tabs', { returnObjects: true, }) as Record<string, string>;

	const [isVertical, isMobile] = useUnit([
		deviceInfoModel.$isTabletVertical,
		deviceInfoModel.$isMobile
	]);

	const showLabels = !isVertical && !isMobile;

	const onChange = React.useCallback(
		(_evt: unknown, value: string) => {
			routes.room.base.navigate({
				params: {
					id,
					tab: value,
				},
				query: {},
			});
		},
		[id]
	);

	return (
		<TabContext value={tab}>
			<TabList onChange={onChange} variant='scrollable' scrollButtons='auto'>
				<Tab
					icon={<ListAltIcon />}
					iconPosition='start'
					label={showLabels ? tabs.tasks : null}
					value='tasks'
				/>
				<Tab
					icon={<LabelIcon />}
					iconPosition='start'
					label={showLabels ? tabs.tags : null}
					value='tags'
				/>
				<Tab
					icon={<AssessmentIcon />}
					iconPosition='start'
					label={showLabels ? tabs.activities : null}
					value='activities'
				/>
				<Tab
					icon={<PeopleIcon />}
					iconPosition='start'
					label={showLabels ? tabs.users : null}
					value='users'
				/>
			</TabList>
		</TabContext>
	);
});

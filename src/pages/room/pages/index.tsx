import { createRoutesView } from 'atomic-router-react';
import * as React from 'react';
import { routes } from '@/shared/configs';
import { LoadingIndicator, LoadingWrapper } from '@/shared/ui';

export const TasksPage = React.lazy(() => import('./tasks'));
export const GroupsPage = React.lazy(() => import('./groups'));
export const ActivitiesPage = React.lazy(() => import('./activities'));
export const UsersPage = React.lazy(() => import('./users'));

const Views = createRoutesView({
	routes: [
		{
			route: routes.room.tasks,
			view: TasksPage,
		},
		{
			route: routes.room.activities,
			view: ActivitiesPage,
		},
		{
			route: routes.room.groups,
			view: GroupsPage,
		},
		{
			route: routes.room.users,
			view: UsersPage,
		}
	],
});

export const Pages: React.FC = () => {
	return (
		<React.Suspense
			fallback={
				<LoadingWrapper loadingIndicator={<LoadingIndicator />} isLoading />
			}>
			<Views />
		</React.Suspense>
	);
};

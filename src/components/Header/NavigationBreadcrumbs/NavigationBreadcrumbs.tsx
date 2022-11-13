import * as React from 'react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { Breadcrumbs, Typography, Link } from '@mui/material';
import { Link as AtomicLink } from 'atomic-router-react';
import { router } from '@/models/routing';
import { CommonProps } from '@/types';
import { breadcrumbsMap } from './data';

export interface NavigationBreadcrumbsProps extends CommonProps {}

export const NavigationBreadcrumbs: React.FC<NavigationBreadcrumbsProps> =
	React.memo(function NavigationBreadcrumbs(props) {
		const { className } = props;
		const pathname = useUnit(router.$path);
		const pathnames = pathname.split('/').filter((x) => !!x);
		return (
			<Breadcrumbs className={cn(className)}>
				{pathnames.map((path, index) => {
					const last = index === pathnames.length - 1;
					const to = `/${pathnames.slice(0, index + 1).join('/')}`;
					return last ? (
						<Typography color='text.primary' key={to}>
							{breadcrumbsMap[to]}
						</Typography>
					) : (
						<Link
							underline='hover'
							color='inherit'
							to={to}
							key={to}
							component={AtomicLink}>
							{breadcrumbsMap[to]}
						</Link>
					);
				})}
			</Breadcrumbs>
		);
	});

import * as React from 'react';
import cn from 'classnames';
import { Breadcrumbs, Typography, Link } from '@mui/material';
import { useLocation, Link as ReactLink } from 'react-router-dom';
import { CommonProps } from '@/types';
import { breadcrumbsMap } from './data';

export interface NavigationBreadcrumbsProps extends CommonProps {}

export const NavigationBreadcrumbs: React.FC<NavigationBreadcrumbsProps> =
	React.memo(function NavigationBreadcrumbs(props) {
		const { className } = props;
		const { pathname } = useLocation();
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
							component={ReactLink}>
							{breadcrumbsMap[to]}
						</Link>
					);
				})}
			</Breadcrumbs>
		);
	});

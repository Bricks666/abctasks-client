import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useLocationState } from '@/hooks';
import { CommonProps } from '@/interfaces/common';
import { Link } from '@/ui/Link';

export interface SaveLinkProps extends CommonProps {
	to: string;
}

export const SaveLink: React.FC<React.PropsWithChildren<SaveLinkProps>> = ({
	className,
	to,
	children,
}) => {
	const location = useLocation();
	const state = useLocationState();

	return (
		<Link className={className} type='react' to={to} state={state || location}>
			{children}
		</Link>
	);
};

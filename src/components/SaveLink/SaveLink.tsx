import * as React from 'react';
import { Button } from '@mui/material';
import { useLocation, Link } from 'react-router-dom';
import { useLocationState } from '@/hooks';
import { CommonProps } from '@/types';

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
		<Button
			className={className}
			to={to}
			state={state || location}
			variant='text'
			component={Link}>
			{children}
		</Button>
	);
};

import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/interfaces/common';

import styles from './LoadingWrapper.module.css';

export interface LoadingWrapperProps extends CommonProps {
	readonly isLoading: boolean;
	readonly loadingIndicator: React.ReactElement;
}

export const LoadingWrapper: React.FC<
	React.PropsWithChildren<LoadingWrapperProps>
> = ({ className, isLoading, loadingIndicator, children }) => {
	return isLoading ? (
		<div className={cn(styles.wrapper, className)}>{loadingIndicator}</div>
	) : (
		(children as React.ReactElement)
	);
};

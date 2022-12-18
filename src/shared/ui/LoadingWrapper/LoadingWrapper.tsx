import cn from 'classnames';
import * as React from 'react';
import { CommonProps } from '@/shared/types';
import styles from './LoadingWrapper.module.css';

export interface LoadingWrapperProps extends CommonProps {
	readonly isLoading: boolean;
	readonly loadingIndicator: React.ReactElement;
}

export const LoadingWrapper: React.FC<
	React.PropsWithChildren<LoadingWrapperProps>
> = (props) => {
	const { className, isLoading, loadingIndicator, children, } = props;
	return isLoading ? (
		<div className={cn(styles.wrapper, className)}>{loadingIndicator}</div>
	) : (
		(children as React.ReactElement)
	);
};

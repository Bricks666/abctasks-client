import cn from 'classnames';
import * as React from 'react';

import { CommonProps } from '@/shared/types';

import styles from './loading-wrapper.module.css';

export interface LoadingWrapperProps extends CommonProps {
	readonly isLoading: boolean;
	readonly loadingIndicator: React.ReactElement;
}

export const LoadingWrapper: React.FC<
	React.PropsWithChildren<LoadingWrapperProps>
> = (props) => {
	const { className, isLoading, loadingIndicator, children, } = props;
	return (
		<div className={cn({ [styles.wrapper]: isLoading, }, className)}>
			{isLoading ? loadingIndicator : children}
		</div>
	);
};

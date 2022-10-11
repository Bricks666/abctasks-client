import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/interfaces/common';

import LoadingWrapperStyle from './LoadingWrapper.module.css';

export interface LoadingWrapperProps extends CommonProps {
	readonly isLoading: boolean;
	readonly loadingIndicator: React.ReactElement;
}

export const LoadingWrapper: React.FC<
	React.PropsWithChildren<LoadingWrapperProps>
> = React.memo(function LoadingWrapper({
	className,
	isLoading,
	loadingIndicator,
	children,
}) {
	return isLoading ? (
		<div className={cn(LoadingWrapperStyle.wrapper, className)}>
			{loadingIndicator}
		</div>
	) : (
		(children as React.ReactElement)
	);
});

import * as React from 'react';
import { CommonProps } from '@/types/common';
import { List } from '../List';
import { LoadingWrapper } from '../LoadingWrapper';

export interface ListWithLoadingProps extends CommonProps {
	readonly isLoading: boolean;
	readonly loadingIndicator: React.ReactElement;
}

export const ListWithLoading: React.FC<
	React.PropsWithChildren<ListWithLoadingProps>
> = ({ loadingIndicator, isLoading, className, children }) => {
	return (
		<LoadingWrapper
			className={className}
			isLoading={isLoading}
			loadingIndicator={loadingIndicator}>
			<List className={className}>{children}</List>
		</LoadingWrapper>
	);
};

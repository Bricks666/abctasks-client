import * as React from 'react';
import { CommonProps } from '@/types/common';

export interface GridItemProps extends CommonProps {
	readonly columnCount?: number | string;
}

export const GridItem: React.FC<React.PropsWithChildren<GridItemProps>> =
	React.memo(function GridItem({ children, className, columnCount = 12 }) {
		const styles = {
			gridColumn: `span ${columnCount}`,
		};
		return (
			<div className={className} style={styles}>
				{children}
			</div>
		);
	});

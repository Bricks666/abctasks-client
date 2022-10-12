import cn from 'classnames';
import * as React from 'react';
import { SvgIcon } from '../SvgIcon';
import { CommonProps } from '@/types/common';

import styles from './PlusIcon.module.css';

export const PlusIcon: React.FC<CommonProps> = ({ className }) => {
	return (
		<SvgIcon
			className={cn(styles.icon, className)}
			viewBox='0 0 6.35 6.35'
			title='plus'>
			<rect width='.794' height='6.35' x='2.778' ry='.52' />
			<rect
				width='.794'
				height='6.35'
				x='2.778'
				y='-6.35'
				ry='.52'
				transform='rotate(90)'
			/>
		</SvgIcon>
	);
};

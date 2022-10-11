import cn from 'classnames';
import * as React from 'react';
import { CommonProps } from '@/interfaces/common';
import { SvgIcon } from '../SvgIcon';

import styles from './CrossIcon.module.css';

export const CrossIcon: React.FC<CommonProps> = ({ className }) => {
	return (
		<SvgIcon
			className={cn(styles.icon, className)}
			viewBox='0 0 6.3500037 6.3500038'
			title='cross'>
			<g transform='translate(-0.84736779,-0.71342559)'>
				<path d='M 1.3768578,1.2429156 6.6629112,6.5289688' />
				<path d='M 6.6676514,1.2431456 1.3770878,6.5337092' />
			</g>
		</SvgIcon>
	);
};

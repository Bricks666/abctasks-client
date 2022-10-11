import * as React from 'react';
import { CommonProps } from '@/interfaces/common';
import { SvgIcon } from '../SvgIcon';

import styles from './SuccessIcon.module.css';

export const SuccessIcon: React.FC<CommonProps> = ({ className }) => {
	return (
		<SvgIcon className={className} viewBox='0 0 6.35 6.35' title='success'>
			<g transform='matrix(1.04777 0 0 1.10377 -1.108 -.48)'>
				<rect
					className={styles.icon}
					width='.635'
					height='3.47'
					x='-1.4'
					y='2.788'
					ry='.183'
					transform='rotate(-45)'
				/>
				<rect
					className={styles.icon}
					width='.635'
					height='5.374'
					x='5.623'
					y='-3.975'
					ry='.284'
					transform='rotate(45)'
				/>
			</g>
		</SvgIcon>
	);
};

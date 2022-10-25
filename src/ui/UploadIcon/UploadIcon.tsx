import * as React from 'react';
import { CommonProps } from '@/types';
import { SvgIcon } from '../SvgIcon';

import styles from './UploadIcon.module.css';

export const UploadIcon: React.FC<CommonProps> = ({ className }) => {
	return (
		<SvgIcon className={className} viewBox='0 0 6.35 6.35'>
			<rect
				className={styles.rect}
				width='5.292'
				height='.661'
				x='.529'
				y='5.689'
				ry='.265'
				rx='.265'
			/>
			<rect
				className={styles.rect}
				width='4.762'
				height='.661'
				x='.654'
				y='-3.506'
				ry='.265'
				rx='.238'
				transform='rotate(90)'
			/>
			<g transform='translate(.05)'>
				<rect
					className={styles.rect}
					width='2.646'
					height='.661'
					x='2.292'
					y='-2.126'
					ry='.265'
					rx='.132'
					transform='rotate(45)'
				/>
				<rect
					className={styles.rect}
					width='2.646'
					height='.661'
					x='-2.126'
					y='-2.954'
					ry='.265'
					rx='.132'
					transform='rotate(135)'
				/>
			</g>
			<rect
				className={styles.rect}
				width='.087'
				height='.019'
				x='2.217'
				y='1.573'
				rx='.132'
				ry='.019'
			/>
		</SvgIcon>
	);
};

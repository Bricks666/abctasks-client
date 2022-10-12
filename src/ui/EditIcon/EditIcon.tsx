import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/types/common';
import { SvgIcon } from '../SvgIcon';

import styles from './EditIcon.module.css';

export const EditIcon: React.FC<CommonProps> = ({ className }) => {
	return (
		<SvgIcon
			className={cn(styles.icon, className)}
			viewBox='0 0 6.3499999 6.3500002'
			title='Pen'>
			<g transform='rotate(45 6.244 2.292) scale(1.47563 1.65069)'>
				<rect width='.794' height='3.969' x='2.786' y='1.206' ry='.132' />
				<rect
					width='.794'
					height='.397'
					x='2.786'
					y='.644'
					ry='.132'
					rx='.132'
				/>
				<path
					d='M12.125 18.688c.15.276-1.325 2.695-1.64 2.687-.315-.007-1.672-2.495-1.508-2.764.164-.269 2.997-.2 3.148.077z'
					transform='matrix(.25206 -.00666 .00719 .27202 .389 .046)'
				/>
			</g>
		</SvgIcon>
	);
};

import * as React from 'react';
import { CommonProps } from '@/interfaces/common';
import { SvgIcon } from '../SvgIcon';

import InfoIconStyle from './InfoIcon.module.css';

export const InfoIcon: React.FC<CommonProps> = ({ className }) => {
	return (
		<SvgIcon className={className} viewBox='0 0 6.35 6.35' title='info'>
			<g transform='translate(-.913 -.136)'>
				<circle className={InfoIconStyle.icon} cx='4.088' cy='.665' r='.529' />
				<rect
					className={InfoIconStyle.icon}
					width='1.058'
					height='4.762'
					x='3.559'
					y='1.724'
					ry='.745'
				/>
			</g>
		</SvgIcon>
	);
};

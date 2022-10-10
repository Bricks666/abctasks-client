import cn from 'classnames';
import * as React from 'react';
import { CommonProps } from '@/interfaces/common';
import { SvgIcon } from '../SvgIcon';

import DotsIconStyle from './DotsIcon.module.css';

export const DotsIcon: React.FC<CommonProps> = React.memo(function DotsIcon({
	className,
}) {
	return (
		<SvgIcon
			className={cn(DotsIconStyle.icon, className)}
			viewBox='0 0 20 6'
			title='Three dots'>
			<circle cx='3' cy='3' r='3' />
			<circle cx='10' cy='3' r='3' />
			<circle cx='17' cy='3' r='3' />
		</SvgIcon>
	);
});

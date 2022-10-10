import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/interfaces/common';
import { Color } from '@/interfaces/ui';
import { Block } from '../Block';
import { IconButton } from '../IconButton';
import { CrossIcon } from '../CrossIcon';
import { ExclamationIcon } from '../ExclamationIcon';
import { SuccessIcon } from '../SuccessIcon';
import { InfoIcon } from '../InfoIcon';

import AlertStyle from './Alert.module.css';

type AllowedColor = Exclude<Color, 'dark' | 'secondary'>;

export interface AlertProps extends CommonProps {
	readonly color?: AllowedColor;
	readonly type?: 'filed' | 'outline' | 'standard';
	readonly onClose?: React.MouseEventHandler;
	readonly action?: React.ReactElement;
}

const iconMap: Record<AllowedColor, React.ReactElement> = {
	error: <ExclamationIcon />,
	success: <SuccessIcon />,
	warning: <ExclamationIcon />,
	primary: <InfoIcon />,
};

export const Alert: React.FC<React.PropsWithChildren<AlertProps>> = ({
	className,
	children,
	onClose,
	action,
	color = 'primary',
	type = 'standard',
}) => {
	const rootClasses = cn(
		AlertStyle.root,
		AlertStyle[color],
		AlertStyle[type],
		className
	);
	const actionPart =
		action ||
		(onClose ? (
			<IconButton onClick={onClose} size='small'>
				<CrossIcon />
			</IconButton>
		) : null);
	return (
		<Block className={rootClasses} role='alert'>
			<div className={AlertStyle.icon}>{iconMap[color]}</div>
			<div className={AlertStyle.content}>{children}</div>
			{actionPart && <div className={AlertStyle.action}>{actionPart}</div>}
		</Block>
	);
};

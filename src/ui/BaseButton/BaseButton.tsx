/* eslint-disable react/button-has-type */
import cn from 'classnames';
import * as React from 'react';
import { CommonProps } from '@/types/common';

import styles from './BaseButton.module.css';

interface BaseButtonOwnProps<E extends React.ElementType> extends CommonProps {
	readonly component?: E;
}

export type BaseButtonProps<E extends React.ElementType> =
	BaseButtonOwnProps<E> &
		React.ComponentPropsWithoutRef<E> &
		React.PropsWithChildren;

export const BaseButton = <E extends React.ElementType>(
	props: BaseButtonProps<E>
): React.ReactElement => {
	const { className, component = 'button', children, ...rest } = props;
	const Tag = component;
	const classes = cn(styles.button, className);
	return (
		<Tag className={classes} {...rest}>
			{children}
		</Tag>
	);
};

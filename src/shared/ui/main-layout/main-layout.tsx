import cn from 'classnames';
import * as React from 'react';

import { CommonProps } from '@/shared/types';

import styles from './main-layout.module.css';

export interface MainLayoutProps extends CommonProps, React.PropsWithChildren {
	readonly header: React.ReactElement;
}

export const MainLayout: React.FC<MainLayoutProps> = (props) => {
	const { className, children, header, } = props;

	return (
		<section className={styles.wrapper}>
			{header}
			<main className={cn(styles.layout, className)}>{children}</main>
		</section>
	);
};

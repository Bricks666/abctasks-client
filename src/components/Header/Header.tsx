import * as React from 'react';
import { Block } from '@/ui/Block';
import { CommonProps } from '@/types/common';
import { ProfileLink } from './ProfileLink';

import styles from './Header.module.css';

export const Header: React.FC<CommonProps> = ({ className }) => {
	return (
		<header className={className}>
			<Block className={styles.layout}>
				<ProfileLink className={styles.avatar} />
			</Block>
		</header>
	);
};

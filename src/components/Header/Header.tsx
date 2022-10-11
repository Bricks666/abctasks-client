import * as React from 'react';
import { Block } from '@/ui/Block';
import { CommonProps } from '@/interfaces/common';
import { ContentLayout } from '@/ui/ContentLayout';
import { ProfileLink } from './ProfileLink';

import styles from './Header.module.css';

export const Header: React.FC<CommonProps> = ({ className }) => {
	return (
		<header className={className}>
			<ContentLayout>
				<Block className={styles.layout}>
					<ProfileLink className={styles.avatar} />
				</Block>
			</ContentLayout>
		</header>
	);
};

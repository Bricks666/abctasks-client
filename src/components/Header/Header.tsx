import * as React from 'react';
import classNames from 'classnames';
import { Block } from '@/ui/Block';
import { CommonProps } from '@/interfaces/common';
import { ContentLayout } from '@/ui/ContentLayout';
import { ProfileLink } from './ProfileLink';

import HeaderStyle from './Header.module.css';

export const Header: React.FC<CommonProps> = ({ className }) => {
	return (
		<header className={classNames(HeaderStyle.header, className)}>
			<ContentLayout>
				<Block className={HeaderStyle.layout}>
					<ProfileLink className={HeaderStyle.avatar} />
				</Block>
			</ContentLayout>
		</header>
	);
};

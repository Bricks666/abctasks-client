import cn from 'classnames';
import * as React from 'react';
import { CreateGroupButton } from '@/features/groups';
import { CommonProps } from '@/shared/types';
import { GroupList } from '../group-list';

import styles from './groups.module.css';

export interface GroupsProps extends CommonProps {}

export const Groups: React.FC<GroupsProps> = React.memo(function Groups(props) {
	const { className, } = props;

	return (
		<section className={cn(styles.groups, className)}>
			<CreateGroupButton />
			<GroupList />
		</section>
	);
});

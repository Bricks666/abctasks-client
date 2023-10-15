import { Query } from '@farfetched/core';
import { List, ListItemProps, Paper, Typography } from '@mui/material';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';

import { getEmptyArray } from '@/shared/configs';
import { CommonProps, Slots } from '@/shared/types';

import { Center } from '../center';

import styles from './friendly-list.module.css';

interface BaseFriendlyListProps<
	Item,
	Error,
	ListItemOmittedProps = Omit<ListItemProps, keyof Item>
> extends CommonProps {
	readonly skeletonsCount: number;
	readonly ItemComponent: React.ComponentType<
		ListItemOmittedProps & Item & CommonProps
	>;
	readonly SkeletonComponent: React.ComponentType<ListItemOmittedProps>;
	readonly ErrorComponent: React.ComponentType<{ readonly error: Error }>;
	readonly emptyText: string;
	readonly getKey: (item: Item) => React.Key | null;
	readonly slots?: Slots<'before' | 'after'>;
	readonly disableBorder?: boolean;
}

interface ArrayQueryFriendlyListProps<Item, Error>
	extends BaseFriendlyListProps<Item, Error> {
	readonly $query: Query<any, Item[], Error, any>;
	readonly getData?: never;
}

interface AnyQueryFriendlyListProps<RawData, Item, Error>
	extends BaseFriendlyListProps<Item, Error> {
	readonly $query: Query<any, RawData, Error, any>;
	readonly getData: (data: RawData) => Item[] | null;
}

export type FriendlyListProps<RawData, Item, Error> =
	| ArrayQueryFriendlyListProps<Item, Error>
	| AnyQueryFriendlyListProps<RawData, Item, Error>;

export const FriendlyList = <RawData, Item, Error>(
	props: FriendlyListProps<RawData, Item, Error>
): React.ReactElement => {
	const {
		$query,
		getData,
		getKey,
		emptyText,
		ErrorComponent,
		ItemComponent,
		SkeletonComponent,
		skeletonsCount,
		className,
		slots,
		disableBorder,
	} = props;

	const query = useUnit($query as Query<any, Item[] | RawData, any>);

	const arrayData = (getData ? getData(query.data as RawData) : query.data) as
		| Item[]
		| null;

	const isEmpty = !arrayData?.length;
	const isLoading = query.pending;
	const isError = !query.error;

	let content: React.ReactElement | null = null;

	if (!isError) {
		content = (
			<Center>
				{React.createElement(ErrorComponent, { error: query.error, })}
			</Center>
		);
	} else if (isLoading) {
		const array = getEmptyArray(skeletonsCount);
		const count = array.length;

		const skeletons = array.map((_, index) =>
			React.createElement(SkeletonComponent, {
				key: index,
				divider: index + 1 !== count,
			})
		);

		content = <List disablePadding>{skeletons}</List>;
	} else if (isEmpty) {
		content = (
			<Center>
				<Typography>{emptyText}</Typography>
			</Center>
		);
	} else {
		const count = arrayData.length;
		const items = arrayData.map((item, index) =>
			React.createElement(ItemComponent, {
				...item,
				divider: index + 1 !== count,
				key: getKey(item),
			})
		);

		content = <List disablePadding>{items}</List>;
	}

	const hasBeforeSlot = !!slots?.before;
	const hasAfterSlot = !!slots?.after;
	const slotBefore = hasBeforeSlot ? <Center>{slots.before}</Center> : null;
	const slotAfter = hasAfterSlot ? <Center>{slots.after}</Center> : null;

	const hasBothSlot = hasBeforeSlot && hasAfterSlot;

	const classes = cn(
		styles.paper,
		{
			[styles.after]: hasAfterSlot,
			[styles.before]: hasBeforeSlot,
			[styles.slots]: hasBothSlot,
			[styles['border-disabled']]: disableBorder,
		},
		className
	);

	return (
		<Paper className={classes}>
			{slotBefore}
			{content}
			{slotAfter}
		</Paper>
	);
};

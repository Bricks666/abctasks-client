import { Query } from '@farfetched/core';
import {
	List,
	ListItemProps,
	Paper,
	PaperProps,
	Typography
} from '@mui/material';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';

import { getEmptyArray } from '@/shared/configs';
import { Classes, CommonProps, Slots } from '@/shared/types';

import { Center } from '../center';
import { Scrollable } from '../scrollable';

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
	readonly classes?: Classes<'list'>;
	readonly disableBorder?: boolean;
	readonly rootProps?: Omit<PaperProps, 'className'>;
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
		classes,
		rootProps,
	} = props;

	const finished = useUnit($query.finished);
	const [alreadyFetched, setAlreadyFetched] = React.useState(finished);

	React.useEffect(() => {
		if (finished) {
			setAlreadyFetched(finished);
		}
	}, [finished]);

	const query = useUnit($query as Query<any, Item[] | RawData, any>);

	const arrayData = (getData ? getData(query.data as RawData) : query.data) as
		| Item[]
		| null;

	const isEmpty = !arrayData?.length;
	const isLoading = query.pending && !alreadyFetched;
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
			} as any)
		);

		content = (
			<Scrollable direction='vertical'>
				<List className={classes?.list} disablePadding>
					{skeletons}
				</List>
			</Scrollable>
		);
	} else if (isEmpty) {
		content = (
			<Center>
				<Typography fontWeight={500}>{emptyText}</Typography>
			</Center>
		);
	} else {
		const count = arrayData.length;
		const items = arrayData.map((item, index) =>
			React.createElement(ItemComponent, {
				...item,
				divider: index + 1 !== count,
				key: getKey(item),
			} as any)
		);

		content = (
			<Scrollable direction='vertical'>
				<List className={classes?.list} disablePadding>
					{items}
				</List>
			</Scrollable>
		);
	}

	const hasBeforeSlot = !!slots?.before;
	const hasAfterSlot = !!slots?.after;
	const slotBefore = hasBeforeSlot ? <Center>{slots.before}</Center> : null;
	const slotAfter = hasAfterSlot ? <Center>{slots.after}</Center> : null;

	const hasBothSlot = hasBeforeSlot && hasAfterSlot;

	const paperClasses = cn(
		styles.paper,
		{
			[styles.after]: hasAfterSlot,
			[styles.before]: hasBeforeSlot,
			[styles.both]: hasBothSlot,
			[styles['border-disabled']]: disableBorder,
		},
		className
	);

	return (
		<Paper className={paperClasses} {...rootProps}>
			{slotBefore}
			{content}
			{slotAfter}
		</Paper>
	);
};

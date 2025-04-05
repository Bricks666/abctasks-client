import {
	List,
	ListItemProps,
	Paper,
	PaperProps,
	Typography
} from '@mui/material';
import { Atom } from '@reatom/framework';
import { useAtom } from '@reatom/npm-react';
import cn from 'classnames';
import { ComponentType, Key, ReactElement, createElement } from 'react';

import { getEmptyArray } from '@/shared/configs';
import { Classes, CommonProps, Slots } from '@/shared/types';

import { Center } from '../center';
import { Scrollable } from '../scrollable';

import styles from './friendly-list.module.css';

interface SkeletonOptions<ListItemOmittedProps> {
	readonly skeletonsCount: number;
	readonly SkeletonComponent: ComponentType<ListItemOmittedProps>;
}

interface ErrorOptions<Error> {
	readonly errorAtom: Atom<Error | null>;
	readonly ErrorComponent: ComponentType<{ readonly error: Error }>;
}

interface LoadingOptions {
	readonly pendingAtom: Atom<boolean>;
}

interface ItemOptions<Item, ListItemOmittedProps> {
	readonly ItemComponent: ComponentType<
		ListItemOmittedProps & Item & CommonProps
	>;
	readonly emptyText: string;
	readonly getKey: (item: Item) => Key | null;
}

interface BaseFriendlyListProps<
	Item,
	Error,
	ListItemOmittedProps = Omit<ListItemProps, keyof Item>
> extends CommonProps,
		SkeletonOptions<ListItemOmittedProps>,
		ErrorOptions<Error>,
		LoadingOptions,
		ItemOptions<Item, ListItemOmittedProps> {
	readonly slots?: Slots<'before' | 'after'>;
	readonly classes?: Classes<'list'>;
	readonly disableBorder?: boolean;
	readonly rootProps?: Omit<PaperProps, 'className'>;
}

interface ArrayDataFriendlyListProps<Item, Error>
	extends BaseFriendlyListProps<Item, Error> {
	readonly dataAtom: Atom<Item[]>;
	readonly getData?: never;
}

interface AnyDataFriendlyListProps<RawData, Item, Error>
	extends BaseFriendlyListProps<Item, Error> {
	readonly dataAtom: Atom<RawData>;
	readonly getData: (data: RawData) => Item[] | null;
}

export type FriendlyListProps<RawData, Item, Error> =
	| ArrayDataFriendlyListProps<Item, Error>
	| AnyDataFriendlyListProps<RawData, Item, Error>;

export const FriendlyList = <RawData, Item, Error>(
	props: FriendlyListProps<RawData, Item, Error>
): ReactElement => {
	const {
		className,

		dataAtom,
		pendingAtom,
		errorAtom,

		getData,
		getKey,

		emptyText,

		ErrorComponent,
		ItemComponent,
		SkeletonComponent,

		skeletonsCount,

		slots,
		disableBorder,
		classes,
		rootProps,
	} = props;

	const [data] = useAtom(dataAtom);
	const [pending] = useAtom(pendingAtom);
	const [error] = useAtom(errorAtom);

	const arrayData = (getData ? getData(data as RawData) : data) as
		| Item[]
		| null;

	const isEmpty = !arrayData?.length;
	const isError = !!error;

	let content: ReactElement | null = null;

	if (isError) {
		content = <Center>{createElement(ErrorComponent, { error, })}</Center>;
	} else if (pending) {
		const array = getEmptyArray(skeletonsCount);
		const count = array.length;

		const skeletons = array.map((_, index) =>
			createElement(SkeletonComponent, {
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
			createElement(ItemComponent, {
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

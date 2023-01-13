import { AlertProps, SlideProps } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { Event, Store } from 'effector';

export type Vertical = 'top' | 'bottom';
export type Horizontal = 'left' | 'right' | 'center';
export type Duration = TransitionProps['timeout'];
export type Variant = AlertProps['variant'];
export type Direction = SlideProps['direction'];
export type Color = AlertProps['color'];

type WithStores<T extends Record<any, any>> = {
	[key in keyof T]:
		| T[key]
		| Store<
				T[key] extends null ? NonNullable<T[key]> | null : NonNullable<T[key]>
		  >;
};

export interface Position {
	/**
	 * Position by x axis
	 * @default 'left'
	 */
	readonly horizontal: Horizontal;
	/**
	 * Position by y axis
	 * @default 'bottom'
	 */
	readonly vertical: Vertical;
}

/**
 * @internal
 */
export interface BaseConfig {
	/**
	 * Duration of animation
	 * @default 250
	 */
	readonly duration?: Duration;
	/**
	 * Snackbar variant
	 * @default 'standard'
	 */
	readonly variant?: Variant;

	readonly closable?: boolean;
}

export interface StaticFabricConfig extends BaseConfig {
	/**
	 * timeout how long snack will be showed
	 * @default 3000
	 */
	readonly timeout: number;
	/**
	 * max count of snacks in the stack
	 * @default 3
	 */
	readonly maxCount: number;
	/**
	 * Position of container
	 */
	readonly position: Position;
}

export interface FabricConfig extends WithStores<StaticFabricConfig> {}

export interface Snackbar
	extends Omit<StaticFabricConfig, 'maxCount' | 'position'> {
	/**
	 * Instance id
	 * It's auto incremented begin 1
	 */
	readonly id: number;
	/**
	 * Instance message
	 */
	readonly message: string;
	/**
	 * True if it open and turn false if it will be unmounted
	 */
	readonly open: boolean;
	/**
	 * Color of snack
	 */
	readonly color?: Color;
}

export interface CreateSnackbarOptions
	extends Partial<Omit<Snackbar, 'message' | 'id' | 'open'>>,
		Pick<Snackbar, 'message'> {}

export interface SnackbarStackModel {
	/**
	 * All snacks in this stack
	 *
	 * @public
	 */
	readonly $items: Store<Snackbar[]>;
	/**
	 * Container position
	 *
	 * @public
	 */
	readonly $config: Store<StaticFabricConfig>;
	/**
	 * Create a new snack
	 *
	 * @public
	 */
	readonly create: Event<CreateSnackbarOptions>;
	/**
	 * Triggered after creation of snack
	 *
	 * @public
	 */
	readonly created: Event<Snackbar>;
	/**
	 * Close a snack by id
	 *
	 * @public
	 */
	readonly close: Event<number>;
	/**
	 * Triggered after unmounting of snack
	 *
	 * @public
	 */
	readonly closed: Event<number>;
	/**
	 * Triggered after mounting of snack
	 *
	 * @internal
	 */
	readonly mounted: Event<number>;
	/**
	 * Triggered after unmounting of snack
	 *
	 * @internal
	 */
	readonly unmounted: Event<number>;

	/**
	 * Support unitshape protocol
	 */
	readonly '@@unitShape': () => {
		readonly items: Store<Snackbar[]>;
		readonly create: Event<CreateSnackbarOptions>;
		readonly created: Event<Snackbar>;
		readonly close: Event<number>;
		readonly closed: Event<number>;
		readonly mounted: Event<number>;
		readonly unmounted: Event<number>;
	};
}

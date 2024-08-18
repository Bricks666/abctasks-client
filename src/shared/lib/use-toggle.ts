import * as React from 'react';

import { VoidFunction } from '../types';

interface UseToggleHandlers {
	readonly toggle: VoidFunction;
	readonly toggleOff: VoidFunction;
	readonly toggleOn: VoidFunction;
}

export type UseToggleResult = [toggled: boolean, handlers: UseToggleHandlers];

export const useToggle = (defaultValue = false): UseToggleResult => {
	const [toggled, setToggled] = React.useState(defaultValue);

	const toggle = React.useCallback(() => {
		setToggled((toggled) => !toggled);
	}, []);

	const toggleOn = React.useCallback(() => setToggled(true), []);

	const toggleOff = React.useCallback(() => setToggled(false), []);

	return [toggled, { toggle, toggleOff, toggleOn, }];
};

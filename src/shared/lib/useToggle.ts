import * as React from 'react';

export const useToggle = (defaultValue = false) => {
	const [toggled, setToggled] = React.useState(defaultValue);

	const toggle = React.useCallback(() => {
		setToggled((toggled) => !toggled);
	}, []);

	const toggleOn = React.useCallback(() => setToggled(true), []);

	const toggleOff = React.useCallback(() => setToggled(false), []);

	return [toggled, { toggle, toggleOff, toggleOn, }] as const;
};

import * as React from 'react';

export interface MenuContextValue {
	readonly onClose?: (...args: any[]) => any;
}

const MenuContext = React.createContext<MenuContextValue | null>(null);

export const MenuProvider = MenuContext.Provider;

export const useMenuContext = () => {
	const context = React.useContext(MenuContext);

	if (!context) {
		console.log('There is no MenuContext');
		throw new Error('There is no MenuContext');
	}

	return context;
};

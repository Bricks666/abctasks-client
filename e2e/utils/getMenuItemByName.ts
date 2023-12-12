import { Locator, Page } from '@playwright/test';

export const getMenuItemByName = (
	parent: Page | Locator,
	name: string
): Locator => {
	return parent.getByRole('menuitem', { name });
};

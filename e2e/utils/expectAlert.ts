import { Locator, Page, expect } from '@playwright/test';

type Type = 'success' | 'error' | 'info';

export interface ExpectAlertParams {
	readonly parent: Page | Locator;
	readonly type: Type;
	readonly message: string;
	readonly title?: string;
}

const colors: Record<Type, string> = {
	success: 'rgb(46, 125, 50)',
	error: 'rgb(211, 47, 47)',
	info: 'rgb(2, 136, 39)',
};

export const expectAlert = async (
	params: ExpectAlertParams
): Promise<Locator> => {
	const { message, parent, type, title } = params;

	const alert = parent.getByRole('alert');
	await expect(alert).toBeVisible();
	await expect(alert).toHaveCSS('background-color', colors[type]);
	await expect(alert).toHaveText(new RegExp(message));
	if (title) {
		await expect(alert).toHaveText(new RegExp(title));
	}

	return alert;
};

import { Locator, Page, expect } from '@playwright/test';

export interface ExpectRoomCardParams {
	readonly parent: Page | Locator;
	readonly name: string;
	readonly description: string;
}

export const expectRoomCard = async (
	params: ExpectRoomCardParams
): Promise<Locator> => {
	const { name, parent, description } = params;
	const card = parent.locator('ul div').first();

	await expect(card).toBeVisible();
	await expect(card).toHaveText(new RegExp(name));
	await expect(card).toHaveText(new RegExp('Description:'));
	await expect(card).toHaveText(new RegExp(description));

	return card;
};

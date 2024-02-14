import { Locator, Page, expect } from '@playwright/test';

export interface ExpectProgressItemParams {
	readonly parent: Locator | Page;
	readonly tagName: string;
	readonly done: number;
	readonly total: number;
}

export const expectProgressItem = async (
	params: ExpectProgressItemParams
): Promise<Locator> => {
	const { parent, done, tagName, total } = params;

	const item = parent.getByRole('listitem').filter({ hasText: tagName });

	await expect(item).toBeVisible();
	await expect(
		item.getByLabel(`Progress of ${tagName} tasks is ${done} from ${total}`)
	).toBeVisible();

	return item;
};

import { Locator, Page, expect } from '@playwright/test';

export type ActivityItemType = 'success' | 'error' | 'warning';

export interface ExpectActivityItemParams {
	readonly parent: Page | Locator;
	readonly content: string;
	readonly type: ActivityItemType;
}

const iconIdMap = {
	success: 'AddIcon',
	error: 'DeleteIcon',
	warning: 'EditIcon',
};

export const expectActivityItem = async (
	params: ExpectActivityItemParams
): Promise<Locator> => {
	const { content, parent, type } = params;

	const item = parent
		.getByRole('listitem')
		.filter({ hasText: new RegExp(content) });

	await expect(item).toBeVisible();
	await expect(item).toHaveText(new RegExp(content));
	await expect(item.getByTestId(iconIdMap[type])).toBeVisible();

	return item;
};

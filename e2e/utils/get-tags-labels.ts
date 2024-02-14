import { Tag } from '../fixtures';

export const getTagsLabels = (tags: Tag[]): string[] => {
	return tags.map((tag) => tag.name);
};

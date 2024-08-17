import { Tag } from '@/shared/api';

import { generateId } from './generate-id';

export const tags: Tag[] = [
	{
		id: 1,
		roomId: 1,
		name: 'A tag',
		mainColor: '#123321',
		secondColor: '#564701',
	},
	{
		id: 2,
		roomId: 1,
		name: 'The tag',
		mainColor: '#AA3321',
		secondColor: '#FE4701',
	},
	{
		id: 4,
		roomId: 1,
		name: 'tag tag',
		mainColor: '#FAE321',
		secondColor: '#56F701',
	}
];

export const defaultTag = tags[0];

export const createTag = (tag?: Partial<Tag>): Tag => {
	return {
		...defaultTag,
		id: generateId(),
		...tag,
	};
};

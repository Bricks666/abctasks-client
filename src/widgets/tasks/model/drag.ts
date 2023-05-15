import { createDomain, sample } from 'effector';
import { DragEvent } from 'react';
import { TaskStatus } from '@/shared/api';

const dragTaskDomain = createDomain();

export const $id = dragTaskDomain.store<number | null>(null);
export const $startColumn = dragTaskDomain.store<TaskStatus | null>(null);

export const dragStarted = dragTaskDomain.event<DragEvent<HTMLDivElement>>();
export const dragEnded = dragTaskDomain.event<DragEvent<HTMLDivElement>>();
export const drop = dragTaskDomain.event<DragEvent<HTMLDivElement>>();
export const dropped = dragTaskDomain.event<DragEvent<HTMLDivElement>>();

sample({
	clock: dragStarted,
	fn: (evt) => {
		const id = Number(evt.currentTarget.dataset.id);
		return Number.isNaN(id) ? null : id;
	},
	target: $id,
});

sample({
	clock: dragStarted,
	fn: (evt) => {
		return (evt.currentTarget.dataset.status as TaskStatus) ?? null;
	},
	target: $startColumn,
});

sample({
	clock: drop,
	source: {
		id: $id,
		startColumn: $startColumn,
	},
	filter: ({ id, startColumn, }, evt) => {
		const { status, } = evt.currentTarget.dataset;
		return id !== null && startColumn !== status && !!status;
	},
	fn: (_, evt) => evt,
	target: dropped,
});

sample({
	clock: dragEnded,
	fn: () => null,
	target: [$id, $startColumn],
});

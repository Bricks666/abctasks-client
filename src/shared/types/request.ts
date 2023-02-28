export interface InRoomParams {
	readonly roomId: number;
}

export interface PaginationParams {
	readonly page?: number;
	readonly count?: number;
}

export type SortDirection = 'asc' | 'desc';

export interface SortParams {
	readonly by: string;
	readonly type: SortDirection;
}

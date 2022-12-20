import { Group } from '@/shared/api';

export interface GroupsMap {
	[id: number]: Group | undefined;
}

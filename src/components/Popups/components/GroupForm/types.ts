import { Group } from '@/models/groups';

export interface GroupFormValues extends Omit<Group, 'id' | 'roomId'> {}

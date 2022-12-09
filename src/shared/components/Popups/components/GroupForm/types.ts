import { Group } from '@/models';

export interface GroupFormValues extends Omit<Group, 'id' | 'roomId'> {}

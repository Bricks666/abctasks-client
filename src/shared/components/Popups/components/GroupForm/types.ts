import { Group } from '@/shared/models';

export interface GroupFormValues extends Omit<Group, 'id' | 'roomId'> {}

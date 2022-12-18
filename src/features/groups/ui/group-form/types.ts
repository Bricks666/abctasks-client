import { Group } from '@/shared/api';

export interface GroupFormValues extends Omit<Group, 'id' | 'roomId'> {}

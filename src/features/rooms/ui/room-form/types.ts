import { Room } from '@/shared/api';

export interface RoomFormValues extends Pick<Room, 'description' | 'name'> {}

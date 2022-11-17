import { Room } from '@/models';

export interface RoomFormValues extends Pick<Room, 'description' | 'name'> {}

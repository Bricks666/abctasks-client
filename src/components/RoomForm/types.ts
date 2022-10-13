import { Room } from '@/models/rooms';

export interface RoomFormValues extends Pick<Room, 'description' | 'name'> {}

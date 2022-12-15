import { Room } from '@/shared/models';

export interface RoomFormValues extends Pick<Room, 'description' | 'name'> {}

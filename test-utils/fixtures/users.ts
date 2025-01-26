import { UserDto } from '@/shared/api';

export const users: UserDto[] = [
	{
		id: 1,
		email: 'email@example.org',
		username: 'username',
		photo: null,
	},
	{
		id: 2,
		email: 'another-email@example.org',
		username: 'Cool-user',
		photo: null,
	},
	{
		id: 3,
		email: 'some-strange-email@example.org',
		username: 'Shit-user',
		photo: '/some/photo/path.jpg',
	}
];

export const defaultUser = users[0];

import * as activities from './activities';
import * as auth from './auth';
import * as invitations from './invitations';
import * as members from './members';
import * as rooms from './rooms';
import * as tags from './tags';
import * as tasks from './tasks';
import * as users from './users';

export const standardHandlers = [
	...activities.standard,
	...auth.standard,
	...invitations.standard,
	...members.standard,
	...rooms.standard,
	...users.standard,
	...tags.standard,
	...tasks.standard
];

export const handlers = {
	activities,
	auth,
	invitations,
	members,
	rooms,
	users,
	tags,
	tasks,
};

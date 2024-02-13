import { BrowserContext, test as base } from '@playwright/test';

export interface UserParams {
	readonly id?: number;
	readonly email?: string;
	readonly username?: string;
	readonly password?: string;
	readonly activated?: boolean;
}

export interface User {
	readonly id: number;
	readonly email: string;
	readonly username: string;
	readonly photo: null | string;
	readonly password: string;
	readonly activated: boolean;
}

export interface LoginParams extends UserParams {
	readonly remember?: boolean;
}

export interface Tokens {
	readonly accessToken: string;
}

export interface Login {
	readonly tokens: Tokens;
	readonly user: User;
}

export interface MemberParams {
	readonly room?: RoomParams;
	readonly user?: UserParams;
	readonly status?: 'activated' | 'removed';
}

export interface Member {
	readonly roomId: number;
	readonly userId: number;
	readonly status: 'activated' | 'removed';
}

export interface RoomParams {
	readonly id?: number;
	readonly name?: string;
	readonly description?: string;
	readonly createdAt?: Date | null;
	readonly updatedAt?: Date | null;
	readonly ownerId?: number;
	readonly members?: MemberParams[];
}

export interface Room {
	readonly id: number;
	readonly name: string;
	readonly description: string;
	readonly createdAt: Date | null;
	readonly updatedAt: Date | null;
	readonly ownerId: number;
}

export interface TagParams {
	readonly id?: number;
	readonly room?: RoomParams;
	readonly name?: string;
	readonly mainColor?: string;
	readonly secondColor?: string;
}

export interface Tag {
	readonly id: number;
	readonly roomId: number;
	readonly name: string;
	readonly mainColor: string;
	readonly secondColor: string;
}

export interface TaskParams {
	readonly id?: number;
	readonly room?: RoomParams;
	readonly tags?: TagParams[];
	readonly author?: UserParams;
	readonly title?: string;
	readonly description?: string;
	readonly status?: string;
	readonly createdAt?: string;
	readonly updatedAt?: string;
}

export interface Task {
	readonly id: number;
	readonly roomId: number;
	readonly tags: Tag[];
	readonly author: User;
	readonly title: string;
	readonly description: string;
	readonly status: string;
	readonly createdAt: string;
	readonly updatedAt: string;
}

export interface InvitationParams {
	readonly id?: number;
	readonly room?: RoomParams;
	readonly inviter?: UserParams;
	readonly user?: UserParams;
	readonly status?: string;
}

export interface Invitation {
	readonly id: number;
	readonly room: Room;
	readonly inviter: User;
	readonly user: User;
	readonly status: string;
}

export interface ActivityParams {
	readonly id?: number;
	readonly room?: RoomParams;
	readonly activist?: UserParams;
	readonly action?: string;
	readonly sphere?: string;
	readonly createdAt?: string;
}

interface ActivitySphere {
	readonly id: number;
	readonly name: string;
}

interface ActivityAction {
	readonly id: number;
	readonly name: string;
}

export interface Activity {
	readonly id: number;
	readonly roomId: number;
	readonly activist: User;
	readonly action: ActivityAction;
	readonly sphere: ActivitySphere;
	readonly createdAt: string;
}

export interface TestingApiFixture {
	user(data?: UserParams): Promise<User>;
	removeUser(data?: UserParams): Promise<boolean>;

	auth(data?: LoginParams): Promise<Login>;
	activateAccountLink(data?: UserParams): Promise<string>;
	logout(data: never): Promise<boolean>;

	room(data?: RoomParams): Promise<Room>;
	removeRoom(data?: RoomParams): Promise<boolean>;

	member(data?: MemberParams): Promise<Member>;
	removeMember(data?: MemberParams): Promise<boolean>;

	tag(data?: TagParams): Promise<Tag>;
	removeTag(data?: TagParams): Promise<boolean>;

	task(data?: TaskParams): Promise<Task>;
	removeTask(data?: TaskParams): Promise<boolean>;

	invitation(data?: InvitationParams): Promise<Invitation>;
	invitationLink(data?: InvitationParams): Promise<string>;
	removeInvitation(data?: InvitationParams): Promise<boolean>;

	activity(data?: ActivityParams): Promise<Activity>;
	removeActivity(data?: ActivityParams): Promise<boolean>;
}

const buildUrl = (endpoint: string): string => {
	return `${process.env.API_HOST}/testing${endpoint}`;
};

const createRequest = <Func extends (ctx: BrowserContext, data: any) => any>(
	ctx: BrowserContext,
	func: Func
) => {
	return (
		data: Parameters<Func>[1] extends undefined ? never : Parameters<Func>[1]
	): ReturnType<Func> => {
		return func(ctx, data);
	};
};

const request = async <T>(
	ctx: BrowserContext,
	endpoint: string,
	init: Parameters<BrowserContext['request']['fetch']>[1] = {}
): Promise<T> => {
	const headers = { ...init.headers };

	const response = await ctx.request.fetch(buildUrl(endpoint), {
		...init,
		headers,
	});

	return response.json().then((data) => data.data);
};

const user = async (
	ctx: BrowserContext,
	data: UserParams = {}
): Promise<User> => {
	return request(ctx, '/user', {
		method: 'POST',
		data,
	});
};

const removeUser = async (
	ctx: BrowserContext,
	data: UserParams = {}
): Promise<boolean> => {
	return request(ctx, '/user', {
		method: 'PUT',
		data,
	});
};

const auth = async (
	ctx: BrowserContext,
	data: UserParams = {}
): Promise<Login> => {
	return request(ctx, '/auth', {
		method: 'POST',
		data,
	});
};

const activateAccountLink = async (
	ctx: BrowserContext,
	data: UserParams = {}
): Promise<string> => {
	return request(ctx, '/activate-link', {
		method: 'POST',
		data,
	});
};

const logout = async (ctx: BrowserContext): Promise<boolean> => {
	return request(ctx, '/logout', {
		method: 'PUT',
	});
};

const room = async (
	ctx: BrowserContext,
	data: RoomParams = {}
): Promise<Room> => {
	return request(ctx, '/room', {
		method: 'POST',
		data,
	});
};

const removeRoom = async (
	ctx: BrowserContext,
	data: RoomParams = {}
): Promise<boolean> => {
	return request(ctx, '/room', {
		method: 'PUT',
		data,
	});
};

const member = async (
	ctx: BrowserContext,
	data: MemberParams = {}
): Promise<Member> => {
	return request(ctx, '/member', {
		method: 'POST',
		data,
	});
};

const removeMember = async (
	ctx: BrowserContext,
	data: MemberParams = {}
): Promise<boolean> => {
	return request(ctx, '/member', {
		method: 'PUT',
		data,
	});
};

const tag = async (ctx: BrowserContext, data: TagParams = {}): Promise<Tag> => {
	return request(ctx, '/tag', {
		method: 'POST',
		data,
	});
};

const removeTag = async (
	ctx: BrowserContext,
	data: TagParams = {}
): Promise<boolean> => {
	return request(ctx, '/tag', {
		method: 'PUT',
		data,
	});
};

const task = async (
	ctx: BrowserContext,
	data: TaskParams = {}
): Promise<Task> => {
	return request(ctx, '/task', {
		method: 'POST',
		data,
	});
};

const removeTask = async (
	ctx: BrowserContext,
	data: TaskParams = {}
): Promise<boolean> => {
	return request(ctx, '/task', {
		method: 'PUT',
		data,
	});
};

const invitation = async (
	ctx: BrowserContext,
	data: InvitationParams = {}
): Promise<Invitation> => {
	return request(ctx, '/invitation', {
		method: 'POST',
		data,
	});
};

const removeInvitation = async (
	ctx: BrowserContext,
	data: InvitationParams = {}
): Promise<boolean> => {
	return request(ctx, '/invitation', {
		method: 'PUT',
		data,
	});
};

const invitationLink = async (
	ctx: BrowserContext,
	data: InvitationParams = {}
): Promise<string> => {
	return request(ctx, '/invitation-link', {
		method: 'POST',
		data,
	});
};

const activity = async (
	ctx: BrowserContext,
	data: ActivityParams = {}
): Promise<Activity> => {
	return request(ctx, '/activity', {
		method: 'POST',
		data,
	});
};

const removeActivity = async (
	ctx: BrowserContext,
	data: ActivityParams = {}
): Promise<boolean> => {
	return request(ctx, '/activity', {
		method: 'PUT',
		data,
	});
};

export const test = base.extend<TestingApiFixture>({
	user: async ({ context }, use) => {
		await use(createRequest(context, user));
	},
	removeUser: async ({ context }, use) => {
		await use(createRequest(context, removeUser));
	},
	auth: async ({ context }, use) => {
		await use(createRequest(context, auth));
	},
	activateAccountLink: async ({ context }, use) => {
		await use(createRequest(context, activateAccountLink));
	},
	logout: async ({ context }, use) => {
		await use(createRequest(context, logout));
	},
	room: async ({ context }, use) => {
		await use(createRequest(context, room));
	},
	removeRoom: async ({ context }, use) => {
		await use(createRequest(context, removeRoom));
	},
	member: async ({ context }, use) => {
		await use(createRequest(context, member));
	},
	removeMember: async ({ context }, use) => {
		await use(createRequest(context, removeMember));
	},
	tag: async ({ context }, use) => {
		await use(createRequest(context, tag));
	},
	removeTag: async ({ context }, use) => {
		await use(createRequest(context, removeTag));
	},
	task: async ({ context }, use) => {
		await use(createRequest(context, task));
	},
	removeTask: async ({ context }, use) => {
		await use(createRequest(context, removeTask));
	},
	invitation: async ({ context }, use) => {
		await use(createRequest(context, invitation));
	},
	removeInvitation: async ({ context }, use) => {
		await use(createRequest(context, removeInvitation));
	},
	invitationLink: async ({ context }, use) => {
		await use(createRequest(context, invitationLink));
	},
	activity: async ({ context }, use) => {
		await use(createRequest(context, activity));
	},
	removeActivity: async ({ context }, use) => {
		await use(createRequest(context, removeActivity));
	},
});

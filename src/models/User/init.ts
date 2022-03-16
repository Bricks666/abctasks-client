import { forward, guard, sample } from "effector";
import {
	$User,
	initialUser,
	loadUser,
	loadUserFx,
	updateUser,
	updateUserFx,
} from ".";
import { logoutFx } from "../Auth";
import { mayStartFxHandler } from "../handlers";

forward({
	from: [loadUserFx.doneData, updateUserFx.doneData],
	to: $User,
});

sample({
	clock: logoutFx.done,
	fn: () => initialUser,
	target: $User,
});

guard({
	clock: loadUser,
	filter: sample({
		source: loadUserFx.pending,
		fn: mayStartFxHandler,
	}),
	target: loadUserFx,
});

guard({
	clock: updateUser,
	filter: sample({
		source: updateUserFx.pending,
		fn: mayStartFxHandler,
	}),
	target: updateUserFx,
});

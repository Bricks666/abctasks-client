import { guard, sample } from "effector";
import { $Rooms, loadRooms, loadRoomsFx } from ".";
import { mayStartFxHandler } from "../handlers";

guard({
	clock: loadRooms,
	filter: mayStartFxHandler(loadRoomsFx.pending),
	target: loadRoomsFx,
});

sample({
	clock: loadRoomsFx.doneData,
	fn: () => [],
	target: $Rooms,
});

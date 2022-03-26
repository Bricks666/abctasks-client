import { getRoomsApi } from "@/api";
import { guard, sample } from "effector";
import { $Rooms, loadRooms, loadRoomsFx } from ".";
import { mayStartFxHandler } from "../handlers";
import { toValidRoom } from "./utils";

loadRoomsFx.use(getRoomsApi);

guard({
	clock: loadRooms,
	filter: mayStartFxHandler(loadRoomsFx.pending),
	target: loadRoomsFx,
});

sample({
	clock: loadRoomsFx.doneData,
	fn: ({ rooms }) => rooms.map(toValidRoom),
	target: $Rooms,
});

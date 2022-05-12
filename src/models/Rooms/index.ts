import { createDomain } from "effector-logger";
import { ID } from "@/interfaces/common";
import {
	DeleteRoomResponse,
	RoomResponse,
	RoomsResponse,
} from "@/interfaces/response";
import { Room } from "./types";
import { CreateRoomRequest, EditRoomRequest } from "@/interfaces/requests";

export const RoomsDomain = createDomain("RoomsDomain");

export const $Rooms = RoomsDomain.store<Room[]>([], { name: "RoomsStore" });

export const loadRoomsFx = RoomsDomain.effect<void, RoomsResponse>(
	"loadRoomsFx"
);
export const deleteRoomFx = RoomsDomain.effect<ID, DeleteRoomResponse>(
	"deleteRoomFx"
);
export const createRoomFx = RoomsDomain.effect<CreateRoomRequest, RoomResponse>(
	"createRoomFx"
);
export const editRoomFx = RoomsDomain.effect<EditRoomRequest, RoomResponse>(
	"editRoomFx"
);

export const loadRooms = RoomsDomain.event<void>("loadRoomsEvent");
export const deleteRoom = RoomsDomain.event<ID>("deleteRoomEvent");
export const createRoom =
	RoomsDomain.event<CreateRoomRequest>("createRoomEvent");
export const editRoom = RoomsDomain.event<EditRoomRequest>("editRoomEvent");
export const resetRooms = RoomsDomain.event("resetRooms");

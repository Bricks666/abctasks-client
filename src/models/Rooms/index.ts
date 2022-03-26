import { RoomsResponse } from "@/interfaces/response";
import { createDomain } from "effector-logger";
import { Room } from "./types";

export const RoomsDomain = createDomain("RoomsDomain");

export const $Rooms = RoomsDomain.store<Room[]>([], { name: "RoomsStore" });

export const loadRoomsFx = RoomsDomain.effect<void, RoomsResponse>(
	"loadRoomsFx"
);

export const loadRooms = RoomsDomain.event<void>("loadRoomsEvent");

import { createDomain } from "effector-logger";
import { Room } from "./types";

export const RoomsDomain = createDomain("RoomsDomain");

export const $Rooms = RoomsDomain.store<Room[]>([], { name: "RoomsStore" });

export const loadRoomsFx = RoomsDomain.effect("loadRoomsFx");

export const loadRooms = RoomsDomain.event("loadRoomsEvent");

import { ID } from "@/interfaces/common";

export interface Room {
	readonly id: ID;
	readonly ownerId: ID;
	readonly name: string;
}

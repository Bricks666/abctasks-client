import React, { FC } from "react";
import { ClassNameProps } from "@/interfaces/common";
import { Room } from "@/models/Rooms/types";
import { Card } from "@/ui/Card";
import { CardHeader } from "@/ui/CardHeader";
import { Link } from "@/ui/Link";

import RoomCardStyle from "./RoomCard.module.css";

interface RoomCardProps extends ClassNameProps, Room {}

export const RoomCard: FC<RoomCardProps> = ({ id, name, className }) => {
	return (
		<Card className={className}>
			<Link className={RoomCardStyle.link} type="react" to={`rooms/${id}`}>
				<CardHeader>{name}</CardHeader>
			</Link>
		</Card>
	);
};

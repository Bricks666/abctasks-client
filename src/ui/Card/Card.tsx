import React, { FC, memo } from "react";
import { Block } from "../Block";
import {
	Card as MUICard,
	SxProps,
	CardProps as MUICardProps,
} from "@mui/material";
import { ExtractProps } from "@/interfaces/common";

export const Card: FC<MUICardProps<typeof Block, ExtractProps<typeof Block>>> =
	memo(function Card(props) {
		return (
			<MUICard sx={card} component={Block} elevation={0} {...props}></MUICard>
		);
	});

const card: SxProps = {
	padding: "1rem",
};

import React, { FC } from "react";
import { ClassNameProps } from "@/interfaces/common";
import { ProfileLink } from "./ProfileLink";
import { AppBar, Toolbar } from "@mui/material";

import HeaderStyle from "./Header.module.css";

export const Header: FC<ClassNameProps> = ({ className }) => {
	return (
		<AppBar
			className={className}
			component="header"
			color="default"
			position="static"
			variant="outlined"
		>
			<Toolbar>
				<ProfileLink className={HeaderStyle.avatar} />
			</Toolbar>
		</AppBar>
	);
};

import React, { FC } from "react";
import classNames from "classnames";
import { ClassNameProps } from "@/interfaces/common";
import { Box } from "@mui/material";

import ContentLayoutStyle from "./ContentLayout.module.css";

export const ContentLayout: FC<ClassNameProps> = ({ children, className }) => {
	return (
		<Box className={classNames(ContentLayoutStyle.contentLayout, className)}>
			{children}
		</Box>
	);
};

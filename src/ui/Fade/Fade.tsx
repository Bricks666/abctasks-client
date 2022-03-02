import { ExtractProps } from "@/interfaces/common";
import React, { FC } from "react";
import { Transition } from "../Transition";

import FadeStyle from "./Fade.module.css";

export const Fade: FC<ExtractProps<typeof Transition, "classes">> = (props) => {
	const classes = {
		entering: FadeStyle.open,
		entered: FadeStyle.opened,
		exiting: FadeStyle.close,
		exited: FadeStyle.closed,
	};
	return (
		<Transition className={FadeStyle.container} {...props} classes={classes} />
	);
};

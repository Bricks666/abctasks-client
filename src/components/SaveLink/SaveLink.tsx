import React, { FC } from "react";
import { useLocation, Link as ReactLink } from "react-router-dom";
import { useLocationState } from "@/hooks";
import { ClassNameProps } from "@/interfaces/common";
import { Link } from "@mui/material";

interface SaveLinkComponent extends ClassNameProps {
	to: string;
}

export const SaveLink: FC<SaveLinkComponent> = ({
	className,
	to,
	children,
}) => {
	const location = useLocation();
	const state = useLocationState();

	return (
		<Link
			className={className}
			component={ReactLink}
			to={to}
			state={state || location}
			underline="hover"
		>
			{children}
		</Link>
	);
};

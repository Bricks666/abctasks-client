import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLocationState } from "../../hooks";
import { ClassNameComponent } from "../../interfaces/common";

interface SaveLinkComponent extends ClassNameComponent {
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
		<Link className={className} to={to} state={state || location}>
			{children}
		</Link>
	);
};

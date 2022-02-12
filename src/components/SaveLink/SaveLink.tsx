import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import { useLocationState } from "../../hooks";
import { ClassNameProps } from "../../interfaces/common";
import { Link } from "../../ui/Link";

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
		<Link className={className} type="react" to={to} state={state || location}>
			{children}
		</Link>
	);
};

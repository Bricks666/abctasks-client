import React, { ComponentType, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { usePopups } from "../../hooks";
import { TaskPopup } from "../TaskPopup";

const popupsMap: Record<string, ComponentType<{ readonly isOpen: boolean }>> = {
	task: TaskPopup,
};

export const Popups = () => {
	const { mountedPopups, popups } = usePopups();

	useEffect(() => {
		if (mountedPopups.length) {
			document.body.style.overflow = "hidden";

			return () => {
				document.body.style.overflow = "";
			};
		}
	}, [mountedPopups.length]);

	return (
		<>
			<Outlet />
			{mountedPopups.map((mountedPopup) => {
				const Component = popupsMap[mountedPopup];

				if (!Component) {
					return null;
				}

				return (
					<Component
						isOpen={popups.includes(mountedPopup)}
						key={mountedPopup}
					/>
				);
			})}
		</>
	);
};

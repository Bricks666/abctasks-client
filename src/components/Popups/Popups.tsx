import React, { ComponentType, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { POPUPS } from "../../const";
import { usePopups } from "../../hooks";
import { CreateTaskPopup } from "../CreateTaskPopup";
import { EditTaskPopup } from "../EditTaskPopup";

const popupsMap: Record<string, ComponentType<{ readonly isOpen: boolean }>> = {
	[POPUPS.createTask]: CreateTaskPopup,
	[POPUPS.editTask]: EditTaskPopup,
};

export const Popups = () => {
	const { mountedPopups, popups } = usePopups();

	useEffect(() => {
		if (mountedPopups.length) {
			document.body.style.overflow = "hidden";
			document.body.style.marginRight = "4px";

			return () => {
				document.body.style.overflow = "";
				document.body.style.marginRight = "";
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

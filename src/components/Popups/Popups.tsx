import React, { ComponentType, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { POPUPS } from "@/const";
import { usePopups } from "@/hooks";
import { CreateTaskPopup } from "../CreateTaskPopup";
import { EditTaskPopup } from "../EditTaskPopup";
import { GroupsPopup } from "../GroupsPopup";
import { EditGroupPopup } from "../EditGroupPopup";
import { CreateGroupPopup } from "../CreateGroupPopup";

const popupsMap: Record<string, ComponentType<{ readonly isOpen: boolean }>> = {
	[POPUPS.createTask]: CreateTaskPopup,
	[POPUPS.editTask]: EditTaskPopup,
	[POPUPS.groups]: GroupsPopup,
	[POPUPS.createGroup]: CreateGroupPopup,
	[POPUPS.editGroup]: EditGroupPopup,
};

export const Popups = () => {
	const { mountedPopups, popups } = usePopups();

	useEffect(() => {
		if (mountedPopups.length) {
			document.body.classList.add("popup_open");
			return () => {
				document.body.classList.remove("popup_open");
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

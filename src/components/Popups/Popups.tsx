import React, { ComponentType, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { POPUPS } from "@/const";
import { usePopups } from "@/hooks";
import { CreateTaskPopup } from "../CreateTaskPopup";
import { EditTaskPopup } from "../EditTaskPopup";
import { GroupsPopup } from "../GroupsPopup";
import { EditGroupPopup } from "../EditGroupPopup";
import { CreateGroupPopup } from "../CreateGroupPopup";
import { BasePopup } from "@/interfaces/common";

const popupsMap: Record<string, ComponentType<BasePopup>> = {
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
			{mountedPopups.map((mountedPopup, index) => {
				const Component = popupsMap[mountedPopup];

				if (!Component) {
					return null;
				}
				const isUp = mountedPopups.length - 1 === index;

				return (
					<Component
						isOpen={popups.includes(mountedPopup)}
						isFocus={isUp}
						key={mountedPopup}
					/>
				);
			})}
		</>
	);
};

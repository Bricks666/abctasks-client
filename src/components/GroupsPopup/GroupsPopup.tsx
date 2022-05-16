import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useGoBack, usePrepareLink, useTaskGroups } from "@/hooks";
import { BasePopup, ClassNameProps, ID } from "@/interfaces/common";
import { Group } from "@/ui/Group";
import { deleteGroup } from "@/models/Groups";
import { GET_PARAMS, POPUPS } from "@/const";
import { MainPopup } from "@/components/MainPopup";
import { UsePrepareLinkResponse } from "@/hooks/usePrepareLink";
import {
	Button,
	IconButton,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Stack,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";

import GroupsPopupStyle from "./GroupsPopup.module.css";

interface GroupsPopup extends ClassNameProps, BasePopup {}

const createEditLink = (params: UsePrepareLinkResponse, groupId: ID) => {
	return {
		...params,
		search: params.search + `&${GET_PARAMS.groupId}=${groupId}`,
	};
};

export const GroupsPopup: FC<GroupsPopup> = (props) => {
	const onClose = useGoBack();
	const groups = useTaskGroups();
	const { t } = useTranslation("popups");
	const addGroupLink = usePrepareLink({
		addQuery: {
			[GET_PARAMS.popup]: POPUPS.createGroup,
		},
		saveQuery: true,
	});
	const editGroupLink = usePrepareLink({
		addQuery: {
			[GET_PARAMS.popup]: POPUPS.editGroup,
		},
		saveQuery: true,
	});

	return (
		<MainPopup
			{...props}
			onClose={onClose}
			header={t("groups.title")}
			alt={t("groups.title")}
		>
			<Stack spacing={1}>
				<Button to={addGroupLink} component={Link}>
					{t("groups.add_group")}
				</Button>
				<List className={GroupsPopupStyle.list}>
					{groups.map((group) => (
						<ListItem key={group.id}>
							<ListItemText>
								<Group {...group} />
							</ListItemText>
							<ListItemSecondaryAction>
								<IconButton
									to={createEditLink(editGroupLink, group.id)}
									component={Link}
								>
									<Edit />
								</IconButton>
								<IconButton
									onClick={() =>
										deleteGroup({ id: group.id, roomId: group.roomId })
									}
								>
									<Delete />
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					))}
				</List>
			</Stack>
		</MainPopup>
	);
};

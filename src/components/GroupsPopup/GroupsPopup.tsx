import React, { FC } from "react";
import { useGoBack, usePrepareLink, useTaskGroups } from "@/hooks";
import { BasePopup, ClassNameProps } from "@/interfaces/common";
import { Group } from "@/ui/Group";
import { List } from "@/ui/List";
import { ListItem } from "@/ui/ListItem";
import { ListItemSecondaryAction } from "@/ui/ListItemSecondaryAction";
import { Button } from "@/ui/Button";
import { deleteGroup } from "@/models/Groups";
import { IconButton } from "@/ui/IconButton";
import { DeleteIcon } from "@/ui/DeleteIcon";
import { GET_PARAMS, POPUPS } from "@/const";
import { MainPopup } from "@/ui/MainPopup";
import { EditIcon } from "@/ui/EditIcon";
import { Stack } from "@/ui/Stack";
import { UsePrepareLinkResponse } from "@/hooks/usePrepareLink";

import GroupsPopupStyle from "./GroupsPopup.module.css";

interface GroupsPopup extends ClassNameProps, BasePopup {}

const createEditLink = (params: UsePrepareLinkResponse, groupId: number) => {
	return {
		...params,
		search: params.search + `&${GET_PARAMS.groupId}=${groupId}`,
	};
};

export const GroupsPopup: FC<GroupsPopup> = (props) => {
	const onClose = useGoBack();
	const groups = useTaskGroups();
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
			className={GroupsPopupStyle.content}
			onClose={onClose}
			header="Task groups"
			alt="Groups"
		>
			<Stack>
				<Button
					className={GroupsPopupStyle.add_button}
					to={addGroupLink}
					type="text"
				>
					Add group
				</Button>
				<List className={GroupsPopupStyle.list}>
					{groups.map((group) => (
						<ListItem key={group.id}>
							<Group {...group} />
							<ListItemSecondaryAction>
								<IconButton to={createEditLink(editGroupLink, group.id)}>
									<EditIcon />
								</IconButton>
								<IconButton onClick={() => deleteGroup(group.id)}>
									<DeleteIcon />
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					))}
				</List>
			</Stack>
		</MainPopup>
	);
};

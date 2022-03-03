import React, { FC } from "react";
import { useGoBack, usePrepareLink, useTaskGroups } from "@/hooks";
import { ClassNameProps } from "@/interfaces/common";
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

import GroupsPopupStyle from "./GroupsPopup.module.css";

interface GroupsPopup extends ClassNameProps {
	readonly isOpen: boolean;
}

export const GroupsPopup: FC<GroupsPopup> = ({ isOpen }) => {
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
			className={GroupsPopupStyle.content}
			isOpen={isOpen}
			onClose={onClose}
			header="Task groups"
		>
			<Stack>
				<Button
					className={GroupsPopupStyle.add_button}
					to={addGroupLink}
					type="text"
				>
					Add group
				</Button>
				<List>
					{groups.map((group) => {
						const editLink = {
							...editGroupLink,
							search:
								editGroupLink.search + `&${GET_PARAMS.groupId}=${group.id}`,
						};
						return (
							<ListItem key={group.id}>
								<Group {...group} />
								<ListItemSecondaryAction>
									<IconButton to={editLink}>
										<EditIcon />
									</IconButton>
									<IconButton onClick={() => deleteGroup(group.id)}>
										<DeleteIcon />
									</IconButton>
								</ListItemSecondaryAction>
							</ListItem>
						);
					})}
				</List>
			</Stack>
		</MainPopup>
	);
};

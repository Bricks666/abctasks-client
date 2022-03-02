import { useGoBack, useTaskGroups } from "@/hooks";
import { ClassNameProps } from "@/interfaces/common";
import { FullScreenPopup } from "@/ui/FullScreenPopup";
import { Group } from "@/ui/Group";
import { List } from "@/ui/List";
import { ListItem } from "@/ui/ListItem";
import React, { FC } from "react";

interface GroupsPopup extends ClassNameProps {
	readonly isOpen: boolean;
}

export const GroupsPopup: FC<GroupsPopup> = ({ isOpen }) => {
	const onClose = useGoBack();
	const groups = useTaskGroups();
	return (
		<FullScreenPopup isOpen={isOpen} onClose={onClose} header="Task groups">
			<List>
				{groups.map((group) => (
					<ListItem key={group.id}>
						<Group {...group} />
					</ListItem>
				))}
			</List>
		</FullScreenPopup>
	);
};

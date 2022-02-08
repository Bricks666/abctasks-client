import { useMemo } from "react";
import { StylesConfig } from "react-select";
import { TaskGroup } from "../../models/Tasks";
import { SelectValues } from "../../ui/Select";

const getGroup = (groups: TaskGroup[], groupId: number | string) =>
	groups.find((group) => group.id === +groupId);

const getColor = (
	group: TaskGroup,
	colorPlace: "background" | "text",
	isSelected: boolean
) => {
	const isInvert = colorPlace === "text" ? !isSelected : isSelected;
	return isInvert ? group.mainColor : group.secondColor;
};

export const useGroupsSelectStyles = (groups: TaskGroup[]) => {
	return useMemo<StylesConfig<SelectValues>>(() => {
		return {
			option: (base, { data, isSelected }) => {
				const group = getGroup(groups, data.value);
				if (group) {
					const backgroundColor = getColor(group, "background", isSelected);
					const color = getColor(group, "text", isSelected);
					return {
						...base,
						color,
						backgroundColor,
						":hover": {
							backgroundColor,
						},
					};
				}

				return base;
			},
			singleValue: (base, { data }) => {
				const group = getGroup(groups, data.value);

				if (group) {
					return {
						...base,
						display: "inline-block",
						width: "min-content",
						backgroundColor: group.secondColor,
						padding: "2px 13px",
						borderRadius: "100px",
						fontSize: "12px",
						color: group.mainColor,
					};
				}

				return base;
			},
		};
	}, [groups]);
};

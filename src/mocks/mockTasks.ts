import { TaskAuthor, TaskStructure } from "../models/Tasks";
import { mockIllustrationGroup, mockUIGroup } from "./mockGroups";

const mockAuthor: TaskAuthor = {
	name: "John",
	photo: "https://effector.dev/ru/img/comet.png",
};

export const mockTasks: TaskStructure[] = [
	{
		id: 1,
		author: mockAuthor,
		status: "Ready",
		group: mockUIGroup,
		content: "AderAderAder",
		addedDate: "2022-01-19",
		commentCount: 3,
	},
	{
		id: 2,
		author: mockAuthor,
		status: "Review",
		group: mockUIGroup,
		content: "AderAderAder",
		addedDate: "2022-01-14",
		commentCount: 3,
	},
	{
		id: 4,
		author: mockAuthor,
		status: "Done",
		group: mockUIGroup,
		content: "AderAderAder",
		addedDate: "2022-01-10",
		commentCount: 3,
	},
	{
		id: 6,
		author: mockAuthor,
		status: "In Progress",
		group: mockUIGroup,
		content: "AderAderAder",
		addedDate: "2022-01-09",
		commentCount: 3,
	},
	{
		id: 11,
		author: mockAuthor,
		status: "Ready",
		group: mockIllustrationGroup,
		content: "AderAderAder",
		addedDate: "2022-01-19",
		commentCount: 3,
	},
	{
		id: 21,
		author: mockAuthor,
		status: "Review",
		group: mockIllustrationGroup,
		content:
			"Effects in effector allows users to change their implementation (handler) via use calls, which would be used to mocking them in tests.",
		addedDate: "2022-01-14",
		commentCount: 3,
	},
	{
		id: 41,
		author: mockAuthor,
		status: "Done",
		group: mockIllustrationGroup,
		content: "AderAderAder",
		addedDate: "2022-01-10",
		commentCount: 3,
	},
	{
		id: 61,
		author: mockAuthor,
		status: "In Progress",
		group: mockIllustrationGroup,
		content: "AderAderAder",
		addedDate: "2022-01-09",
		commentCount: 3,
	},
];

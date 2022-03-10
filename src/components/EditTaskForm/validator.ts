import Joi from "joi";
import { EditTaskFormValues } from "./EditTaskForm";

export const validatingScheme = Joi.object<EditTaskFormValues>({
	content: Joi.string().max(128).required().messages({
		"string.empty": "Content can't be empty",
		"string.max": "Content must be less than 128",
	}),
	groupId: Joi.number().required().messages({
		"number.empty": "Group must be choose",
	}),
	status: Joi.string().required().messages({
		"string.empty": "Status must be choose",
	}),
});

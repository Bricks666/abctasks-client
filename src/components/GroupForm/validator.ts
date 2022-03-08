import { allowedSymbolsRegExp } from "@/const";
import { CreateEditGroupRequest } from "@/interfaces/requests";
import Joi from "joi";

const colorPattern = /#[0-9a-fA-F]{6}/;

export const validatingScheme = Joi.object<CreateEditGroupRequest>({
	id: Joi.number().min(0),
	mainColor: Joi.string().pattern(colorPattern).required().messages({
		"string.empty": "Color can't be empty",
		"string.pattern.base": "Color must be #XXXXXX, for example #ff00aa",
	}),
	secondColor: Joi.string().pattern(colorPattern).required().messages({
		"string.empty": "Color can't be empty",
		"string.pattern.base": "Color must be #XXXXXX, for example #ff00aa",
	}),
	name: Joi.string().pattern(allowedSymbolsRegExp).required().messages({
		"string.empty": "Name can't be empty",
		"string.pattern.base":
			"Name can only contain latins alphas, numeric and !, *, (, ), _, +",
	}),
});

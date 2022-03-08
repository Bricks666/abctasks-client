import {
	allowedSymbolsRegExp,
	MAX_LOGIN_PASSWORD_LENGTH,
	MIN_LOGIN_PASSWORD_LENGTH,
} from "@/const";
import { RegistrationRequest } from "@/interfaces/requests";
import Joi from "joi";

export const validationSchema = Joi.object<RegistrationRequest>({
	login: Joi.string()
		.pattern(allowedSymbolsRegExp)
		.min(MIN_LOGIN_PASSWORD_LENGTH)
		.max(MAX_LOGIN_PASSWORD_LENGTH)
		.required()
		.messages({
			"string.empty": "Login must be provided",
			"string.pattern.base":
				"Login can only contain latins alphas, numeric and !, *, (, ), _, +",
			"string.min": `Login must contain minimum ${MIN_LOGIN_PASSWORD_LENGTH} symbols`,
			"string.max": `Login must contain maximum ${MAX_LOGIN_PASSWORD_LENGTH} symbols`,
		}),
	password: Joi.string()
		.pattern(allowedSymbolsRegExp)
		.min(MIN_LOGIN_PASSWORD_LENGTH)
		.max(MAX_LOGIN_PASSWORD_LENGTH)
		.required()
		.messages({
			"string.empty": "Password must be provided",
			"string.pattern.base":
				"Password can only contain latins alphas, numeric and !, *, (, ), _, +",
			"string.min": `Password must contain minimum ${MIN_LOGIN_PASSWORD_LENGTH} symbols`,
			"string.max": `Password must contain maximum ${MAX_LOGIN_PASSWORD_LENGTH} symbols`,
		}),
	repeatPassword: Joi.string().valid(Joi.ref("password")).messages({
		"any.only": "Password must be equal",
	}),
});

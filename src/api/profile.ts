import { instance } from "./instance";
import { UpdateProfileRequest } from "@/interfaces/requests";
import { UserResponse } from "@/interfaces/response";

export const getProfileApi = async () => {
	const response = await instance.get<UserResponse>("/profile");

	return response.data;
};

export const updateProfileApi = async ({
	photo,
	...values
}: UpdateProfileRequest) => {
	const photoData = new FormData();
	const validPhoto =
		typeof photo === "string" ? photo : photo && photo[0] ? photo[0] : "";
	photoData.set("photo", validPhoto);
	photoData.set("login", values.login);

	const response = await instance.post<UserResponse>(
		"profile/update",
		photoData,
		{
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}
	);

	return response.data;
};

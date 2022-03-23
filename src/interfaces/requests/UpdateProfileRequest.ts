export interface UpdateProfileRequest {
	readonly login: string;
	readonly photo: FileList | string | null;
}

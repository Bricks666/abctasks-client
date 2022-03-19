export const useImageURL = (image: string | FileList | null): string | null => {
	return image
		? typeof image === "string"
			? image
			: image[0] && URL.createObjectURL(image[0])
		: null;
};

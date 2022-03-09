import { GET_PARAMS } from "@/const";
import { useGetParam } from "./useGetParam";

export const useAnyPopupOpen = () => {
	const params = useGetParam(GET_PARAMS.popup);

	return !!params;
};

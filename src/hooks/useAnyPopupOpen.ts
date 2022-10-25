import { routes } from '@/const';
import { useGetParam } from './useGetParam';

export const useAnyPopupOpen = () => {
	const params = useGetParam(routes.GET_PARAMS.popup);

	return !!params;
};

import { useSearchParams } from 'react-router-dom';

export const useGetParam = <T extends string | number = string>(
	param: string
): T | null => {
	const [getParams] = useSearchParams();

	return getParams.get(param) as T | null;
};

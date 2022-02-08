import { useEffect, useMemo, useState } from "react";
import { useGetParam } from ".";
import { GET_PARAMS } from "../const";

const parsePopups = (popups: string | null) => {
	return popups ? popups.split(",") : [];
};

let timeoutId: null | NodeJS.Timeout = null;

export const usePopups = () => {

	const rawPopups = useGetParam(GET_PARAMS.popup);
	const [mountedPopups, setMountedPopups] = useState<string[]>(
		parsePopups(rawPopups)
	);

	useEffect(() => {
		if (rawPopups) {
			timeoutId && clearTimeout(timeoutId);
			setMountedPopups(parsePopups(rawPopups));
		} else {
			timeoutId = setTimeout(() => setMountedPopups([]), 300);
		}
	}, [rawPopups]);

	const popups = useMemo(() => parsePopups(rawPopups), [rawPopups]);

	return { mountedPopups, popups };
};

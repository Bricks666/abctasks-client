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
		timeoutId && clearTimeout(timeoutId);
		timeoutId = setTimeout(() => setMountedPopups(parsePopups(rawPopups)), 210);
	}, [rawPopups]);

	const popups = useMemo(() => parsePopups(rawPopups), [rawPopups]);

	return { mountedPopups, popups };
};

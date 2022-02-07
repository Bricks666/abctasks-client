import React, { FC, useCallback } from "react";
import { Overlay } from "../Overlay";

export const MainPopup: FC = () => {
	const onClose = useCallback((evt) => console.log(evt), []);
	return (
		<Overlay isOpen={true} close={onClose}>
			asdasdasdasdasddass
		</Overlay>
	);
};

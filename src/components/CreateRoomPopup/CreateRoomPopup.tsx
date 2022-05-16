import React, { FC } from "react";
import { BasePopup } from "@/interfaces/common";
import { MainPopup } from "@/components/MainPopup";
import { useGoBack } from "@/hooks";
import { RoomForm } from "../RoomForm";
import { createRoom } from "@/models/Rooms";

import CreateRoomPopupStyle from "./CreateRoomPopup.module.css";

export const CreateRoomPopup: FC<BasePopup> = (props) => {
	const onClose = useGoBack();
	return (
		<MainPopup {...props} onClose={onClose}>
			<RoomForm
				className={CreateRoomPopupStyle.form}
				submitHandler={createRoom}
				afterSubmit={onClose}
				buttonText="Add"
			/>
		</MainPopup>
	);
};

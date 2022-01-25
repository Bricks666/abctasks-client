import classNames from "classnames";
import React, { FC, MouseEventHandler, useCallback } from "react";
import { ClassNameComponent } from "../../interfaces/common";
import { logoutFx } from "../../models/User";
import { Button } from "../../ui/Button";

export const Header: FC<ClassNameComponent> = ({ className }) => {
	const onClick = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
		logoutFx();
	}, []);
	return (
		<header className={classNames(className)}>
			<Button onClick={onClick}>Logout</Button>
		</header>
	);
};

import React, { FC } from "react";
import { BlocLayout } from "../BlocLayout";
import { OnlyClassName } from "../../interfaces/common";

export const Aside: FC<OnlyClassName> = ({ children, className }) => {
	return (
		<aside className={className}>
			<BlocLayout>{children}</BlocLayout>
		</aside>
	);
};

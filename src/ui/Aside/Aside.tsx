import React, { FC } from "react";
import { BlocLayout } from "../BlocLayout";
import { ClassNameComponent } from "../../interfaces/common";

export const Aside: FC<ClassNameComponent> = ({ children, className }) => {
	return (
		<aside className={className}>
			<BlocLayout>{children}</BlocLayout>
		</aside>
	);
};

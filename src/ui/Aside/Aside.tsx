import React, { FC, memo } from "react";
import { BlocLayout } from "../BlocLayout";
import { ClassNameProps } from "../../interfaces/common";

export const Aside: FC<ClassNameProps> = memo(({ children, className }) => {
	return (
		<aside className={className}>
			<BlocLayout>{children}</BlocLayout>
		</aside>
	);
});

import React, { FC } from "react";
import classNames from "classnames";
import { ClassNameProps } from "@/interfaces/common";
import { Block } from "@/ui/Block";
import { ContentLayout } from "@/ui/ContentLayout";
import { ProfileLink } from "./ProfileLink";

import HeaderStyle from "./Header.module.css";

export const Header: FC<ClassNameProps> = ({ className }) => {
	return (
		<header className={classNames(HeaderStyle.header, className)}>
			<ContentLayout>
				<Block className={HeaderStyle.layout}>
					<ProfileLink className={HeaderStyle.avatar} />
				</Block>
			</ContentLayout>
		</header>
	);
};

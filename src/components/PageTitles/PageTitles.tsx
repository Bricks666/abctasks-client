import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { ClassNameProps } from "@/interfaces/common";
import { Text } from "@/ui/Text";

export const PageTitles: FC<ClassNameProps> = ({ className }) => {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<Text className={className} component="h2">
						Homepage
					</Text>
				}
			/>
			<Route path="*" element={null} />
		</Routes>
	);
};

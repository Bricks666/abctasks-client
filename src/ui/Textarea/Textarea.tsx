import classNames from "classnames";
import React, { forwardRef, PropsWithChildren } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { ClassNameProps } from "../../interfaces/common";

import TextareaStyle from "./Textarea.module.css";

interface TextareaComponent extends ClassNameProps, UseFormRegisterReturn {}

export const Textarea = forwardRef<
	HTMLTextAreaElement,
	PropsWithChildren<TextareaComponent>
>(({ className, children, ...textarea }, ref) => {
	return (
		<div className={classNames(TextareaStyle.wrapper, className)}>
			<label className={TextareaStyle.label} htmlFor={textarea.name}>
				{children}
			</label>
			<textarea
				className={TextareaStyle.textarea}
				{...textarea}
				ref={ref}
				id={textarea.name}
			/>
		</div>
	);
});

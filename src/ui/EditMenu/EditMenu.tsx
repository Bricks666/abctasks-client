import React, {
	FC,
	MouseEventHandler,
	useState,
	useMemo,
	useCallback,
} from "react";
import { Path } from "react-router-dom";
import { ClassNameComponent, ExtractProps } from "../../interfaces/common";
import { Button } from "../Button";
import { List } from "../List";
import { Popover } from "../Popover";

import EditMenuStyle from "./EditMenu.module.css";

type ButtonProps = ExtractProps<typeof Button>;

interface EditMenuContent {
	readonly label: string;
	readonly type: "button" | "link";
	readonly onClick?: MouseEventHandler<HTMLButtonElement>;
	readonly to?: string | Partial<Path>;
	readonly disabled?: boolean;
}

interface EditMenuComponent extends ClassNameComponent {
	readonly content: EditMenuContent[];
}

const convertToButtonProps = (content: EditMenuContent[]) => {
	return content?.map<ButtonProps>(
		({ type, label, onClick, to, disabled }, i) => ({
			className: i.toString(),
			buttonType: type,
			color: "monotype",
			type: "listed",
			children: label,
			disabled,
			onClick,
			to,
		})
	);
};

export const EditMenu: FC<EditMenuComponent> = ({ content, className }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [reference, setReference] = useState<HTMLElement | null>(null);

	const onClose = useCallback(() => {
		setIsOpen(false);
	}, []);
	const onOpen = useCallback(() => {
		setIsOpen(true);
	}, []);

	const menuItems = useMemo(() => convertToButtonProps(content), [content]);

	return (
		<div className={className}>
			<div ref={setReference}>
				<Button
					className={EditMenuStyle.button}
					color="monotype"
					onClick={isOpen ? onClose : onOpen}
				/>
			</div>
			<Popover reference={reference} isOpen={isOpen} onClose={onClose} placement="bottom-end">
				<List
					className={EditMenuStyle.list}
					items={menuItems}
					Component={Button}
					indexedBy="className"
				/>
			</Popover>
		</div>
	);
};

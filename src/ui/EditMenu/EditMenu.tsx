import React, {
	FC,
	MouseEventHandler,
	useState,
	useMemo,
	useCallback,
} from "react";
import { Path } from "react-router-dom";
import { ClassNameProps, ExtractProps } from "../../interfaces/common";
import { Button } from "../Button";
import { List } from "../List";
import { Popover } from "../Popover";

import EditMenuStyle from "./EditMenu.module.css";

type ButtonProps = ExtractProps<typeof Button>;

interface EditMenuContent {
	readonly label: string;
	readonly onClick?: MouseEventHandler<HTMLButtonElement>;
	readonly to?: string | Partial<Path>;
	readonly disabled?: boolean;
}

interface EditMenuComponent extends ClassNameProps {
	readonly content: EditMenuContent[];
}

const convertToButtonProps = (content: EditMenuContent[]) => {
	return content?.map<ButtonProps>(({ label, onClick, to, disabled }, i) => ({
		className: i.toString(),
		type: "text",
		children: label,
		disabled,
		onClick,
		to,
	}));
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
					onClick={isOpen ? onClose : onOpen}
				>
					<svg
						className={EditMenuStyle.svg}
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
					>
						<circle className={EditMenuStyle.circle} cx="3" cy="3" r="3" />
						<circle className={EditMenuStyle.circle} cx="10" cy="3" r="3" />
						<circle className={EditMenuStyle.circle} cx="17" cy="3" r="3" />
					</svg>
				</Button>
			</div>
			<Popover
				reference={reference}
				isOpen={isOpen}
				onClose={onClose}
				placement="bottom-end"
			>
				<List
					className={EditMenuStyle.list}
					itemClassName={EditMenuStyle.item}
					items={menuItems}
					Component={Button}
					indexedBy="className"
				/>
			</Popover>
		</div>
	);
};

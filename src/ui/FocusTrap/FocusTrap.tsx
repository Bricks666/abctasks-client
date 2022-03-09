/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { FC, useEffect, useRef } from "react";

import FocusTrapStyle from "./FocusTrap.module.css";

interface FocusTrapProps {
	readonly open: boolean;
}

const tabbableSelectors = [
	"[tabindex]",
	"a[href]",
	"button:not([disabled])",
	"input",
	"select",
	"textarea",
];

const getTabbable = (root: HTMLElement) => {
	return Array.from(
		root.querySelectorAll<HTMLElement>(tabbableSelectors.join(","))
	);
};

export const FocusTrap: FC<FocusTrapProps> = ({ open, children }) => {
	const rootRef = useRef<HTMLDivElement | null>(null);
	const startElement = useRef<HTMLDivElement | null>(null);
	const endElement = useRef<HTMLDivElement | null>(null);
	const lastFocus = useRef<HTMLElement | null>(null);
	const lastKeyboardEvent = useRef<globalThis.KeyboardEvent | null>(null);

	useEffect(() => {
		lastFocus.current = document.activeElement as HTMLElement;
		return () => {
			lastFocus.current?.focus();
		};
	}, []);

	useEffect(() => {
		if (!open || !rootRef.current) {
			return;
		}

		const focusin = (evt: globalThis.FocusEvent) => {
			const { target } = evt;
			const isStandardFocus = rootRef.current?.contains(target as Node);
			if (isStandardFocus) {
				return;
			}

			if (
				document.activeElement === startElement.current ||
				document.activeElement === endElement.current
			) {
				const tabbable = getTabbable(rootRef.current as HTMLElement);
				const firstTab = tabbable[0];
				const lastTab = tabbable[tabbable.length - 1];

				const isShiftEvent = lastKeyboardEvent.current?.shiftKey;

				if (isShiftEvent) {
					lastTab?.focus();
				} else {
					firstTab?.focus();
				}
			} else {
				startElement.current?.focus();
			}
		};

		document.addEventListener("focusin", focusin);

		return () => {
			document.removeEventListener("focusin", focusin);
		};
	}, [open]);

	useEffect(() => {
		if (!open || !rootRef.current) {
			return;
		}

		const tabHandler = (evt: globalThis.KeyboardEvent) => {
			const { key, shiftKey, target } = evt;
			if (key !== "Tab") {
				return;
			}
			lastKeyboardEvent.current = evt;
			if (target === startElement.current && shiftKey) {
				endElement.current?.focus();
			}
		};

		document.addEventListener("keyup", tabHandler);

		return () => {
			document.removeEventListener("keyup", tabHandler);
		};
	}, [open]);

	return (
		<>
			<div className="visibility-hidden" tabIndex={0} ref={startElement} />
			<div className={FocusTrapStyle.trap} ref={rootRef}>
				{children}
			</div>
			<div className="visibility-hidden" tabIndex={0} ref={endElement} />
		</>
	);
};

import { Template, String, Static } from 'runtypes';

export const hex = Template`#${String.withConstraint(
	(code) => code.length === 3 || code.length === 6
)}`;
export type HEX = Static<typeof hex>;

export type VoidFunction = () => void;

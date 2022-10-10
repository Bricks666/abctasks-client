import * as React from 'react';
import { createPortal } from 'react-dom';

export const Portal: React.FC<React.PropsWithChildren> = ({ children }) => {
	const [container] = React.useState(() => document.createElement('div'));

	React.useEffect(() => {
		document.body.appendChild(container);

		return () => {
			document.body.removeChild(container);
		};
	}, [container]);

	return createPortal(children, container);
};

import { useEffect, useState } from 'react';

export const useLoadImage = (url?: string | null) => {
	const [status, setStatus] = useState<'loaded' | 'error' | 'nothing'>(
		'nothing'
	);

	useEffect(() => {
		if (!url) {
			return undefined;
		}
		const image = new Image();
		setStatus('nothing');
		image.src = url;
		image.onload = () => {
			setStatus('loaded');
		};
		image.onerror = () => {
			setStatus('error');
		};
	}, [url]);
	return status;
};

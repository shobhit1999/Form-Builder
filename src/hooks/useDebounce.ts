import { useCallback } from 'react';

export const useDebounce = (callback: () => void, delay: number) => {
	const debouncedCallback = useCallback(() => {
		const handler = setTimeout(() => {
			callback();
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [callback, delay]);

	return debouncedCallback;
};

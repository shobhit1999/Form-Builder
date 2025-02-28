import { useEffect, useState } from 'react';

import { loadState } from 'utils/LocalStorage';

export const useStorage = <T>(key: string, initialValue: T) => {
	const [data, setData] = useState<T>(initialValue);

	useEffect(() => {
		const checkForUpdates = () => {
			const currentData = loadState<T>(key);
			if (JSON.stringify(currentData) !== JSON.stringify(data)) {
				setData(currentData || initialValue);
			}
		};

		const interval = setInterval(checkForUpdates, 1000);
		return () => clearInterval(interval);
	}, [key, initialValue, data]);

	return data;
};

import pkjson from '../../package.json';

const STORAGE_KEY_PREFIX = `${pkjson.name}_${pkjson.version}_`;

export function saveState<T>(STORAGE_KEY: string, storeState: T, ignorePrefix = false): boolean {
	try {
		const key = ignorePrefix ? STORAGE_KEY : STORAGE_KEY_PREFIX + STORAGE_KEY;
		const serializedState = JSON.stringify(storeState);
		localStorage.setItem(key, serializedState);
		return true;
	} catch (e) {
		console.warn('store serialization failed'); // eslint-disable-line no-console
	}
	return false;
}

export function loadState<T>(STORAGE_KEY: string, ignorePrefix = false): T | null {
	try {
		const key = ignorePrefix ? STORAGE_KEY : STORAGE_KEY_PREFIX + STORAGE_KEY;
		const serializedState = localStorage.getItem(key);
		if (serializedState == null) return null;
		return JSON.parse(serializedState);
	} catch (e) {
		console.warn('store deserialization failed'); // eslint-disable-line no-console
	}
	return null;
}

export function removeState(STORAGE_KEY: string | Array<string>, ignorePrefix = false): void {
	if (Array.isArray(STORAGE_KEY)) {
		STORAGE_KEY.forEach((key) => localStorage.removeItem(ignorePrefix ? key : STORAGE_KEY_PREFIX + key));
		return;
	}
	const key = ignorePrefix ? STORAGE_KEY : STORAGE_KEY_PREFIX + STORAGE_KEY;
	localStorage.removeItem(key);
}

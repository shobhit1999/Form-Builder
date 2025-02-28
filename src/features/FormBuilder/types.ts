export interface IQuestion {
	title: string;
	type: string;
	unit?: string;
	required?: string;
	min?: number;
	max?: number;
	options?: string[];
	helperText?: string;
}

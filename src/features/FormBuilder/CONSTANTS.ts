import { IInputField } from 'components/molecules/InputField';
import { BOOLEAN, TYPE } from 'Enum';

import { IQuestion } from './types';

export const FIELDS = (values: IQuestion): Array<IInputField<IQuestion>> => [
	{ id: 'title', label: 'Question Title', width: '100%', required: true },
	{ id: 'helperText', label: 'Helper Text', width: '100%', required: false },
	{
		id: 'type',
		label: 'Question Type',
		type: TYPE.SELECT,
		width: 'calc(48% - 8px)',
		required: true,
		list: [TYPE.TEXT, TYPE.NUMBER, TYPE.SELECT],
	},
	{
		id: 'required',
		label: 'Required',
		type: TYPE.SELECT,
		width: 'calc(48% - 8px)',
		list: ['Yes', 'No'],
	},
	{
		id: 'unit',
		label: 'Unit',
		width: `calc(48% - 8px)`,
		hideCondition: values.type !== TYPE.NUMBER,
	},
	{
		id: 'min',
		label: 'Min',
		type: 'tel',
		width: `calc(22% - ${16 / 3}px)`,
		hideCondition: values.type !== TYPE.NUMBER,
	},
	{
		id: 'max',
		label: 'Max',
		type: 'tel',
		width: `calc(22% - ${16 / 3}px)`,
		hideCondition: values.type !== TYPE.NUMBER,
	},
];

export const INIT_QUESTION: IQuestion = {
	title: '',
	type: '',
	required: BOOLEAN.YES,
};

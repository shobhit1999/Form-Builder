import React, { ChangeEvent } from 'react';

import TextField from 'components/atoms/TextField';
import { TYPE } from 'Enum';

import SelectField from './SelectField';

export interface IInputField<T> {
	id: keyof T;
	label?: string;
	type?: TYPE.SELECT | string;
	width?: string;
	hideCondition?: boolean;
	list?: Array<string>;
	autoFocus?: boolean;
	placeholder?: string;
	sx?: React.CSSProperties;
	required?: boolean;
}

interface Props<T> {
	disabled?: boolean;
	fields: Array<IInputField<T>>;
	errors?: Record<keyof T, string>;
	values: T;
	onChange: (name: string, value: string) => void;
}

function InputField<T>({ disabled, fields, values, onChange, errors }: Props<T>): React.ReactElement {
	const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
		const type = e.target.type;
		const value = type === 'tel' ? e.target.value.replace(/[^0-9.]+/g, '') : e.target.value;
		onChange(e.target.name, value);
	};

	const handleSelectChange = (id: string) => (val: string) => onChange(id, val);

	return (
		<>
			{fields
				.filter((i) => !i.hideCondition)
				.map((field) => {
					const { id, label, type, width, sx, list, autoFocus, placeholder, required } = field;
					const key = id.toString();
					const value = (values[id] || '') as string | number;
					const error = errors?.[id] || '';
					const finalLabel = required ? `${label} *` : label;
					const finalType = type?.toLowerCase();
					if (finalType === TYPE.SELECT.toLowerCase()) {
						return React.Children.toArray(
							<SelectField
								value={value as string}
								onChange={handleSelectChange(key)}
								disabled={disabled}
								placeholder={placeholder}
								sx={{ width, ...sx }}
								list={list}
								label={finalLabel}
								error={error}
							/>,
						);
					}
					return React.Children.toArray(
						<TextField
							value={value}
							id={key}
							label={finalLabel}
							type={finalType}
							name={key}
							onChange={handleValueChange}
							disabled={disabled}
							autoFocus={autoFocus}
							error={error}
							placeholder={placeholder}
							sx={{
								width,
								...sx,
							}}
						/>,
					);
				})}
		</>
	);
}

export default InputField;

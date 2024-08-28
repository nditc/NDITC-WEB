import React, { HTMLInputTypeAttribute } from 'react';
import { regDataInit, regDataType } from '@/config/registerData';

type props = {
  name: string;
  label: string;
  type: HTMLInputTypeAttribute;
  state: string | number;
  setValue: (name: string, data: string | number) => void;
  notRequired?: boolean;
  editable?: boolean;
};

const Field = ({ name, label, type, state, setValue, notRequired, editable = true }: props) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-500 ml-2 font-medium disabled:text-gray-200" htmlFor={name}>
        {label}
        {notRequired ? ' (Optional)' : ''}:
      </label>
      <input
        className="px-5 py-3 border-gray-200  disabled:bg-white disabled:text-gray-400 rounded-xl border focus:border-primary focus:outline-none"
        onChange={(e) => setValue(name, e.target.value)}
        value={state}
        type={type}
        name={name}
        required={!notRequired}
        placeholder={label}
        disabled={!editable}
        readOnly={!editable}
      />
    </div>
  );
};

export default Field;

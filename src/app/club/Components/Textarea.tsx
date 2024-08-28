import React, { HTMLInputTypeAttribute } from 'react';
import { regDataInit, regDataType } from '@/config/registerData';

type props = {
  name: string;
  label: string;
  state: string | number;
  setValue: (name: string, data: string | number) => void;
  notRequired?: boolean;
  editable?: boolean;
  rows?: number;
};

const Textarea = ({ name, label, state, setValue, notRequired, editable = true, rows }: props) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-500 ml-2 font-medium disabled:text-gray-200" htmlFor={name}>
        {label}
        {notRequired ? ' (Optional)' : ''}:
      </label>
      <textarea
        className="px-5 py-3 border-gray-200  disabled:bg-white disabled:text-gray-400 rounded-xl border focus:border-primary focus:outline-none"
        onChange={(e) => setValue(name, e.target.value)}
        value={state}
        name={name}
        required={!notRequired}
        placeholder={label}
        disabled={!editable}
        readOnly={!editable}
        rows={rows || 5}
      />
    </div>
  );
};

export default Textarea;

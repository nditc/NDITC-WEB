import React from 'react';

type props = {
  name: string;
  label: string;
  values: string[];
  selected: string | number;
  setValue: (name: string, data: string | number) => void;
  editable?: boolean;
};
const Select = ({ name, label, values, selected, setValue, editable = true }: props) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-500 ml-2 font-medium " htmlFor={name}>
        {label}
      </label>

      <select
        style={{
          pointerEvents: editable ? 'auto' : 'none',
        }}
        className="px-5 py-3 border-gray-200 rounded-xl border focus:border-primary focus:outline-none"
        name={name}
        value={selected}
        onChange={(e) => setValue(name, e.target.value)}
        disabled={!editable}
        title="class"
      >
        {values.map((val, index) => (
          <option value={val} key={index}>
            {val}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;

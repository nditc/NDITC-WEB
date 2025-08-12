import { HTMLInputTypeAttribute } from "react";

type FieldProps = {
  name: string;
  label: string;
  type: HTMLInputTypeAttribute;
  state: string | number;
  setValue: (name: string, data: string | number) => void;
  notRequired?: boolean;
  editable?: boolean;
  returnNumber?: boolean;
};

const Field = ({
  name,
  label,
  type,
  state,
  setValue,
  notRequired,
  editable = true,
  returnNumber,
}: FieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        className="ml-2 font-medium text-gray-500 disabled:text-gray-200"
        htmlFor={name}
      >
        {label}
        {notRequired ? " (Optional)" : ""}:
      </label>
      <input
        className="rounded-xl border border-gray-200 px-5 py-3 focus:border-primary focus:outline-none disabled:bg-white disabled:text-gray-400"
        onChange={(e) =>
          setValue(name, returnNumber ? e.target.valueAsNumber : e.target.value)
        }
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
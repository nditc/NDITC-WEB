import { HTMLInputTypeAttribute } from "react";

type Props = {
  name: string;
  label: string;
  type: HTMLInputTypeAttribute;
  state: number;
  setValue: (name: string, data: number) => void;
  notRequired?: boolean;
  editable?: boolean;
};

const PassingYear = ({
  name,
  label,
  type,
  state,
  setValue,
  notRequired,
  editable = true,
}: Props) => {
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
        min={1990}
        max={2099}
        step={1}
        className="rounded-xl border border-gray-200 px-5 py-3 focus:border-primary focus:outline-none disabled:bg-white disabled:text-gray-400"
        onChange={(e) => setValue(name, e.target.valueAsNumber)}
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

export default PassingYear;
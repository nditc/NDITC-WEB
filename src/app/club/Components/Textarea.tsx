type props = {
  name: string;
  label: string;
  state: string | number;
  setValue: (name: string, data: string | number) => void;
  notRequired?: boolean;
  editable?: boolean;
  rows?: number;
};

const Textarea = ({
  name,
  label,
  state,
  setValue,
  notRequired,
  editable = true,
  rows,
}: props) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        className="ml-2 font-medium text-gray-500 disabled:text-gray-200"
        htmlFor={name}
      >
        {label}
        {notRequired ? " (Optional)" : ""}:
      </label>
      <textarea
        className="rounded-xl border border-gray-200 px-5 py-3 focus:border-primary focus:outline-none disabled:bg-white disabled:text-gray-400"
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

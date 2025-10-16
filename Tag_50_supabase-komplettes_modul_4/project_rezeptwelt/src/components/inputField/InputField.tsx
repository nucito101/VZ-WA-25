type InputFieldProps = {
  label: string
  name?: string
  type?: string
  placeholder?: string
  autoComplete?: string
  required?: boolean
  as?: "input" | "select" | "textarea"
  children?: React.ReactNode
  className?: string
  defaultValue?: string | number
}

export default function InputField({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  required = false,
  as = "input",
  children,
  className,
  defaultValue,
}: InputFieldProps) {
  const styling =
    "w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-[15px] text-neutral-900 shadow-sm outline-none transition hover:border-neutral-400 focus:border-neutral-300 focus:ring-2 focus:ring-[#FFDB63] focus:ring-offset-2"

  return (
    <div className={className}>
      <label className="mb-1 block text-sm font-medium text-neutral-800">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      {as === "select" ? (
        <select name={name} required={required} defaultValue="" className={styling}>
          <option value="" disabled>
            Bitte auswählen
          </option>
          {children}
        </select>
      ) : as === "textarea" ? (
        <textarea
          name={name}
          placeholder={placeholder}
          required={required}
          rows={6}
          className={`${styling} min-h-[120px] resize-y`}
        />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          defaultValue={defaultValue}
          className={styling}
        />
      )}
    </div>
  )
}

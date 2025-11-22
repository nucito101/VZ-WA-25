// components/inputField/InputField.tsx
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
  rows?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  readOnly?: boolean
  pattern?: string
  inputMode?: React.InputHTMLAttributes<HTMLInputElement>["inputMode"]
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
  rows = 6,
  min,
  max,
  step,
  disabled,
  readOnly,
  pattern,
  inputMode,
}: InputFieldProps) {
  const styling =
    "w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-[15px] text-neutral-900 shadow-sm outline-none transition hover:border-neutral-400 focus:border-neutral-300 focus:ring-2 focus:ring-[#FFDB63] focus:ring-offset-2 disabled:opacity-60"

  const id = name || label.replace(/\s+/g, "-").toLowerCase()

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-neutral-800">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      {as === "select" ? (
        <select
          id={id}
          name={name}
          required={required}
          disabled={disabled}
          defaultValue={defaultValue ?? ""}
          className={styling}>
          <option value="" disabled>
            Bitte auswählen
          </option>
          {children}
        </select>
      ) : as === "textarea" ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          rows={rows}
          defaultValue={typeof defaultValue === "number" ? String(defaultValue) : (defaultValue as string)}
          className={`${styling} min-h-[120px] resize-y`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          defaultValue={defaultValue}
          min={min}
          max={max}
          step={step}
          pattern={pattern}
          inputMode={inputMode}
          className={styling}
        />
      )}
    </div>
  )
}

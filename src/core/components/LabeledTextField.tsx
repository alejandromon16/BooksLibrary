import { forwardRef, PropsWithoutRef, ComponentPropsWithoutRef } from "react"
import { useFormContext } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ label, outerProps, labelProps, name, ...props }, ref) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext()

    return (
      <div {...outerProps}>
        <label {...labelProps}>
          {label}
          <input autoComplete="false" disabled={isSubmitting} {...register(name)} {...props} />
        </label>

        <ErrorMessage
          render={({ message }) => (
            <div role="alert" style={{ color: "red" }}>
              {message}
            </div>
          )}
          errors={errors}
          name={name}
        />

        <style jsx>{`
          label {
            display: flex;
            flex-direction: column;
            align-items: start;
            font-size: 1rem;

          }
          input {
            font-size: 1rem;
            width:100%;
            background-color: var(--color-white);
            border: 1px solid var(--color-shade-100);
            padding:0.5rem 1rem;
            border-radius: 3px;
            border: 1px solid purple;
            appearance: none;
            margin: 10px 0;
            margin-top: 0.5rem;
          }

          input:not([value = ""]){
              background-color: transparent;
              color: var(--color-black);
          }

          input:focus{
            border:2px solid var(--color-primary);

            outline: var(--color-primary);
          }
        `}</style>
      </div>
    )
  }
)

export default LabeledTextField

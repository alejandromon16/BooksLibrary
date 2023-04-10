import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import signup from "src/auth/mutations/signup"
import { Signup } from "src/auth/validations"
import { useMutation } from "@blitzjs/rpc"
import Card from "src/core/components/Card"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  return (
    <div className="contain">
      <Card>
        <h1>Create an Account</h1>
        <Form
          submitText="Create Account"
          schema={Signup}
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            try {
              await signupMutation(values)
              props.onSuccess?.()
            } catch (error: any) {
              if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                // This error comes from Prisma
                return { email: "This email is already being used" }
              } else {
                return { [FORM_ERROR]: error.toString() }
              }
            }
          }}
        >
          <LabeledTextField name="email" label="Email" placeholder="Email" />
          <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
        </Form>
      </Card>
      <style jsx>{`
      .contain {
        display: flex;
        flex-direction: column;
        margin:auto;
        margin-top: 10rem;
      }
      @media (min-width: 640px) {
        .contain {
          max-width: 640px;
        }
      }
      @media (min-width: 768px) {
        .contain{
          max-width: 40%;
        }
      }

      `}</style>
    </div>
  )
}

export default SignupForm

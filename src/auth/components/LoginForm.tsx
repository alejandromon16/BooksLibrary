import { AuthenticationError, PromiseReturnType } from "blitz"
import Link from "next/link"
import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import login from "src/auth/mutations/login"
import { Login } from "src/auth/validations"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import { authConfig } from "src/blitz-client"
import Card from "src/core/components/Card"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  return (
    <div className="contain" >
      <Card>

        <h1>Login</h1>

        <Form
          submitText="Login"
          schema={Login}
          initialValues={{ email: "", password: "" }}
          style={{
            display:"flex",
            justifyContent: "center",
            flexDirection:"column",
          }}
          onSubmit={async (values) => {
            try {
              const user = await loginMutation(values)
              
              props.onSuccess?.(user)
            } catch (error: any) {
              if (error instanceof AuthenticationError) {
                return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
              } else {
                return {
                  [FORM_ERROR]:
                    "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
                }
              }
            }
          }}
        >
          <div>
           <LabeledTextField name="email" label="Email" placeholder="Email" />
          </div>
          <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
          <div>
            <Link href={Routes.ForgotPasswordPage()}>Forgot your password?</Link>
          </div>
        </Form>

        <div style={{ marginTop: "1rem" }}>
          Or <Link href={Routes.SignupPage()}>Sign Up</Link>
        </div>

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

export default LoginForm

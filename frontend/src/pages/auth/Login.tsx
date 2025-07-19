import React from "react";
import { Formik, Form, type FormikHelpers } from "formik";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { loginValidationSchema } from "../../validators/validators";
import { Input } from "../../components/reusable/Input";
import { Button } from "../../components/reusable/Button";
import { useLoginMutation } from "../../redux/api/authApi";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/slice/authSlice";

interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

const Login: React.FC = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting, setStatus }: FormikHelpers<LoginFormValues>
  ) => {
    try {
      const result = await login(values).unwrap();
      const { email, name, role, token, userId } = result.response;
      console.log("++++", result.response);
      localStorage.setItem(
        "user",
        JSON.stringify({ email, name, role, token, userId })
      );
      dispatch(
        setUser({
          name: name,
        })
      );
      if (token) {
        toast.success("Login Successful");
        console.log('inside');
        navigate(role === "admin" ? "/admin-dashboard" : "/dashboard");
      } else {
        setStatus("Invalid email or password");
      }
    } catch (error) {
      console.log("error", error);
      setStatus("Invalid email or password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-100 via-blue-100 to-teal-100 max-w-md mx-auto mt-10 rounded-xl shadow-lg overflow-hidden p-6">
      <h4 className="text-2xl font-semibold mb-2 text-center">
        Sign In to your Account
      </h4>
      <p className="text-gray-500 text-center mb-6">
        Welcome back! Please enter your details.
      </p>
      
      <hr className="mb-6 border-black opacity-18" />
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
        validateOnBlur
        validateOnChange
      >
        {({
          values,
          handleChange,
          handleBlur,
          isValid,
          touched,
          errors,
          status,
          isSubmitting,
        }) => (
          <Form>
            <Input
              id="email"
              label="Email"
              type="email"
              value={values.email}
              onChange={(name, value) =>
                handleChange({ target: { name, value } })
              }
              onBlur={handleBlur}
              required
              error={touched.email && errors.email ? errors.email : ""}
            />
            <Input
              id="password"
              label="Password"
              type="password"
              value={values.password}
              onChange={(name, value) =>
                handleChange({ target: { name, value } })
              }
              onBlur={handleBlur}
              required
              error={touched.password && errors.password ? errors.password : ""}
            />
            <div className="mt-6 text-center">
              <Button
                type="submit"
                label="Login"
                isLoading={isSubmitting}
                isDisabled={!isValid}
              />
              {status && (
                <div className="text-red-600 text-sm mt-4">{status}</div>
              )}
            </div>
          </Form>
        )}
      </Formik>
      <p className="mt-4 text-sm text-center">
        Don't have an account?{" "}
        <Link to="/" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;

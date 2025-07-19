import React from "react";
import { Formik, Form, type FormikHelpers } from "formik";
import { Input } from "../../components/reusable/Input";
import { Button } from "../../components/reusable/Button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RegisterValidationSchema } from "../../validators/validators";
import { useRegisterMutation } from "../../redux/api/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/slice/authSlice";
import type { IRegisterUser } from "../../interface/user";

const initialValues: IRegisterUser = {
  name: "",
  age: "",
  height: "",
  weight: "",
  email: "",
  role: "user",
  password: "",
  gender: "",
};

const Register: React.FC = () => {
  const [register] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (
    values: IRegisterUser,
    { setSubmitting, setStatus }: FormikHelpers<IRegisterUser>
  ) => {
    try {
      const result = await register(values).unwrap();
      const { email, name, role, token, userId } = result.response;

      localStorage.setItem(
        "user",
        JSON.stringify({ email, name, role, token, userId })
      );

      dispatch(
        setUser({
          email,
          name,
          role,
          token,
          userId,
          mobileNumber: values.mobileNumber,
          gender: values.gender,
        })
      );


      toast.success("Registration Successful");

      switch (role) {
        case "admin":
          navigate("/admin-dashboard");
          break;
        case "patient":
        case "user":
          navigate("/dashboard");
          break;
        default:
          navigate("/login");
      }
    } catch (error: any) {
      const message = error?.data?.message || "Registration failed";
      setStatus(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[linear-gradient(to_right,#bfe2f2,#cdf7f5)] max-w-md mx-auto mt-6 rounded-xl shadow-lg overflow-hidden p-6 !min-h-[400px]">
      <h2 className="text-2xl font-semibold mb-2 text-center">
        User Registration
      </h2>
      <hr className="mb-6 border-black opacity-18" />

      <Formik
        initialValues={initialValues}
        validationSchema={RegisterValidationSchema}
        onSubmit={handleSubmit}
        validateOnBlur={true}
        validateOnChange={true}
      >
        {({
          values,
          handleChange,
          errors,
          touched,
          handleBlur,
          isSubmitting,
          dirty,
          isValid,
          status,
        }) => (
          <Form>
            <Input
              id="name"
              label="Name"
              type="text"
              value={values.name}
              onChange={(name, value) =>
                handleChange({ target: { name, value } })
              }
              onBlur={handleBlur}
              error={touched.name && errors.name ? errors.name : ""}
              required
            />
            <Input
              id="age"
              label="Age"
              type="number"
              value={values.age}
              onChange={(name, value) =>
                handleChange({ target: { name, value } })
              }
              onBlur={handleBlur}
              error={
                touched.age && errors.age
                  ? errors.age
                  : ""
              }
              required
            />
            <Input
              id="height"
              label="Height"
              type="number"
              value={values.height}
              onChange={(name, value) =>
                handleChange({ target: { name, value } })
              }
              onBlur={handleBlur}
              error={
                touched.height && errors.height
                  ? errors.height
                  : ""
              }
              required
            />
            <Input
              id="weight"
              label="Weight"
              type="number"
              value={values.weight}
              onChange={(name, value) =>
                handleChange({ target: { name, value } })
              }
              onBlur={handleBlur}
              error={
                touched.weight && errors.weight
                  ? errors.weight
                  : ""
              }
              required
            />
            <Input
              id="email"
              label="Email"
              type="email"
              value={values.email}
              onChange={(name, value) =>
                handleChange({ target: { name, value } })
              }
              onBlur={handleBlur}
              error={touched.email && errors.email ? errors.email : ""}
              required
            />
            <Input
              id="gender"
              label="Gender"
              type="select"
              value={values.gender}
              options={[
                { label: "Female", value: "female" },
                { label: "Male", value: "male" },
                { label: "Other", value: "other" },
              ]}
              onChange={(name, value) =>
                handleChange({ target: { name, value } })
              }
              onBlur={handleBlur}
              error={touched.gender && errors.gender ? errors.gender : ""}
              required
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
              error={touched.password && errors.password ? errors.password : ""}
              required
            />
            <div className="mt-6 text-center">
              <Button
                type="submit"
                label="Register"
                isLoading={isSubmitting}
                isDisabled={!isValid}
              />

              {status && (
                <div className="text-red-600 text-sm mt-4">{status}</div>
              )}
            </div>

            <div className="mt-4 text-center text-sm text-gray-600">
              Already Registered?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;

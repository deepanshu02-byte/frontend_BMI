import * as Yup from 'yup';

export const RegisterValidationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[A-Za-z\s]+$/, 'Name can only contain letters and spaces')
    .min(3, 'Name must be at least 3 characters')
    .required('Name is required'),

  mobileNumber: Yup.string()
    .matches(/^\d{10}$/, "Must be a 10-digit number")
    .required('Phone number is required'),

  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),

  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Must contain at least one number')
    .matches(/[^A-Za-z0-9]/, 'Must contain at least one special character')
    .required('Password is required'),

});


export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

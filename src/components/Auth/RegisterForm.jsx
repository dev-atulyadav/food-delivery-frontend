import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/slices/authSlice';
import StatusCode from '../../utils/StatusCode';
import { toast } from 'react-toastify';

function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, status, message } = useSelector((state) => state.auth);

  console.log(`message: ${message}, status: ${status}`)

  const [values, setValues] = useState({
    fullName: '',
    password: '',
    email: '',
    role: 'ROLE_CUSTOMER'
  });

  const [errors, setErrors] = useState({
    fullName: '',
    password: '',
    email: '',
    role: '',
  });

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().min(2, 'Full Name must be at least 2 characters').required('Full Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    role: Yup.string().required('Role is required'),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    // Validate the field on change
    validationSchema
      .validateAt(name, { [name]: value })
      .then(() => {
        setErrors({
          ...errors,
          [name]: '',
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [name]: err.message,
        });
      });
  };

  useEffect(() => {
    if (user && status === StatusCode.SUCCESS) {
      toast.success(message)
      setTimeout(() => {
        navigate('/account/login'); 
      }, 2000);
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    validationSchema
      .validate(values, { abortEarly: false })
      .then(() => {
        dispatch(registerUser(values));
      })
      .catch((err) => {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      });
  };

  return (
    <div className="p-4">
      <div className="mx-auto w-full max-w-md">
        <h1 className="text-center text-2xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Register</h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-200">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={values.fullName}
              onChange={handleChange}
              className={`mt-1 w-full rounded-lg border bg-transparent px-3 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-orange-500'}`}
              placeholder="John Doe"
              autoComplete="name"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              className={`mt-1 w-full rounded-lg border bg-transparent px-3 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-orange-500'}`}
              placeholder="you@example.com"
              autoComplete="email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-200">Role</label>
            <select
              id="role"
              name="role"
              value={values.role}
              onChange={handleChange}
              className={`mt-1 w-full rounded-lg border bg-transparent px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 ${errors.role ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-orange-500'}`}
            >
              <option className="bg-gray-900" value={'ROLE_CUSTOMER'}>Customer</option>
              <option className="bg-gray-900" value={'ROLE_RESTAURANT_OWNER'}>Restaurant Owner</option>
              <option className="bg-gray-900" value={'ROLE_ADMIN'}>Admin</option>
            </select>
            {errors.role && (
              <p className="mt-1 text-sm text-red-500">{errors.role}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-200">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              className={`mt-1 w-full rounded-lg border bg-transparent px-3 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-orange-500'}`}
              placeholder="••••••••"
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-4 py-3 font-semibold text-white shadow transition hover:opacity-90"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-300">
          Already have an account?
          <button className="ml-1 font-semibold text-orange-400 hover:underline" onClick={() => navigate('/account/login')}>Login</button>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;

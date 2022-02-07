import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../action-reducer/login/loginActions';
import {useState, useEffect} from 'react';

export const validate = (values) => {
  let errors = {};
  if (!values.password) {
    errors.password = 'New password is required';
    return;
  } else if (values.password.length < 8) {
    errors.password = 'New Password must be 8 or more characters';
  }
  if (!values.cpassword) {
    errors.cpassword = 'Confirm password is required';
  } else if (values.cpassword.length < 8) {
    errors.cpassword = 'Confirm password must be 8 or more characters';
  }
  if (values.cpassword !== values.password) {
    errors.cpassword = 'Password and confirm password does not match';
  }
  return errors;
};

export const useForm = (callback) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login.login);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      if (!errors.password && !errors.cpassword) {
        if (login) {
          callback();
        }
        dispatch(actions.LoginAction(true));
      }
    }
  }, [errors, login]);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const handleChange = (value, field) => {
    setValues((values) => ({...values, [field]: value}));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};

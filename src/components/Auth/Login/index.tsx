import { useState } from 'react';
import {
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { Formik, Form } from 'formik';
import { object, string } from 'yup';
import Link from 'next/link';
import Alert, { AlertStatuses } from '@/components/MuiComponents/Alert';
import { useDispatch } from 'react-redux';
import { userSignInSuccess } from '@/store/slices/auth/authSlice';
import signIn from '@/services/auth';

const fieldValidation = object({
  email: string()
    .email('Въведете валиден имейл')
    .required('Полето е задължително'),
  password: string()
    .trim()
    .min(8, 'Дължината трябва да е поне 8 символа')
    .required('Полето е задължително')
});

type LoginFormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const dispatch = useDispatch();
  const [formStatus, setFormStatus] = useState<AlertStatuses>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues: LoginFormValues = {
    email: '',
    password: ''
  };

  const handleFormSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await signIn(values.email, values.password);

      if (response) {
        const { id, email, accessToken } = response;

        dispatch(userSignInSuccess({ id, email, accessToken }));
      }
    } catch (error) {
      console.log(error.message);

      setFormStatus('error');
      setAlertMessage('Невалидни данни, моля опитайте отново!');
      setLoading(false);
    }
  };

  return (
    <Stack
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Paper sx={{ width: '100%', maxWidth: '600px', padding: 4 }}>
        <Typography component="h1" variant="h1" align="center" mb={3}>
          Енеркон ЕООД
        </Typography>
        <Typography component="h1" variant="h3" align="center" mb={6}>
          Административно Табло
        </Typography>
        <Typography component="h2" variant="h3" align="center">
          Вход
        </Typography>

        {!loading ? (
          <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            validationSchema={fieldValidation}
          >
            {({ handleSubmit, handleChange, touched, errors, values }) => (
              <Form onSubmit={handleSubmit}>
                <Stack spacing={3} mt={3}>
                  <TextField
                    name="email"
                    label="Имейл Адрес"
                    error={touched['email'] && !!errors['email']}
                    helperText={touched['email'] && errors['email']}
                    onChange={handleChange}
                    value={values.email}
                  />

                  <TextField
                    name="password"
                    label="Парола"
                    error={touched['password'] && !!errors['password']}
                    helperText={touched['password'] && errors['password']}
                    onChange={handleChange}
                    type={'password'}
                    value={values.password}
                  />

                  <Button type="submit" variant="contained" fullWidth>
                    Вход
                  </Button>

                  <Alert
                    message={alertMessage}
                    showAlert={!!alertMessage}
                    severity={formStatus}
                  />

                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    gap={1}
                  >
                    <Typography component="p" variant="body1">
                      Нямате акаунт?
                    </Typography>
                    <Link href="/auth/register">Регистрирай се тук</Link>
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        ) : (
          <Stack justifyContent="center" alignItems="center" my={6}>
            <CircularProgress size="3rem" />
          </Stack>
        )}
      </Paper>
    </Stack>
  );
};

export default Login;

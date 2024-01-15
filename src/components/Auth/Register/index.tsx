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
import { object, ref, string } from 'yup';
import Link from 'next/link';
import Alert, { AlertStatuses } from '@/components/MuiComponents/Alert';
import { signUp } from '@/services/auth';

const fieldValidation = object({
  username: string().trim().required('Полето е задължително'),
  email: string()
    .email('Въведете валиден имейл')
    .required('Полето е задължително'),
  password: string()
    .trim()
    .min(8, 'Дължината трябва да е поне 8 символа')
    .required('Полето е задължително'),
  confirmPassword: string().oneOf([ref('password')], 'Паролите не съвпадат')
});

type LoginFormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const [formStatus, setFormStatus] = useState<AlertStatuses>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues: LoginFormValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const handleFormSubmit = async (values) => {
    try {
      setLoading(true);
      signUp(values.username, values.email, values.password).then(() => {
        setLoading(false);
      });
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
          Регистрация
        </Typography>

        {!loading ? (
          <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            validationSchema={fieldValidation}
          >
            {({ handleSubmit, handleChange, touched, errors, values }) => (
              <Form onSubmit={handleSubmit} autoComplete="false">
                <Stack spacing={3} mt={3}>
                  <TextField
                    name="username"
                    label="Потребителско име *"
                    error={touched['username'] && !!errors['username']}
                    helperText={touched['username'] && errors['username']}
                    onChange={handleChange}
                    value={values.username}
                  />

                  <TextField
                    name="email"
                    label="Имейл Адрес  *"
                    error={touched['email'] && !!errors['email']}
                    helperText={touched['email'] && errors['email']}
                    onChange={handleChange}
                    value={values.email}
                  />

                  <TextField
                    name="password"
                    label="Парола *"
                    error={touched['password'] && !!errors['password']}
                    helperText={touched['password'] && errors['password']}
                    onChange={handleChange}
                    type={'password'}
                    value={values.password}
                  />

                  <TextField
                    name="confirmPassword"
                    label="Потвърждение на паролата  *"
                    error={
                      touched['confirmPassword'] && !!errors['confirmPassword']
                    }
                    helperText={
                      touched['confirmPassword'] && errors['confirmPassword']
                    }
                    onChange={handleChange}
                    type={'password'}
                    value={values.confirmPassword}
                  />

                  <Button type="submit" variant="contained" disabled fullWidth>
                    Регистрация
                  </Button>

                  <Alert
                    message="За да създадете акаунт, моля, свържете се с администратор на сайта!"
                    showAlert={true}
                    severity="warning"
                  />

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
                      Имате акаунт?
                    </Typography>
                    <Link href="/auth/login">Влезте тук</Link>
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

export default Register;

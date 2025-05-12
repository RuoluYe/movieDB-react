import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField } from '@mui/material';
import { Box, CircularProgress, Typography } from '@mui/material';
import useUser from '../hooks/useUser';
import { useNavigate  } from 'react-router-dom';

const validationSchema = yup.object({
  username: yup
    .string('Enter your username')
    .required('username is required'),
  password: yup
    .string('Enter your password')
    .required('Password is required'),
});

const Login = () => {
  const { login, loading } = useUser();
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setHasError(false);
      login(values.username, values.password).then(() => {
        navigate('/');
      }).catch(() => {
        setHasError(true);
      })
    },
  });
  return (
    <Box m="auto" width="500px" pt={5}>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h3" align="center">Login</Typography>
        {hasError && <Typography color="secondary" align='center'>Failed to login</Typography>}
        <Box mb={3}>
          <TextField
            fullWidth
            id="username"
            name="username"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </Box>
        <Box mb={3}>
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Box>
        {loading ? <Box display="flex" justifyContent="center"><CircularProgress /></Box>
          : <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>}

      </form>
    </Box>
  )
}

export default Login

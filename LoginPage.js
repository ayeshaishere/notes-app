"use client"

import { useDispatch } from "react-redux"
import { loginSuccess } from "../features/auth/authSlice"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import { Box, Button, TextField, Typography, Paper, Container } from "@mui/material"

const LoginPage = () => {
  const dispatch = useDispatch()

  const loginSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().min(4, "Min 4 chars").required("Password is required"),
  })

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 10, p: 4, backgroundColor: "#1e1e1e", color: "#fff" }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>📝</div>
          <Typography variant="h4" gutterBottom>
            Notes App
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to access your notes
          </Typography>
        </Box>

        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            dispatch(loginSuccess({ username: values.username }))
          }}
        >
          {({ handleChange, handleBlur, values, errors, touched }) => (
            <Form>
              <TextField
                label="Username"
                name="username"
                fullWidth
                margin="normal"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                sx={{
                  "& .MuiInputLabel-root": { color: "#aaa" },
                  "& .MuiOutlinedInput-root": {
                    color: "#fff",
                    "& fieldset": { borderColor: "#555" },
                    "&:hover fieldset": { borderColor: "#777" },
                  },
                }}
              />

              <TextField
                label="Password"
                type="password"
                name="password"
                fullWidth
                margin="normal"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{
                  "& .MuiInputLabel-root": { color: "#aaa" },
                  "& .MuiOutlinedInput-root": {
                    color: "#fff",
                    "& fieldset": { borderColor: "#555" },
                    "&:hover fieldset": { borderColor: "#777" },
                  },
                }}
              />

              <Button type="submit" variant="contained" color="primary" fullWidth size="large" sx={{ mt: 3, mb: 2 }}>
                🔐 Sign In
              </Button>
            </Form>
          )}
        </Formik>

        <Typography variant="caption" display="block" textAlign="center" sx={{ mt: 2, color: "#aaa" }}>
          Demo: Use any username and password (min 4 characters)
        </Typography>
      </Paper>
    </Container>
  )
}

export default LoginPage

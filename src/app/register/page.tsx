"use client";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import Grid from '@mui/material/Grid2'
import { LockOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import  Link  from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  useEffect(()=> {
    if(localStorage.getItem("user")){
      router.push("/home")
    }
  },[])

  const handleRegister = () => {
    axios
      .post("http://localhost:8080/api/users/register", { 
        name: name,
        email: email,
        password: password, 
      })
      .then((response) => {
        //@ts-ignore
        if(response.data.success){
          console.log("User registered:", response.data);
          router.push("/login");
        }else{
          //@ts-ignore
          Swal.fire({
            title: 'Hata!',
            text: response.data.message,
            icon: 'error',
            confirmButtonText: 'Tamam'
          })
        }
      })
      .catch((error) => console.error("Registration failed:", error));
  };

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">Register</Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleRegister}
            >
              Register
            </Button>
            <Grid container justifyContent="center">
              <Grid >Already have an account?
                <Link href="/login"> Login</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Register;

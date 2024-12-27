"use client";
import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import Grid from '@mui/material/Grid2'
import { useEffect, useState } from "react";
import  Link  from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'

const Login = () => {
    const [email, setEmail] = useState<string>(""); 
    const [password, setPassword] = useState<string>(""); 
    const router = useRouter();

    useEffect(()=> {
      if(localStorage.getItem("user")){
        router.push("/home")
      }
    },[])
    

  const handleLogin = () => {
    axios
    .post("http://localhost:8080/api/users/login", { 
      email: email,
      password: password, 
    })
    .then((response) => {
      //@ts-ignore
      if(response.data.success){
        console.log("Todoliste yönlendir:", response.data);
        localStorage.setItem("user",JSON.stringify(response.data.data))
        router.push("/home");
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
          <Typography variant="h5">Login</Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Grid container justifyContent="center">
              <Grid>
                Don't have an account?
                <Link href="/register"> Register</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;



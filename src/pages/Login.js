import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const toast =useToast()
  const { setAuthState } = useContext(AuthContext);
  const login = (e) => {
    
    const data = { username: username, password: password };
    console.log(data);
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        toast({
          title: response.data.error ,
          // description: "We've created your account for you.",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      } else {
        // toast({
        //   title: response.data,
        //   // description: "We've created your account for you.",
        //   status: 'success',
        //   duration: 1000,
        //   isClosable: true,
        // })
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.user.username,
          id: response.data.user.id,
          status: true,
        });
        // setAuthState(true)
        navigate("/");
      }
    });
  };

  return (
    <Flex width="full" height={"90vh"} align="center" justifyContent="center">
      <Box p={2} width="350px" bg={"tomato"} borderRadius={8}>
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>    
        <Box my={4} textAlign="left">
          <form >
            <FormControl>
              <FormLabel>Username :</FormLabel>
              <Input
                bg={"white"}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
                name="username"
                id="inputLogin"
                placeholder="Username ...."
              />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Password :</FormLabel>
              <Input
                bg={"white"}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                id="inputLogin"
                name="password"
                type="password"
                placeholder="*******"
              />
            </FormControl>
            <Button width="full" mt={4} onClick={login}>
              Login
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

export default Login;

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup"
import React from "react";
import axios from "axios";

function Registration() {
  const initialValues = {
    username: "",
    password: ""
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });


  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then(() => {
      console.log(data);
    });
  };

  return (
    <Flex width="full" height={"90vh"} align="center" justifyContent="center">
    <Box p={2} width="350px" bg={"tomato"} borderRadius={8} >
      <Box textAlign="center">
        <Heading>Registration</Heading>
      </Box>
      <Box my={4} textAlign="left">
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form>
            <FormControl>
              <FormLabel>Username :</FormLabel>
              <Field 
                  name="username" 
                  id="inputLogin"  
                  placeholder="Username ...." />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Password :</FormLabel>
              <Field id="inputLogin"   name="password" type="password" placeholder="*******" />
            </FormControl>
            <Button width="full" mt={4} type="submit">
              Sign Up
            </Button>
          </Form>
        </Formik>
      </Box>
    </Box>
  </Flex>
  )
}

export default Registration
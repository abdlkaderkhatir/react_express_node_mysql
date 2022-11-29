import React, { useContext, useEffect } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import {
  Box,
  Button,
  calc,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  VStack,
} from "@chakra-ui/react";
import * as Yup from "yup"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../utils/AuthContext";

function CreatePost() {
  const navigate =useNavigate()
  const { authState,setAuthState } = useContext(AuthContext);
  const initialValues = {
    title: "",
    postText: "",
    // username: "",
  };


  useEffect(()=>{
    if(!localStorage.getItem("accessToken")){
      navigate("/login")
    }
  },[])

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required(),
    // username:Yup.string().required()
  });


  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("http://localhost:3001/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        console.log(response.data);
        navigate("/");
      });
  };

  
  return (
    <Box>
      <Flex bg="gray.100" align="center" justify="center" h={"90vh"}>
        <Box bg="white" p={6} rounded="md" w={300} height={420}>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form>
              <VStack  spacing='15px' align="start">
                <FormControl>
                  <FormLabel htmlFor="title">Tilte :</FormLabel>
                  <ErrorMessage name="title" component={"span"} />
                  <Field
                    //    as={Input}
                    autoComplete="off"
                    id="inputCreatePost"
                    name="title"
                    placeholder="(Ex. Title...)"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="postText">Post :</FormLabel>
                  <ErrorMessage name="postText" component={"span"} />
                  <Field
                    // as={Input}
                    autoComplete="off"
                    id="inputCreatePost"
                    name="postText"
                    placeholder="(Ex. Post...)"
                  />
                  {/* <FormErrorMessage>{errors.password}</FormErrorMessage> */}
                </FormControl>

                {/* <FormControl>
                  <FormLabel htmlFor="username">Username :</FormLabel>
                  <ErrorMessage name="username" component={"span"} />
                  <Field
                    // as={Input}
                    autoComplete="off"
                    id="inputCreatePost"
                    name="username"
                    placeholder="(Ex. Username...)"
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage> 
                </FormControl> */}

                <Button type="submit" colorScheme="purple" width="full">
                  Login
                </Button>
              </VStack>
            </Form>
          </Formik>
        </Box>
      </Flex>
    </Box>
  );
}

export default CreatePost;

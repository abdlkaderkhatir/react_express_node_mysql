import React from 'react'
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
import axios from 'axios';

export default function MiniProject() {

    // const { authState,setAuthState } = useContext(AuthContext);
  const initialValues = {
    A1: "",
    A2: "",
    A3: "",
    A4: "",
  };

    // const validationSchema = Yup.object().shape({
    //     title: Yup.string().required("You must input a Title!"),
    //     postText: Yup.string().required(),
    //     // username:Yup.string().required()
    //   });
    
    
      const onSubmit = (data) => {
        console.log(data);
        axios
        .post("http://127.0.0.1:5000", data,{
          // "Access-Control-Allow-Origin": "*"
        })
          .then((response) => {
            console.log(response.data);
            // navigate("/");
          });
      };


  return (
    <Box>
      <Flex bg="gray.100" align="center" justify="center" h={"90vh"}>
        <Box bg="white" p={6} rounded="md" w={300} height={420}>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form>
              <VStack  spacing='15px' align="start">
                <FormControl>
                  <FormLabel htmlFor="title">Tilte :</FormLabel>
                  <ErrorMessage name="title" component={"span"} />
                  <Field
                    //    as={Input}
                    autoComplete="off"
                    id="inputCreatePost"
                    name="A1"
                    placeholder="(Ex. Title...)"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="title">Tilte :</FormLabel>
                  <ErrorMessage name="title" component={"span"} />
                  <Field
                    //    as={Input}
                    autoComplete="off"
                    id="inputCreatePost"
                    name="A2"
                    placeholder="(Ex. Title...)"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="title">Tilte :</FormLabel>
                  <ErrorMessage name="title" component={"span"} />
                  <Field
                    //    as={Input}
                    autoComplete="off"
                    id="inputCreatePost"
                    name="A3"
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
                    name="A4"
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
  )
}

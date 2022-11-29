import { Center, Flex, VStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <Flex   className="pagenotfound" align="center" justifyContent="center">

    <VStack >
        <h1>Page Not Found :/</h1>
        <h3>
          Go to the Home Page: <Link to="/"> Home Page</Link>
        </h3>
    </VStack>
    </Flex>
  );
}

export default PageNotFound;

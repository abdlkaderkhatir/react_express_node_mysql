import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { createContext, useEffect, useState } from "react";
import { AuthContext } from "./utils/AuthContext";
import axios from "axios";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import MiniProject from "./pages/MiniProject";

function App() {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    navigate("/login");
  };

  return (
    // <Router>
      <div className="App">
        <AuthContext.Provider value={{ authState, setAuthState }}>
          <Flex color="white" bg={"tomato"} height="70" alignItems={"center"}>
            <Box marginLeft={10} width={300}>
              {/* {authState.status && ( */}
              <>
               <Link to="/"> Home Page</Link>
              <Link to="/createpost"> Create A Post</Link>
              </>
             {/* )} */}
              
            </Box>
            <Spacer />
            <Box marginRight={10} width={300}>
              <Heading display={"inline"} marginRight={10} as="h4" size="md">
                {authState.username}
              </Heading>
              {!authState.status ? (
                <>
                  <Link to="/login"> Login</Link>
                  <Link to="/registration"> Registration</Link>
                </>
              ) : (
                <Button colorScheme="whiteAlpha" size={"md"} onClick={logout}>
                  Logout
                </Button>
              )}
            </Box>
          </Flex>

          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/dif" exact element={<MiniProject/>} />
            <Route path="/createpost" exact element={<CreatePost />} />
            <Route path="/post/:id" exact element={<Post />} />
            <Route path="/registration" exact element={<Registration />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/profile/:id" exact element={<Profile/>} />
            {/* <Route path="/changepassword" exact component={ChangePassword} />*/}
            <Route path="*" exact element={<PageNotFound/>} /> 
          </Routes>
        </AuthContext.Provider>
      </div>
    // </Router>
  );
}

export default App;

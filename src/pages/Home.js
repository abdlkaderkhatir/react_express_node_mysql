import React, { useContext, useEffect, useState } from "react";
// import {Box} from "@chakra-ui/react"
import { Link, useHistory, useNavigate } from "react-router-dom";
import axios from "axios";
import Cardcomponent from "../components/Cardcomponent";
import { Box } from "@chakra-ui/react";
import { AuthContext } from "../utils/AuthContext";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const navigate = useNavigate()
  const { authState,setAuthState } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
          navigate("/login")
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  useEffect(() => {
    // before : (!authState.status)
    if(!localStorage.getItem("accessToken")){
      navigate("/login")
    }
    else{

      axios.get("http://localhost:3001/posts", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }).then((res) => {
        // console.log(res.data);
        setListOfPosts(res.data.listOfPosts);
        setLikedPosts(
           res.data.likedPosts.map((like) => {
            return like.PostId;
          })
        );
      });
    }
  }, []);


  return (
    <div>
       <Box maxW={ 300} m={"20px 30px"} >
       <Cardcomponent listOfPosts={listOfPosts} setListOfPosts={setListOfPosts} likedPosts={likedPosts} setLikedPosts={setLikedPosts} />
       </Box>
    </div>
  );
}

export default Home;

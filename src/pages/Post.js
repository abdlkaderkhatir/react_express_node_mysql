import {
  Box,
  Flex,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Heading,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate()
  const toast =useToast()


  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, []);

  const addComment = () => {
    axios
      .post(
        "http://localhost:3001/comments",
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
          toast({
            title: response.data.error,
            // description: "We've created your account for you.",
            status: 'error',
            duration: 1000,
            isClosable: true,
          })
        } else {
          toast({
            title: 'Comment added.',
            status: 'success',
            duration: 1000,
            isClosable: true,
          })
          const commentToAdd = {
            commentBody: newComment,
            username: response.data.username,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3001/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setComments(
          comments.filter((val) => {
            return val.id != id;
          })
        );
        toast({
          title: 'Comment deleted.',
          status: 'error',
          duration: 1000,
          isClosable: true,
        })
      });
  };

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3001/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        navigate("/");
      });
  };

  return (
    <>
      {/* <div>Post {id}</div> */}

      <Flex margin={30} justify={"space-between"} 
      >
        <Box flex={1} >
          {/* <Box>Left Side</Box> */}
          <Card >
            <CardHeader>
              <Heading size="md">Title : {postObject.title}</Heading>
            </CardHeader>
            <CardBody>
              <Text>Post : {postObject.postText}</Text>
              <Text>Username : {postObject.username}</Text>
            </CardBody>
            <CardFooter>
            {authState.username === postObject.username && (
              <Button
                onClick={() => {
                  deletePost(postObject.id);
                }}
              >
                {" "}
                Delete Post
              </Button>
             )} 
            </CardFooter>
          </Card>
        </Box>
        <Box flex={1} marginLeft={5} >
          {/* <Box>Right Side</Box> */}
          <Box display={"flex"} >
          <Input value={newComment} variant={"outline"} placeholder='Comment ...' onChange={(e)=>{setNewComment(e.target.value)}} />
          <Button marginLeft={5} onClick={addComment}>add Comment</Button>
          </Box>

          <Box>
          {comments.map((comment, key) => {
            return (
              <Box 
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              // textAlign={"start"}
               key={key} border ="1px solid teal" padding={"8px 16px"} marginTop="10px" borderRadius={20}>
                {comment.commentBody}
                {/* <label> Username: {comment.username}</label> */}
                {authState.username === comment.username && (
                  <Button 
                  colorScheme={"red"}
                   size={"xs"}
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                  >
                    delete
                  </Button>
                )}
              </Box>
            );
          })}
          </Box>
         
        </Box>
      </Flex>
    </>
  );
}

export default Post;

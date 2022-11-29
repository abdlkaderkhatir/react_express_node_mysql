import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Text,
  StackDivider,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { TiThumbsUp, TiThumbsDown } from "react-icons/ti";

function Cardcomponent({
  listOfPosts,
  setListOfPosts,
  likedPosts,
  setLikedPosts,
}) {
  let navigate = useNavigate();

  const likeAPost = (postId) => {
    axios
      .post(
        "http://localhost:3001/likes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        // if (response.data.liked) {
        //   alert("you liked post " + postId);
        // }

        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );

        if (likedPosts.includes(postId)) {
          setLikedPosts(
            likedPosts.filter((id) => {
              return id != postId;
            })
          );
        } else {
          setLikedPosts([...likedPosts, postId]);
        }
      });
  };

  return (
    <Card bg={"tomato"}>
      <CardHeader>
        <Heading size="md">List Posts</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {listOfPosts.map((value, key) => {
            return (
              <Box
                border={"1px solid black"}
                key={key}
                onClick={() => navigate(`/post/${value.id}`)}
              >
                <Heading size="xs" textTransform="uppercase">
                  title : {value.title}
                </Heading>
                <Text pt="2" fontSize="sm">
                  text: {value.postText}
                </Text>
              
                  <Text pointerEvents={"visiblePainted"} pt="2" fontSize="sm" onClick={(e)=>{
                      e.stopPropagation()
                      navigate(`/profile/${value.UserId}`)
                  }} >
                    username {">"} {value.username}
                  </Text>
               

                <Box
                  display={"flex"}
                  justifyContent={"flex-end"}
                  alignItems={"center"}
                  padding={2}
                >
                  <TiThumbsUp
                    title="like"
                    color={likedPosts.includes(value.id) ? "blue" : "black"}
                    //  className={
                    //   likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"
                    // }
                    size={30}
                    onClick={(e) => {
                      e.stopPropagation();
                      likeAPost(value.id);
                    }}
                  />
                  {value.Likes.length == 0 ? (
                    <></>
                  ) : (
                    <Text>{value.Likes.length}</Text>
                  )}
                </Box>
              </Box>
            );
          })}
        </Stack>
      </CardBody>
    </Card>
  );
}

export default Cardcomponent;

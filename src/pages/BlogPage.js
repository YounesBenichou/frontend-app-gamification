import React, { useState, useEffect } from "react";

import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography, TextField } from '@mui/material';
// components
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';
// front-app-session 
import { useCookies } from 'react-cookie';
import {AppContext} from '@edx/frontend-platform/react';
import { useContext } from 'react';


// ----------------------------------------------------------------------
const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------
//for api 
import { getConfig } from "@edx/frontend-platform";
import axios from "axios";



// ---------------------------------------------------------------------
export default function BlogPage() {


  // Authenticated user 
  const currentURL = window.location.href;
  const urlWithoutProtocol = currentURL.replace('https://', '');
  const [cookies] = useCookies(['edxloggedin', 'edx-user-info']);

  let userId = '';
  const { authenticatedUser } = useContext(AppContext);
  const user_data = useContext(AppContext);

  if (authenticatedUser) {
    userId = user_data.authenticatedUser.userId;
  }

  // Intialialisation
  const URL_GET_Posts = getConfig().LMS_BASE_URL + "/api/posts/v1/posts/";
  const URL_POST_PostItem = getConfig().LMS_BASE_URL + "/api/posts/v1/posts/create/";
  const URL_GET_Courses = getConfig().LMS_BASE_URL + "/api/courses/v1/courses/";

  const intialPostItem = {
    "author": null,
    "title": null,
    "content": null,
}

// const requestConfig = {
//   headers: { 'Content-Type': 'application/merge-patch+json' },

// };

// const headers = {
//   headers: {
//     'content-type': 'multipart/form-data'
//   }
// }

const [postItem,setPostItem]= React.useState(intialPostItem)


// Fetch posts 

  const [posts, setPosts] = useState(null);
  const update_data = async function () {
    try {
        const result = await axios(URL_GET_Posts);
        setPosts(result.data.results);
        // setPosts(result.data);
        console.log(result.data.results)
    } catch (error) {
        console.log(error);
    }
  };

  // Post Posts

  const submitNewPost = async () => {
    try {
      const result = await axios.post(URL_POST_PostItem,postItem);
    } catch (error) {
        console.log(error);
    }
  }


  // Initial rendering 
  useEffect(() => {
    update_data();
    setPostItem({...postItem, 'author':userId})
    console.log(postItem)
  }, []);
  
  return (
    <>
      <Helmet>
        <title> Dashboard: Blog | Minimal UI </title>
      </Helmet>

      <Container>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Blog
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Post
          </Button>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>

           
           
           {posts &&
              posts.map( item => 
              (
                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                 
                 {items.title}
                
                </Button>
              )
            )}
            
            <Stack mt={5} mb={2} spacing={3}>
              <TextField name="titre" label="titre" placeholder={"Titre"}
                value={postItem.title}
                onChange={(e) => {
                    setPostItem({...postItem, 'title': e.target.value})
              }} />
              <TextField name="content" label="content" placeholder={"Content"}
                value={postItem.content}
                onChange={(e) => {
                  setPostItem({...postItem, 'content': e.target.value})
              }} />
            </Stack>

            <Button variant="contained" onClick={submitNewPost} startIcon={<Iconify icon="eva:plus-fill" />}>
              New Post
            </Button>

          </Typography>
          
        </Stack>
        
        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={POSTS} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>

        <Grid container spacing={3}>
          {POSTS.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </Container>
    </>
  );
}

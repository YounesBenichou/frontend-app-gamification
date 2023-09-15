import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import {Button} from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { getAuthenticatedHttpClient, getAuthenticatedUser } from '@edx/frontend-platform/auth';
import palette from '../../theme/palette';
import { getConfig } from '@edx/frontend-platform';

const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
...theme.typography.body2,
padding: theme.spacing(1),
textAlign: 'center',
color: theme.palette.text.primary,
}));

const badges = [{
  master : '/assets/badges/master.png'
}]

const GridItem = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection : 'row',
  background: 'transparent',
  borderRadius: '20px', 
  justifyContent:'center', 
  alignItems:'center',
  
  // [theme.breakpoints.down('xs')]: {
  //   backgroundColor: 'green', // Style for screens smaller than 'xs'
  // },
}));

const StackItem = styled(Stack)(({ theme }) => ({

  [theme.breakpoints.down('md')]: {
    // backgroundColor: 'yellow', // Style for screens smaller than 'sm'
    flexDirection : 'column',
    padding: '20px',
  },


}));

const TypographyItem = styled(Typography)(({ theme }) => ({
  
  [theme.breakpoints.down('md')]: {
    flexDirection : 'column',
    padding: '10px',
  },
  
}));

export default function ScoreBadge(props) {
  const {name, score, badge, badgeUrl} = props;
  const {handleOpenRoue} = props;
  // const studio_request = async() =>{
  //   const studio = {"org": "OpenCraftXX","display_name": "admin test", "number": "15","course_type":'Blended', 'self_paced':true, "run": "777"}
  //   const URL_POST_UpdateScore = 'http://studio.local.overhang.io:8001/course/'
  //   try{
  //     const result = await axios.get('http://studio.local.overhang.io:8001/csrf/api/v1/token')
  //     const headers = { 
  //         'Content-Type': 'application/json',
  //         'X-CSRFToken': result.data.csrfToken, // Include the CSRF token
  //     }
  //     try {
  //       const { data } = await getAuthenticatedHttpClient().post(
  //         URL_POST_UpdateScore,studio, headers
  //       );
  //       console.log('score update with success',data);

  //     }catch (error) {
  //       console.error('course', error);
  //     }
  //   }catch(error){
  //     console.log("error token", error)
  //   }    
  // }
  // const studio_request = async () => {
  //   const resource_key = "course-v1:AndyWible+101+2023"
  //   const studio = { "course_type": "Hybride", "self_paced": true,  "short_description": "put done for second time inside a function" }
  //   const URL_POST_UpdateScore = 'http://studio.local.overhang.io:8001/course/course-v1:OpenCraftXX+TEST_course+1022'
  //   try {
  //     const result = await axios.get('http://studio.local.overhang.io:8001/csrf/api/v1/token')
  //     const headers = {
  //       'Content-Type': 'application/json',
  //       'X-CSRFToken': result.data.csrfToken, // Include the CSRF token
  //     }
  //     try {
  //       const { data } = await getAuthenticatedHttpClient().delete(
  //         URL_POST_UpdateScore, headers
  //       );
  //       console.log('score update with success', data);
  //     } catch (error) {
  //       console.error('course', error);
  //     }
  //   } catch (error) {
  //     console.log("error token", error)
  //   }


  // }
  // const testapi = async() =>{
  //   try{
  //     const result = await axios.get('http://studio.local.overhang.io:8001/csrf/api/v1/token')
  //     console.log(result.data)
  //   }catch(error){
  //     console.log("error token", error)
  //   }
  // }
  const theme = useTheme();


  return (
    <>
    <Box sx={{ flexGrow: 1 ,
      }} >
      <Grid container spacing={2} sx={{ 
            paddingInline: '10px', 
            paddingY: '20px',
            display: 'flex', 
            justifyContent: "space-between",
            borderRadius: '20px',
            opacity: '0.9',
            // background: 'red',
            boxShadow: '0px 0px 16px 0px rgba(0, 0, 0, 0.15), 0px 0px 10px 0px rgba(0, 0, 0, 0.15)',
            background: `url(/assets/images/triangle-background.svg)`,
           
            
        }} >
        <GridItem xs={12} sm={12} md={3} sx={{background:'#fff', display:'flex', background: 'transparent',borderRadius: '20px', justifyContent:'center', alignItems:'center'}} item>
          <Item sx={{textAlign: 'start',background: 'transparent',}}>
          <StackItem direction="row" alignItems="center" spacing={2}>
              <TypographyItem variant='h6'>
                  Bonjour {name}! <br></br>
              </TypographyItem>
              <Box
                width={140}
                minWidth= {140}
                height={140}
                borderRadius="50%" // Set borderRadius to 50% to create a circle
                // bgcolor="primary.main" // Change to the desired background color
                display="flex"
                justifyContent="center"
                alignItems="center"
                alignContent="center"
                color="#D00000"
                border= "10px solid #D00000"
                >
                  <Typography variant="h4" textAlign="center" gutterBottom>
                      {score} pts
                  </Typography>
            </Box>
          </StackItem> 
          </Item> 
        </GridItem>
        <Grid xs={12} sm={12} md={3} sx={{background:'#fff',background: 'transparent', display:'flex',borderRadius: '20px', justifyContent:'center', alignItems:'center'}} item >     
          <Button variant="contained" onClick={handleOpenRoue} sx={{
            transform: 'scale(1.7)',
            minWidth:'50%',
            borderRadius: '40px',
            textTransform : 'none',
            backgroundColor: palette.red['darker'],
            '&:hover': {
              backgroundColor: palette.red['darker'],
            },
          }}>Tourner la roue !</Button>   
        </Grid>
        
        <GridItem xs={12} sm={12} md={3} sx={{background:'#fff', display:'flex', background: 'transparent',borderRadius: '20px', justifyContent:'center', alignItems:'center'}} item>
          <Item sx={{textAlign: 'start',background: 'transparent',}}>
          <Stack direction="column" justifyContent="center" alignItems="center">
            <img width="170" src={getConfig().LMS_BASE_URL + badgeUrl}/>
            <Typography variant="h4" textAlign="center" gutterBottom>
                {badge}
            </Typography>
          </Stack> 
          </Item> 
        </GridItem>
      </Grid>

    </Box>

    </>
    
  );
} 
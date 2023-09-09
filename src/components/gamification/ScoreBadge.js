import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import {Button} from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
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


export default function ScoreBadge(props) {
  const {name, score, badge, badgeUrl} = props;
  const {handleOpenRoue} = props;
  // const studio_request = async() =>{
  //   const studio = {"org": "OpenCraftXX", "number": "Te9999", "display_name": "Test7", "run": "777"}
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

  // const testapi = async() =>{
  //   try{
  //     const result = await axios.get('http://studio.local.overhang.io:8001/csrf/api/v1/token')
  //     console.log(result.data)
  //   }catch(error){
  //     console.log("error token", error)
  //   }
  // }


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
        <Grid sx={{background:'#fff', display:'flex', background: 'transparent',borderRadius: '20px', justifyContent:'start', alignItems:'center'}} item xs={4}>
          <Item sx={{textAlign: 'start',background: 'transparent',}}>
          <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="h6">
                  Bonjour ! <br></br>{name}
              </Typography>
              <Box
                width={140}
                height={140}
                borderRadius="50%" // Set borderRadius to 50% to create a circle
                // bgcolor="primary.main" // Change to the desired background color
                display="flex"
                justifyContent="center"
                alignItems="center"
                color="#D00000"
                border= "10px solid #D00000"
                >
                  <Typography variant="h4" textAlign="center" gutterBottom>
                      {score} pts
                  </Typography>
            </Box>
            </Stack>
            
             
          </Item> 
        </Grid>
        <Grid sx={{background:'#fff',background: 'transparent', display:'flex',borderRadius: '20px', justifyContent:'center', alignItems:'center'}} item xs={3}>     
          <Button variant="contained" onClick={handleOpenRoue} sx={{
            transform: 'scale(2)',
            borderRadius: '40px',
            textTransform : 'none',
            backgroundColor: palette.red['darker'],
            '&:hover': {
              backgroundColor: palette.red['darker'],
            },
          }}>Tourner la roue !</Button>   
        </Grid>
        <Grid sx={{background:'#fff', background: 'transparent', borderRadius: '20px',paddingRight:'40px', display:'flex', justifyContent:'end', alignItems:'center'}} item xs={4}>
          
          <Item sx={{textAlign: 'start', background: 'transparent',}}>
          <Stack direction="column" justifyContent="center" alignItems="center">
            <img width="170" src={getConfig().LMS_BASE_URL + badgeUrl}/>
            <Typography variant="h4" textAlign="center" gutterBottom>
                {badge}
            </Typography>
          </Stack>
             
          </Item> 
        </Grid>
      </Grid>

    </Box>

    </>
    
  );
} 
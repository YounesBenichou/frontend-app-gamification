import PropTypes from 'prop-types';
// import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
// import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import { Avatar, Box, Card, CardContent, Divider, Stack, Button, SvgIcon, Typography } from '@mui/material';
import palette from '../../theme/palette';
import { getConfig } from '@edx/frontend-platform';
import axios from 'axios';
import { useState } from 'react';

export const AwardCard = (props) => {
  const { userId, award , setScoreinsuffisant} = props;
  const URL_POST_ConvertirScore = getConfig().LMS_BASE_URL + "/api/gamification/v1/handle_award/"+userId+"/"
  const [convertSucess,setConvertSucess] = useState(false)
  const convert_to_award = async ()=>{
    try{
      const result = await axios.post(URL_POST_ConvertirScore+""+award.id+"/")
      if (result.data.message === 'insuficient'){
        setScoreinsuffisant(true)
      }else{
        setConvertSucess(true)
      }

    }catch(error){
      console.log(error)
    }
    
  }
  return (
    <>
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 3
          }}
        >
          <img
            width={'30%'}
            src={getConfig().LMS_BASE_URL+""+award.image}
            variant="square"
          />
        </Box>
        <Typography
          align="center"
          gutterBottom
          variant="h5"
        >
          {award.name}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          {award.description}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <SvgIcon
            color="action"
            fontSize="small"
          >
            {/* <ClockIcon /> */}
          </SvgIcon>
          <Typography
            color="text.secondary"
            display="inline"
            variant="h5"
            sx={{
                color: palette.red['darker']
            }}
          >
            {award.rule} Points
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={4}>
          {convertSucess ? 
          <Button sx={{
            borderRadius: '30px',
            color: 'white'
            }}
            variant="contained" color="success"
            >
            <Typography variant='h6' ml={1} mr={3} noWrap>
            converti 
            </Typography>
            <img width="20" src={'/assets/icons/convert.png'} />
          </Button>
          :
          <Button sx={{
                background: palette.red['darker'],
                borderRadius: '30px',
                color: 'white',
                '&:hover': {
                    background: palette.red['darker'],
                }

            }}
            onClick={convert_to_award}
            >
            
            <Typography variant='h6' ml={2} mr={2} color={'white'} noWrap>
                Convertir
                
            </Typography>
  
          </Button>
          }
          
        </Stack>
       
          
          
      </Stack>
    </Card>
    
    </>
  );
};

AwardCard.propTypes = {
  award: PropTypes.object.isRequired
};

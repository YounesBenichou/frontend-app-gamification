import { Typography, Stack, Button } from '@mui/material';
import WheelComponent from "./WheelComponent";
import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { getConfig } from '@edx/frontend-platform';

// 
import axios from 'axios';

export default function SpinningWheel(props) {
    const {canPlaySpinningWheel ,userId, score} = props

    const segments = [
        '50 pts',
        '40 pts',
        '30 pts',
        '20 pts',
        '15 pts',
        '10 pts',
        '5 pts',
        '1 pts',
      ]
      const segColors = [
        '#EF3B52',
        '#E1E8ED',
        '#EF3B52',
        '#E1E8ED',
        '#EF3B52',
        '#E1E8ED',
        '#EF3B52',
        '#E1E8ED',
      ]
  // contants 
  const URL_PUT_UpdateScore = getConfig().LMS_BASE_URL +  "/api/gamification/v1/modify_score/"+userId+"/"
  const URL_PUT_Spinning_wheel = getConfig().LMS_BASE_URL +  "/api/gamification/v1/user_gamifications/wheel_time_update/"+userId+"/"
  let newScore = score
  // useState
  const [pointsWin, setPointsWin] = useState(null)
  const [showPoints, setShowPoints] = useState(false)
  
  async function update_score(winner){
    let newScore = parseInt(winner) + parseInt(score) 
    if (canPlaySpinningWheel) {
      try {
        const result = await axios.put(URL_PUT_UpdateScore+""+newScore+"/")
        try {
          const currentTime = new Date();
          const result = await axios.put(URL_PUT_Spinning_wheel,{last_time_played_spinningwheel:currentTime.toISOString()})
          setShowPoints(true)
          setPointsWin(winner)
          setPlayed(true)
        } catch(error) {
          console.log(error)
        }
      }catch(err){
        console.log(err)
      }
    }
  };
  const [played, setPlayed] = useState(false)

  return (
    <>
    <Stack direction={'column'}>
    <div style={{display:'flex' , flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
        {!played && 
        <WheelComponent
          segments={segments}
          segColors={segColors}
          onFinished={(winner) => {
              update_score(winner)
          }}
          primaryColor="#FFC702"
          contrastColor="white"
          buttonText=""
          isOnlyOnce={false}
          upDuration={200}
          downDuration={200}
          fontFamily="Arial"
          width="600" 
          height="600"
          canStart={canPlaySpinningWheel}
        />
        }  

    </div>
    <div>
      {(!canPlaySpinningWheel)  && 
          <Stack spacing={2}>
            <Alert severity="error">
              <AlertTitle><Typography variant="h6" gutterBottom> Info </Typography></AlertTitle>
              <Typography variant="h6" gutterBottom>

                Vous pouvez faire tourner la roue et gagner des points seulement une fois toutes les 24 heures. Revenez demain pour tenter à nouveau votre chance de gagner !
              </Typography>
            </Alert>
          </Stack>
        }
        {showPoints && 
          <Stack sx={{ width: '100%' }} justifyContent={'center'} direction={'row'} alignItems={'center'} spacing={2}>
          
              <img src='/assets/pngwing.com.png' width="100" alt={''}></img>

                <Alert severity="success">
                  <Typography variant="h4" gutterBottom>
                    Félicitation, vous avez gagné {pointsWin} !
                  </Typography>
                </Alert>
                

              <img src='/assets/pngwing.com.png' width="100" alt={''}></img>
          </Stack>
        }
    </div>
    </Stack>

    </>
  );
}
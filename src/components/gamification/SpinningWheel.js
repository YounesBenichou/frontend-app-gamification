import { Typography, Stack } from '@mui/material';
import WheelComponent from "./WheelComponent";
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


export default function SpinningWheel() {
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
        '#EE4040',
        '#F0CF50',
        '#815CD1',
        '#3DA5E0',
        '#34A24F',
        '#F9AA1F',
        '#EC3F3F',
        '#FF9000'
      ]
  const [pointsWin, setPointsWin] = useState(null)
  const [canStart, setCanStart] = useState(true)
  const onFinished = (winner) => {
    setPointsWin(winner)
  };
  return (
    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
        <WheelComponent
          segments={segments}
          segColors={segColors}
          onFinished={(winner) => onFinished(winner)}
          primaryColor="black"
          contrastColor="white"
          buttonText="Spin"
          isOnlyOnce={false}
          upDuration={500}
          downDuration={600}
          fontFamily="Arial"
          width="2000" 
          height="2000"
          canStart={false}
        />
        {canStart && 
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">
              <AlertTitle><Typography variant="h6" gutterBottom> Info </Typography></AlertTitle>
              <Typography variant="h6" gutterBottom>

                Vous pouvez faire tourner la roue et gagner des points seulement une fois toutes les 24 heures. Revenez demain pour tenter à nouveau votre chance de gagner !
              </Typography>
            </Alert>
          </Stack>
        }

        
        <Typography variant="h4" mt={5} gutterBottom>
            {pointsWin}
        </Typography>

    </div>
  );
}
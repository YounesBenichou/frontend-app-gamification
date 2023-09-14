import { Helmet } from 'react-helmet-async';
import { useEffect, useState, useRef } from 'react';

// @mui
import { Container,Unstable_Grid2 as Grid, Stack, Box,Typography, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
// components
import Modal from '@mui/material/Modal';

// mock
// style 
import palette from '../theme/palette';
// ----------------------------------------------------------------------
// Djezzy Academy 
import ScoreBadge from '../components/gamification/ScoreBadge';
import LeaderBoard from '../components/gamification/LeaderBoard';
import SpinningWheel from '../components/gamification/SpinningWheel';
import Awards from '../components/gamification/Awards';
import { AwardCard } from '../components/gamification/AwardCard';

// front-app-session 
import { useCookies } from 'react-cookie';
import {AppContext} from '@edx/frontend-platform/react';
import { useContext } from 'react';
import { getConfig } from "@edx/frontend-platform";

// axios
import axios from 'axios';


// 
const styleRoue = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex', 
  justifyContent: "space-between",
  alignItems: 'center',
  borderRadius: '20px',
  border: '0.2px solide black',
  p: 5,
  boxShadow: '0px 0px 16px 0px rgba(0, 0, 0, 0.15), 0px 0px 10px 0px rgba(0, 0, 0, 0.15)',
  backgroundColor: 'white',
};

const styleAward = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex', 
  alignItems: 'start',
  borderRadius: '20px',
  border: '0.2px solide black',
  p: 5,
  overflow: "hidden",
  overflowY: "scroll",
  width: '80%',
  height: '80%',
  maxHeight: '80%',
  boxShadow: '0px 0px 16px 0px rgba(0, 0, 0, 0.15), 0px 0px 10px 0px rgba(0, 0, 0, 0.15)',
  backgroundColor: 'white',
};



export default function GamificationPage() {

    // Authenticated user 
    let userId = '';
    const { authenticatedUser } = useContext(AppContext);
    const user_data = useContext(AppContext);
  
    if (authenticatedUser) {
      userId = user_data.authenticatedUser.userId;
    }
    
    // Objects 
    const currentTime = new Date();
    const timeDifference = null;

    // Contants 
    const URL_GET_UserGamification = getConfig().LMS_BASE_URL + "/api/gamification/v1/user_page/"+userId+"/"
    const URL_GET_LeaderBoard = getConfig().LMS_BASE_URL + "/api/gamification/v1/leaderboard/"+userId+"/"
    const URL_GET_UserAwards = getConfig().LMS_BASE_URL + "/api/gamification/v1/user_awards/"+userId+"/"

    // UseState 
    const [userGamification, setUserGamification ] = useState(null)
    const [userLeaderBord, setUserLeaderBord ] = useState(null)
    const [canPlaySpinningWheel, setCanPlaySpinningWheel] = useState(false)
    const [last_time_played_spinningwheel,setLast_time_played_spinningwheel] = useState(null);
    const [userAwards, setUserAwards ] = useState(null)
    const [awards, setAwards] = useState(null)

    const[scoreinsuffisant,setScoreinsuffisant] = useState(false)
    // functions : 
    const userGamificationInit = async ()=> {
      try {
        const result = await axios.get(URL_GET_UserGamification) 
        setUserGamification(result.data)
        setLast_time_played_spinningwheel(new Date(result.data.last_time_played_spinningwheel.last_time_played_spinningwheel))
        try {
          const result_leaderbord = await axios.get(URL_GET_LeaderBoard) 
          setUserLeaderBord(result_leaderbord.data)
          try{
            const result_awards = await axios.get(URL_GET_UserAwards)
            setAwards(result_awards.data.all_awards)
            setUserAwards(result_awards.data.my_awards)
          }catch(error){
            console.log(error)
          }
        }catch(error){
          console.log(error)
        }

      }catch (error) {
        console.log(error)
      }
    }

    // useRef 
    const awardRef = useRef(null)
    // Modal
  const [openRoue, setOpenRoue] = useState(false);
  const handleOpenRoue = () => {
    const timeDifference = currentTime - last_time_played_spinningwheel;
    const hoursDifference = timeDifference / (1000 * 60 * 60);
    if (Math.abs(hoursDifference) > 24) {
      setCanPlaySpinningWheel(true)
    } else {
      setCanPlaySpinningWheel(false)
    }
    setOpenRoue(true)
  }
  const handleCloseRoue = () => {
    userGamificationInit()  
    setOpenRoue(false)
  };

  const [openAward, setOpenAward] = useState(false);
  const handleOpenAward = () => setOpenAward(true);
  const handleCloseAward = () => {
    userGamificationInit() 
    setScoreinsuffisant(false)
    setOpenAward(false)
  }

  
  
  // award 
  // const awards = [
  //   {
  //     id: '2569ce0d517a7f06d3ea1f24',
  //     createdAt: '27/03/2019',
  //     description: 'Cours sur Amazon Web Services - AWS Cloud Practitioner Essentials',
  //     logo: '/assets/award.webp',
  //     title: 'Fomration sur AWS',
  //     points: '594'
  //   },
  //   {
  //     id: '2569ce0d517a7f06d3ea1f24',
  //     createdAt: '27/03/2019',
  //     description: 'Cours sur Amazon Web Services - AWS Cloud Practitioner Essentials',
  //     logo: '/assets/award.webp',
  //     title: 'Fomration sur AWS',
  //     points: '594'
  //   },
  //   {
  //     id: '2569ce0d517a7f06d3ea1f24',
  //     createdAt: '27/03/2019',
  //     description: 'Cours sur Amazon Web Services - AWS Cloud Practitioner Essentials',
  //     logo: '/assets/award.webp',
  //     title: 'Fomration sur AWS',
  //     points: '594'
  //   },
  //   {
  //     id: '2569ce0d517a7f06d3ea1f24',
  //     createdAt: '27/03/2019',
  //     description: 'Cours sur Amazon Web Services - AWS Cloud Practitioner Essentials',
  //     logo: '/assets/award.webp',
  //     title: 'Fomration sur AWS',
  //     points: '594'
  //   },
  // ];

  // UseEffect  : 
  useEffect(()=>{
    userGamificationInit()
  },[])
  return (
    <>
      <Helmet>
        <title> Mes accomplissements </title>
      </Helmet>
        <div>
          <img src={'/assets/background-layers.svg'} style={{
            position: 'absolute',
            right: '-17%',
            top: '30%',
            width: '35%',
            }}>
          </img>
        </div>
        <div>
          <img src={'/assets/background-layers.svg'} style={{
            position: 'absolute',
            left: '-17%',    
            top: '18%',  
            width: '35%',      
          }}></img>
        </div>

        
        
     { userGamification ? ( 
      <Container>
        <ScoreBadge name={user_data.authenticatedUser.name} score={userGamification.user_score.score}
        badge={userGamification.last_created_badge.name} badgeUrl={userGamification.last_created_badge.badge_image}
        handleOpenRoue={handleOpenRoue}
        ></ScoreBadge>

        <Stack direction="row" alignItems="center" justifyContent="space-between" my={5}>
          <Typography variant="h4" gutterBottom>
            LeaderBoard
          </Typography>
        </Stack>
        <LeaderBoard userLeaderBord={userLeaderBord}></LeaderBoard>
        
        <Stack direction="row" alignItems="center" justifyContent="space-between" my={5}>
        <Typography variant="h4" gutterBottom>
            Cadeaux
          </Typography>
          
          <Button sx={{background: palette.red['darker'],
            '&:hover': {
              backgroundColor: palette.red['darker'],
            },
            }} 
            onClick={handleOpenAward} variant="contained" >
            convertir en cadeaux
          </Button>
        </Stack>
        <Awards userAwards={userAwards}></Awards>

        <Modal
          open={openRoue}
          onClose={handleCloseRoue}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleRoue}>
            <SpinningWheel canPlaySpinningWheel={canPlaySpinningWheel}  score={userGamification.user_score.score} userId={user_data.authenticatedUser.userId}></SpinningWheel>
          </Box>
        </Modal>

        <Modal
        open={openAward}
        onClose={handleCloseAward}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleAward}>
        {awards && 
        <Grid
            container
            spacing={3}
          >
            {scoreinsuffisant ? 
                <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert severity="error">
                    <AlertTitle><Typography variant="h6" gutterBottom> Info </Typography></AlertTitle>
                    <Typography variant="h6" gutterBottom>
                      Score insuffisant pour recevoir cette récompense
                    </Typography>
                  </Alert>
                </Stack>
                : <></>
              }

            {awards.map((award) => (
              <Grid
                xs={12}
                md={6}
                lg={4}
                key={award.id}
              >
                <AwardCard userId={userId} setScoreinsuffisant={setScoreinsuffisant} award={award} />
                
              </Grid>
            ))}
          </Grid>
          }
        </Box>
      </Modal>
      </Container>
     ) : (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
      )
      }
    </>
  );
}

import { Helmet } from 'react-helmet-async';
import { useState } from 'react';

// @mui
import { Container,Unstable_Grid2 as Grid, Stack, Box,Typography, Button } from '@mui/material';
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
  justifyContent: "space-between",
  alignItems: 'center',
  borderRadius: '20px',
  border: '0.2px solide black',
  p: 5,
  width: '60%',
  boxShadow: '0px 0px 16px 0px rgba(0, 0, 0, 0.15), 0px 0px 10px 0px rgba(0, 0, 0, 0.15)',
  backgroundColor: 'white',
};


export default function GamificationPage() {
  const [openRoue, setOpenRoue] = useState(false);
  const handleOpenRoue = () => setOpenRoue(true);
  const handleCloseRoue = () => setOpenRoue(false);

  const [openAward, setOpenAward] = useState(false);
  const handleOpenAward = () => setOpenAward(true);
  const handleCloseAward = () => setOpenAward(false);

  
  
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  // award 
  const awards = [
    {
      id: '2569ce0d517a7f06d3ea1f24',
      createdAt: '27/03/2019',
      description: 'Cours sur Amazon Web Services - AWS Cloud Practitioner Essentials',
      logo: '/assets/award.webp',
      title: 'Fomration sur AWS',
      points: '594'
    },
    {
      id: '2569ce0d517a7f06d3ea1f24',
      createdAt: '27/03/2019',
      description: 'Cours sur Amazon Web Services - AWS Cloud Practitioner Essentials',
      logo: '/assets/award.webp',
      title: 'Fomration sur AWS',
      points: '594'
    },
    {
      id: '2569ce0d517a7f06d3ea1f24',
      createdAt: '27/03/2019',
      description: 'Cours sur Amazon Web Services - AWS Cloud Practitioner Essentials',
      logo: '/assets/award.webp',
      title: 'Fomration sur AWS',
      points: '594'
    },
    {
      id: '2569ce0d517a7f06d3ea1f24',
      createdAt: '27/03/2019',
      description: 'Cours sur Amazon Web Services - AWS Cloud Practitioner Essentials',
      logo: '/assets/award.webp',
      title: 'Fomration sur AWS',
      points: '594'
    },
  ];
  return (
    <>
      <Helmet>
        <title> Mes accomplissements </title>
      </Helmet>
      
      <img src={'/assets/background-layers.svg'} style={{
        position: 'absolute',
        left: '-20%'
      }}>
      </img>
      <img src={'/assets/background-layers.svg'} style={{
        position: 'absolute',
        left: '85%',
        top: '20%'
      }}></img>
      
      <Container>
      
        <ScoreBadge></ScoreBadge>

        <Stack direction="row" alignItems="center" justifyContent="space-between" my={5}>
          <Typography variant="h4" gutterBottom>
            LeaderBoard
          </Typography>
          <Button sx={{background: palette.red['darker'],
            '&:hover': {
              backgroundColor: palette.red['darker'],
            },
            }}  
            onClick={handleOpenRoue} variant="contained" >
            Jouer la roue
          </Button>
        </Stack>
        <LeaderBoard></LeaderBoard>
        
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
        <Awards></Awards>

        <Modal
          open={openRoue}
          onClose={handleCloseRoue}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleRoue}>
            <SpinningWheel></SpinningWheel>
          </Box>
        </Modal>

        <Modal
        open={openAward}
        onClose={handleCloseAward}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleAward}>
        <Grid
            container
            spacing={3}
          >
            {awards.map((award) => (
              <Grid
                xs={12}
                md={6}
                lg={4}
                key={award.id}
              >
                <AwardCard award={award} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Modal>
      </Container>
      
    </>
  );
}

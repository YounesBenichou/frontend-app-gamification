import { Helmet } from 'react-helmet-async';
import { useState } from 'react';

// @mui
import { Container, Stack, Box,Typography, Button } from '@mui/material';
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


// 
const style = {
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
  // background: `url(/assets/images/triangle-background.svg)`,
  backgroundColor: 'white',
};

class Car extends SpinningWheel {
  render() {
    return <h2>Hi, I am a Car!</h2>;
  }
}

export default function GamificationPage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <Helmet>
        <title> Mes accomplissements </title>
      </Helmet>

      <Container>
        <ScoreBadge></ScoreBadge>

        <Stack direction="row" alignItems="center" justifyContent="space-between" my={5}>
          <Typography variant="h4" gutterBottom>
            LeaderBoard
          </Typography>
          <Button sx={{background: palette.red['darker']}} onClick={handleOpen} variant="contained" >
            Jouer la roue
          </Button>
        </Stack>
        <LeaderBoard></LeaderBoard>
        
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <SpinningWheel></SpinningWheel>
          </Box>
        </Modal>
      </Container>
    </>
  );
}

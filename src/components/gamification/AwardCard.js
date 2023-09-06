import PropTypes from 'prop-types';
// import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
// import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import { Avatar, Box, Card, CardContent, Divider, Stack, Button, SvgIcon, Typography } from '@mui/material';
import palette from '../../theme/palette';

export const AwardCard = (props) => {
  const { award } = props;

  return (
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
            src={award.logo}
            variant="square"
          />
        </Box>
        <Typography
          align="center"
          gutterBottom
          variant="h5"
        >
          {award.title}
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
            {award.points} Points
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={4}>
            
            <Button sx={{
                background: palette.red['darker'],
                borderRadius: '30px',
                color: 'white',
                '&:hover': {
                    background: palette.red['darker'],
                }

            }}
            >
            
            <Typography variant='h6' ml={1} mr={3} noWrap>
                Convertir
            </Typography>
            <img width="20" src={'/assets/icons/convert.png'} />
          </Button>
        </Stack>
       
          
          
      </Stack>
    </Card>
  );
};

AwardCard.propTypes = {
  award: PropTypes.object.isRequired
};

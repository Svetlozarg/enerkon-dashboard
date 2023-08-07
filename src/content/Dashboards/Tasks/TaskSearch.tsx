import { useRef, useState } from 'react';
import {
  Button,
  Card,
  Grid,
  Box,
  FormControl,
  CardActions,
  Typography,
  Divider,
  OutlinedInput,
  Pagination,
  InputAdornment,
  Menu,
  MenuItem,
  styled,
  useTheme
} from '@mui/material';
import { formatDistance, subDays } from 'date-fns';
import TodayTwoToneIcon from '@mui/icons-material/TodayTwoTone';
import Link from 'src/components/Link';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Text from 'src/components/Text';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
    padding-right: ${theme.spacing(0.7)}
`
);

function TaskSearch() {
  const theme = useTheme();

  const periods = [
    {
      value: 'popular',
      text: 'Популярност'
    },
    {
      value: 'recent',
      text: 'Най-нови'
    },
    {
      value: 'updated',
      text: 'Последно прегледани'
    },
    {
      value: 'oldest',
      text: 'Най-стари'
    }
  ];

  const actionRef1 = useRef<any>(null);
  const [openPeriod, setOpenMenuPeriod] = useState<boolean>(false);
  const [period, setPeriod] = useState<string>(periods[0].text);

  return (
    <>
      <FormControl variant="outlined" fullWidth>
        <OutlinedInputWrapper
          type="text"
          placeholder="Търси по заглавие на проект..."
          endAdornment={
            <InputAdornment position="end">
              <Button variant="contained" size="small">
                Търси
              </Button>
            </InputAdornment>
          }
          startAdornment={
            <InputAdornment position="start">
              <SearchTwoToneIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      <Box
        py={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="subtitle2">
            Налични{' '}
            <Text color="black">
              <b>57 проекти</b>
            </Text>
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography
            variant="subtitle2"
            sx={{
              pr: 1
            }}
          >
            Филтър:
          </Typography>
          <Button
            size="small"
            variant="outlined"
            ref={actionRef1}
            onClick={() => setOpenMenuPeriod(true)}
            endIcon={<ExpandMoreTwoToneIcon fontSize="small" />}
          >
            {period}
          </Button>
          <Menu
            disableScrollLock
            anchorEl={actionRef1.current}
            onClose={() => setOpenMenuPeriod(false)}
            open={openPeriod}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            {periods.map((_period) => (
              <MenuItem
                key={_period.value}
                onClick={() => {
                  setPeriod(_period.text);
                  setOpenMenuPeriod(false);
                }}
              >
                {_period.text}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>

      {/* Porjects */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card
            variant="outlined"
            sx={{
              p: 3,
              background: `${theme.colors.alpha.black[5]}`
            }}
          >
            <Link href="#" variant="h3" color="text.primary">
              Име на проект
            </Link>

            <Box
              sx={{
                width: '100%',
                height: '200px',
                bgcolor: 'gray',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '10px',
                my: '.5rem'
              }}
            >
              <ImageNotSupportedIcon sx={{ fontSize: '10rem' }} />
            </Box>

            <Typography
              sx={{
                pb: 2
              }}
              color="text.secondary"
            >
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout beatae
              vitae dicta sunt explicabo.
            </Typography>
            <Button size="small" variant="contained">
              Прегледай проект
            </Button>
            <Divider
              sx={{
                my: 2
              }}
            />
            <CardActions
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Typography
                display="flex"
                alignItems="center"
                variant="subtitle2"
              >
                <TodayTwoToneIcon
                  sx={{
                    mr: 1
                  }}
                />
                {formatDistance(subDays(new Date(), 24), new Date(), {
                  addSuffix: true
                })}
              </Typography>
              <Typography
                display="flex"
                alignItems="center"
                variant="subtitle2"
              >
                24 файла
              </Typography>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            variant="outlined"
            sx={{
              p: 3,
              background: `${theme.colors.alpha.black[5]}`
            }}
          >
            <Link href="#" variant="h3" color="text.primary">
              Име на проект
            </Link>

            <Box
              sx={{
                width: '100%',
                height: '200px',
                bgcolor: 'gray',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '10px',
                my: '.5rem'
              }}
            >
              <ImageNotSupportedIcon sx={{ fontSize: '10rem' }} />
            </Box>

            <Typography
              sx={{
                pb: 2
              }}
              color="text.secondary"
            >
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout beatae
              vitae dicta sunt explicabo.
            </Typography>
            <Button size="small" variant="contained">
              Прегледай проект
            </Button>
            <Divider
              sx={{
                my: 2
              }}
            />
            <CardActions
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Typography
                display="flex"
                alignItems="center"
                variant="subtitle2"
              >
                <TodayTwoToneIcon
                  sx={{
                    mr: 1
                  }}
                />
                {formatDistance(subDays(new Date(), 24), new Date(), {
                  addSuffix: true
                })}
              </Typography>
              <Typography
                display="flex"
                alignItems="center"
                variant="subtitle2"
              >
                24 файла
              </Typography>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            variant="outlined"
            sx={{
              p: 3,
              background: `${theme.colors.alpha.black[5]}`
            }}
          >
            <Link href="#" variant="h3" color="text.primary">
              Име на проект
            </Link>

            <Box
              sx={{
                width: '100%',
                height: '200px',
                bgcolor: 'gray',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '10px',
                my: '.5rem'
              }}
            >
              <ImageNotSupportedIcon sx={{ fontSize: '10rem' }} />
            </Box>

            <Typography
              sx={{
                pb: 2
              }}
              color="text.secondary"
            >
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout beatae
              vitae dicta sunt explicabo.
            </Typography>
            <Button size="small" variant="contained">
              Прегледай проект
            </Button>
            <Divider
              sx={{
                my: 2
              }}
            />
            <CardActions
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Typography
                display="flex"
                alignItems="center"
                variant="subtitle2"
              >
                <TodayTwoToneIcon
                  sx={{
                    mr: 1
                  }}
                />
                {formatDistance(subDays(new Date(), 24), new Date(), {
                  addSuffix: true
                })}
              </Typography>
              <Typography
                display="flex"
                alignItems="center"
                variant="subtitle2"
              >
                24 файла
              </Typography>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      {/* Pagination */}
      <Box
        sx={{
          pt: 4
        }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Pagination
          showFirstButton
          showLastButton
          count={15}
          defaultPage={6}
          siblingCount={0}
          size="large"
          shape="rounded"
          color="primary"
        />
      </Box>
    </>
  );
}

export default TaskSearch;

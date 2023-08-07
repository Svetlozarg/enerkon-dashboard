import { useRef, useState } from 'react';
import {
  Button,
  Box,
  Menu,
  alpha,
  MenuItem,
  Typography,
  styled,
  useTheme
} from '@mui/material';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import { Chart } from 'src/components/Chart';
import type { ApexOptions } from 'apexcharts';

const DotPrimaryLight = styled('span')(
  ({ theme }) => `
    border-radius: 22px;
    background: ${theme.colors.primary.lighter};
    width: ${theme.spacing(1.5)};
    height: ${theme.spacing(1.5)};
    display: inline-block;
    margin-right: ${theme.spacing(0.5)};
`
);

const DotPrimary = styled('span')(
  ({ theme }) => `
    border-radius: 22px;
    background: ${theme.colors.primary.main};
    width: ${theme.spacing(1.5)};
    height: ${theme.spacing(1.5)};
    display: inline-block;
    margin-right: ${theme.spacing(0.5)};
`
);

function TasksAnalytics() {
  const theme = useTheme();

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      type: 'bar',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 6,
        columnWidth: '35%'
      }
    },
    colors: [theme.colors.primary.main, alpha(theme.colors.primary.main, 0.5)],
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1
    },
    theme: {
      mode: theme.palette.mode
    },
    stroke: {
      show: true,
      width: 3,
      colors: ['transparent']
    },
    legend: {
      show: false
    },
    labels: [
      'Яну',
      'Фев',
      'Мар',
      'Апр',
      'Май',
      'Юни',
      'Юли',
      'Авг',
      'Сеп',
      'Окт',
      'Ное',
      'Дек'
    ],
    grid: {
      strokeDashArray: 5,
      borderColor: theme.palette.divider
    },
    xaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    yaxis: {
      tickAmount: 6,
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    tooltip: {
      x: {
        show: false
      },
      marker: {
        show: false
      },
      y: {
        formatter: function (val) {
          return '$ ' + val + 'k';
        }
      },
      theme: 'dark'
    }
  };

  const chartData = [
    {
      name: 'Общо проекти',
      data: [28, 47, 41, 34, 69, 91, 49, 82, 52, 72, 32, 99]
    },
    {
      name: 'Общо файлове',
      data: [38, 85, 64, 40, 97, 82, 58, 42, 55, 46, 57, 70]
    }
  ];

  const periods = [
    {
      value: 'today',
      text: 'Днес'
    },
    {
      value: 'yesterday',
      text: 'Вчера'
    },
    {
      value: 'last_month',
      text: 'Последният месец'
    },
    {
      value: 'last_year',
      text: 'Последната година'
    }
  ];

  const actionRef1 = useRef<any>(null);
  const [openPeriod, setOpenMenuPeriod] = useState<boolean>(false);
  const [period, setPeriod] = useState<string>(periods[3].text);

  return (
    <Box>
      <Box
        mb={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h4">Общ Анализ</Typography>
        <Button
          size="small"
          variant="contained"
          color="secondary"
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
      <Box display="flex" alignItems="center" pb={2}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: 'flex',
            alignItems: 'center',
            mr: 2
          }}
        >
          <DotPrimary />
          Общо проекти
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <DotPrimaryLight />
          Общо файлове
        </Typography>
      </Box>
      <Chart
        options={chartOptions}
        series={chartData}
        type="bar"
        height={270}
      />
    </Box>
  );
}

export default TasksAnalytics;

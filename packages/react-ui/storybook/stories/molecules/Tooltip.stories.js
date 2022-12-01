import React from 'react';
import { Box, Grid, IconButton, Tooltip } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';
import makeStyles from '@mui/styles/makeStyles';
import { commonPalette } from '../../../src/theme/sections/palette';
import TooltipData from '../../../src/components/organisms/TooltipData';
import Typography from '../../../src/components/atoms/Typography';
import Button from '../../../src/components/atoms/Button';

const options = {
  title: 'Molecules/Tooltip',
  component: Tooltip,
  argTypes: {
    title: {
      control: {
        type: 'text'
      }
    },
    placement: {
      control: {
        type: 'select',
        options: ['top', 'left', 'right', 'bottom']
      }
    },
    arrow: {
      control: {
        type: 'boolean'
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1534%3A36257'
    },
    status: {
      type: 'validated'
    }
  }
};
export default options;

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(4)
  },
  standalone: {
    display: 'flex',
    justifyContent: 'center'
  },
  label: {
    minWidth: '200px'
  }
}));

const TooltipBox = ({ title, ...args }) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Typography variant='body2' className={classes.label}>
        {title}
      </Typography>

      <Tooltip {...args} title={title}>
        <IconButton>
          <InfoOutlined />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

const TooltipPlaygroundTemplate = (args) => {
  const classes = useStyles();

  return (
    <Box className={classes.standalone}>
      <Tooltip {...args}>
        <IconButton>
          <InfoOutlined />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

const TooltipTextTemplate = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Tooltip title='Tooltip'>
            <IconButton>
              <InfoOutlined />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={4}>
          <Tooltip
            title='This is an example to show that 
tooltip text can be longer.'
          >
            <IconButton>
              <InfoOutlined />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
};

const dataTooltip1 = [
  {
    value: 123000
  }
];
const dataTooltip2 = [
  {
    value: 123000
  },
  {
    value: 123000,
    color: commonPalette.qualitative.bold[6]
  },
  {
    value: 123000,
    color: commonPalette.qualitative.bold[9]
  }
];
const dataTooltip3 = [
  {
    category: 'Category 1',
    value: 123000,
    outlinedBullet: true
  }
];
const dataTooltip4 = [
  {
    category: 'Category 1',
    value: 123000,
    outlinedBullet: true
  },
  {
    category: 'Category 2',
    value: 123000,
    outlinedBullet: true,
    color: commonPalette.qualitative.bold[6]
  },
  {
    category: 'Category 3',
    value: 123000,
    outlinedBullet: true,
    color: commonPalette.qualitative.bold[9]
  }
];

const TooltipDataTemplate = () => {
  return (
    <Grid container justifyContent='space-between' spacing={2}>
      <Grid item>
        <Tooltip title={<TooltipData title='Title' items={dataTooltip1} />}>
          <IconButton>
            <InfoOutlined />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title={<TooltipData title='Title' items={dataTooltip2} />}>
          <IconButton>
            <InfoOutlined />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title={<TooltipData title='Title' items={dataTooltip3} />}>
          <IconButton>
            <InfoOutlined />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title={<TooltipData title='Title' items={dataTooltip4} />}>
          <IconButton>
            <InfoOutlined />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

const TooltipArrowTemplate = (args) => {
  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <TooltipBox {...args} title='No arrow' arrow={false} />
      </Grid>
      <Grid item>
        <TooltipBox {...args} title='Tooltip with arrow' />
      </Grid>
    </Grid>
  );
};

const TooltipPositionTemplate = (args) => {
  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <TooltipBox {...args} title='Tooltip top' />
      </Grid>
      <Grid item>
        <TooltipBox {...args} title='Tooltip right' placement='right' />
      </Grid>
      <Grid item>
        <TooltipBox {...args} title='Tooltip left' placement='left' />
      </Grid>
      <Grid item>
        <TooltipBox {...args} title='Tooltip bottom' placement='bottom' />
      </Grid>
    </Grid>
  );
};

const TooltipBehaviorTemplate = (args) => {
  const classes = useStyles();

  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <TooltipBox {...args} title='Default' />
      </Grid>

      <Grid item>
        <Box className={classes.container}>
          <Typography variant='body2' className={classes.label}>
            {'Follow cursor'}
          </Typography>

          <Tooltip
            {...args}
            followCursor
            arrow={false}
            title='When followCursor is true, Tooltip should have arrow={false} property too'
          >
            <Button variant='outlined'>{'Long Button'}</Button>
          </Tooltip>
        </Box>
      </Grid>
    </Grid>
  );
};

export const Playground = TooltipPlaygroundTemplate;
Playground.args = { title: 'Text' };

export const Text = TooltipTextTemplate.bind({});

export const Data = TooltipDataTemplate.bind({});

export const Arrow = TooltipArrowTemplate.bind({});

export const Position = TooltipPositionTemplate.bind({});

export const Behavior = TooltipBehaviorTemplate.bind({});
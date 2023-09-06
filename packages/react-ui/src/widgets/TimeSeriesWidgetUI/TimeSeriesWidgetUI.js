import React, { useMemo, useCallback } from 'react';
import { Box, Link, useTheme, styled } from '@mui/material';
import PropTypes from 'prop-types';

import { GroupDateTypes } from '@carto/react-core';

import TimeSeriesChart from './components/TimeSeriesChart';
import TimeSeriesLegend from './components/TimeSeriesLegend';
import { TimeSeriesProvider, useTimeSeriesContext } from './hooks/TimeSeriesContext';
import { CHART_TYPES } from './utils/constants';
import Typography from '../../components/atoms/Typography';
import TimeSeriesSkeleton from './components/TimeSeriesSkeleton';
import { formatTimeRange, formatBucketRange } from './utils/timeFormat';
import { getColorByCategory } from '../utils/colorUtils';
import { commonPalette } from '../../theme/sections/palette';
import { TimeSeriesControls } from './components/TimeSeriesControls';

const BoxVert = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column'
}));

const BoxHorz = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row'
}));

const ControlsBox = styled(Box)(({ theme }) => ({
  flexShrink: 0,
  paddingLeft: theme.spacing(1),
  paddingBottom: theme.spacing(3),
  alignSelf: 'flex-end'
}));

const ChartBox = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: 0,
  paddingLeft: theme.spacing(2.5)
}));

function TimeSeriesWidgetUI({
  data,
  stepSize,
  stepMultiplier = 1,
  chartType,
  tooltip,
  tooltipFormatter,
  formatter,
  height,
  showControls,
  animation,
  timelinePosition,
  onTimelineUpdate,
  timeWindow,
  onTimeWindowUpdate,
  selectedCategories,
  onSelectedCategoriesChange,
  isPlaying,
  onPlay,
  isPaused,
  onPause,
  onStop,
  isLoading,
  palette,
  showLegend
}) {
  if (isLoading) return <TimeSeriesSkeleton height={height} />;

  return (
    <TimeSeriesProvider
      isPlaying={isPlaying}
      onPlay={onPlay}
      isPaused={isPaused}
      onPause={onPause}
      onStop={onStop}
      timelinePosition={timelinePosition}
      onTimelineUpdate={onTimelineUpdate}
      timeWindow={timeWindow}
      onTimeWindowUpdate={onTimeWindowUpdate}
    >
      <TimeSeriesWidgetUIContent
        data={data}
        stepSize={stepSize}
        stepMultiplier={stepMultiplier}
        chartType={chartType}
        tooltip={tooltip}
        tooltipFormatter={tooltipFormatter}
        formatter={formatter}
        height={height}
        showControls={showControls}
        animation={animation}
        palette={palette}
        showLegend={showLegend}
        selectedCategories={selectedCategories}
        onSelectedCategoriesChange={onSelectedCategoriesChange}
      />
    </TimeSeriesProvider>
  );
}

TimeSeriesWidgetUI.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.number,
      value: PropTypes.number,
      category: PropTypes.string
    })
  ).isRequired,
  stepSize: PropTypes.oneOf(Object.values(GroupDateTypes)).isRequired,
  stepMultiplier: PropTypes.number,
  chartType: PropTypes.oneOf(Object.values(CHART_TYPES)),
  tooltip: PropTypes.bool,
  tooltipFormatter: PropTypes.func,
  formatter: PropTypes.func,
  height: PropTypes.string,
  animation: PropTypes.bool,
  isPlaying: PropTypes.bool,
  onPlay: PropTypes.func,
  isPaused: PropTypes.bool,
  onPause: PropTypes.func,
  onStop: PropTypes.func,
  timelinePosition: PropTypes.number,
  onTimelineUpdate: PropTypes.func,
  timeWindow: PropTypes.arrayOf(PropTypes.any),
  onTimeWindowUpdate: PropTypes.func,
  showControls: PropTypes.bool,
  isLoading: PropTypes.bool,
  palette: PropTypes.arrayOf(PropTypes.string),
  showLegend: PropTypes.bool
};

TimeSeriesWidgetUI.defaultProps = {
  data: [],
  chartType: CHART_TYPES.LINE,
  tooltip: true,
  tooltipFormatter: defaultTooltipFormatter,
  formatter: (value) => value,
  animation: true,
  isPlaying: false,
  isPaused: false,
  timelinePosition: 0,
  timeWindow: [],
  showControls: true,
  isLoading: false,
  palette: Object.values(commonPalette.qualitative.bold)
};

export default TimeSeriesWidgetUI;

// Content is splitted from the default
// component to be able to use context
function TimeSeriesWidgetUIContent({
  data,
  stepSize,
  stepMultiplier,
  chartType,
  tooltip,
  tooltipFormatter,
  formatter,
  height,
  showControls,
  animation,
  palette,
  selectedCategories,
  onSelectedCategoriesChange,
  showLegend
}) {
  const theme = useTheme();
  const fallbackColor = theme.palette.secondary.main;

  // const [anchorSpeedEl, setAnchorSpeedEl] = useState(null);
  // const [speed, setSpeed] = useState(1);
  const { isPlaying, isPaused, timeWindow, timelinePosition, stop } =
    useTimeSeriesContext();

  const { series, categories } = useMemo(() => {
    const series = [];

    const categories = [];
    const colorMapping = {};

    // TODO: decide if we use common model for multiple series and splitByCategory
    // as `splitByCategory` is less optimal and with common model we have "join" and then "split" data
    // why common model?
    // some other commponents are relying on old layout of data

    // const firstSerieEntry = data[0];
    // if (
    //   firstSerieEntry &&
    //   Array.isArray(firstSerieEntry.data) &&
    //   firstSerieEntry.category
    // ) {
    //   // multiple series model
    //   // array of objects {data, category}
    //   for (const { data: seriesDataRaw, category } of data) {
    //     categories.push(category);
    //     series.push({
    //       category,
    //       data: seriesDataRaw.map(({ name, value }) => [name, value])
    //     });
    //   }
    // } else {

    // splitByCategory model
    // one array, with category embedded: { name: 1009843200000, category: 'DECEPTIVE PRACTICE', value: 6 }
    for (const { name, value, category } of data) {
      let dataSeriesIndex = category ? categories.indexOf(category) : 0;
      if (dataSeriesIndex === -1) {
        dataSeriesIndex = categories.length;
        categories.push(category);
      }
      if (!series[dataSeriesIndex]) {
        series[dataSeriesIndex] = {
          category,
          data: []
        };
      }
      series[dataSeriesIndex].data.push([name, value]);
    }
    // }

    series.forEach(({ category }, i) => {
      series[i].color = getColorByCategory(category, {
        palette,
        fallbackColor,
        colorMapping
      });
    });

    return { series, categories };
  }, [data, palette, fallbackColor]);

  const currentDate = useMemo(() => {
    if (!data.length) {
      return '';
    }

    // If timeWindow is activated
    if (timeWindow.length) {
      const [start, end] = timeWindow.map((time) => new Date(time));
      return formatTimeRange({ start, end, stepSize });
    }

    // If widget is reset, then first and last date
    if (!isPlaying && !isPaused) {
      const start = new Date(data[0].name);
      const end = new Date(data[data.length - 1].name);

      return formatTimeRange({ start, end, stepSize });
    }

    // If animation is active
    if (timelinePosition >= 0 && data[timelinePosition]) {
      const currentDate = new Date(data[timelinePosition].name);
      return formatBucketRange({ date: currentDate, stepSize, stepMultiplier });
    }
  }, [data, timeWindow, isPlaying, isPaused, timelinePosition, stepSize, stepMultiplier]);

  const showClearButton = useMemo(() => {
    return (
      isPlaying || isPaused || timeWindow.length > 0 || selectedCategories?.length > 0
    );
  }, [isPaused, isPlaying, selectedCategories?.length, timeWindow.length]);

  const handleStop = () => {
    stop();
    onSelectedCategoriesChange?.([]);
  };
  const handleCategoryClick = useCallback(
    (category) => {
      if (onSelectedCategoriesChange) {
        const newSelectedCategories = [...selectedCategories];

        const selectedCategoryIdx = newSelectedCategories.indexOf(category);
        if (selectedCategoryIdx === -1) {
          newSelectedCategories.push(category);
        } else {
          newSelectedCategories.splice(selectedCategoryIdx, 1);
        }

        onSelectedCategoriesChange(newSelectedCategories);
      }
    },
    [onSelectedCategoriesChange, selectedCategories]
  );

  const isLegendVisible = Boolean(
    showLegend !== undefined ? showLegend : series.length > 1
  );

  const chart = (
    <TimeSeriesChart
      chartType={chartType}
      data={data}
      series={series}
      categories={categories}
      tooltip={tooltip}
      formatter={formatter}
      tooltipFormatter={(params) =>
        tooltipFormatter(params, stepSize, formatter, stepMultiplier, isLegendVisible)
      }
      height={height}
      animation={animation}
      selectedCategories={selectedCategories}
      onCategoryClick={handleCategoryClick}
    />
  );

  const legend = isLegendVisible && (
    <TimeSeriesLegend
      series={series}
      selectedCategories={selectedCategories}
      onCategoryClick={handleCategoryClick}
    />
  );
  return (
    <Box>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        {!!currentDate && (
          <Box>
            <Typography color='textSecondary' variant='caption'>
              {currentDate}
            </Typography>
          </Box>
        )}
        {showClearButton && (
          <Link
            variant='caption'
            style={{ cursor: 'pointer' }}
            onClick={handleStop}
            underline='hover'
          >
            Clear
          </Link>
        )}
      </Box>
      {showControls ? (
        <BoxVert>
          <BoxHorz>
            <ControlsBox>
              <TimeSeriesControls data={data} stepSize={stepSize} />
            </ControlsBox>
            <ChartBox>{chart}</ChartBox>
          </BoxHorz>
          {legend}
        </BoxVert>
      ) : (
        <BoxVert>
          {chart}
          {legend}
        </BoxVert>
      )}
    </Box>
  );
}

function defaultTooltipFormatter(
  params,
  stepSize,
  valueFormatter,
  stepMultiplier,
  showNames
) {
  const [name] = params[0].data;
  const date = new Date(name);
  const title = formatBucketRange({ date, stepMultiplier, stepSize });

  return `<div style='minWidth: 160px;'>
    <p style='font-weight: 600; line-height: 1; margin: 4px 0;'>${title}</p>
    ${params
      .reduce((acc, serie) => {
        if (serie.value !== undefined && serie.value !== null) {
          const HTML = `<div style='display: flex; flex-direction: row; align-items: center; justify-content: spread; height: 20px; gap: 8px;'>
            <div style='display: flex; flex-direction: row; align-items: center; margin: 4px 0;'>
              <div style='width: 8px; height: 8px; margin-right: 4px; border-radius: 50%; border: 2px solid ${
                serie.color
              }'></div>
            </div>
            <p style='line-height: 1; flex: 1; margin-left: 0.5em; min-width: 20px; max-width: 200px; overflow: hidden; text-overflow: ellipsis; align-self: left;'>
            ${showNames && serie.seriesName ? `${serie.seriesName}</p>` : ''}
            </p>
            <p style='line-height: 1; justify-self: flex-end;'>${valueFormatter(
              serie.data[1]
            )}</p>
          </div>`;
          acc.push(HTML);
        }
        return acc;
      }, [])
      .join('')}
    </div>`;
}

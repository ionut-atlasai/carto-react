import React from 'react';
import { render } from '../widgets/utils/testUtils';
import ScatterPlotWidgetUI from '../../src/widgets/ScatterPlotWidgetUI/ScatterPlotWidgetUI';
import { mockEcharts } from './testUtils';
import { IntlProvider } from 'react-intl';

describe('ScatterPlotWidgetUI', () => {
  beforeAll(() => {
    mockEcharts.init();
  });

  afterAll(() => {
    mockEcharts.destroy();
  });
  const DATA = [
    [1, 2],
    [2, 4],
    [3, 6]
  ];
  const Widget = (props) => (
    <IntlProvider locale='en'>
      <ScatterPlotWidgetUI data={DATA} onSelectedBarsChange={() => {}} {...props} />
    </IntlProvider>
  );

  test('renders correctly', () => {
    render(<Widget />);
  });

  test('re-render with different data', () => {
    const { rerender } = render(<Widget />);

    rerender(<Widget />);
    rerender(<Widget data={[...DATA, [4, 8]]} />);
  });
});

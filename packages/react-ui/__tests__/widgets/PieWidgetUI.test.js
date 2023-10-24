import React from 'react';
import { render } from '../widgets/utils/testUtils';
import PieWidgetUI from '../../src/widgets/PieWidgetUI/PieWidgetUI';
import { mockEcharts } from './testUtils';
import { IntlProvider } from 'react-intl';

describe('PieWidgetUI', () => {
  beforeAll(() => {
    mockEcharts.init();
  });

  afterAll(() => {
    mockEcharts.destroy();
  });

  const DATA = [
    {
      name: 'Category 1',
      value: 1
    },
    {
      name: 'Category 2',
      value: 1
    }
  ];

  const Widget = (props) => (
    <IntlProvider locale='en'>
      <PieWidgetUI data={DATA} onSelectedCategoriesChange={() => {}} {...props} />
    </IntlProvider>
  );

  test('renders correctly', () => {
    render(<Widget />);
  });

  test('with selected categories', () => {
    render(<Widget selectedCategories={[DATA[0]]} />);
  });
});

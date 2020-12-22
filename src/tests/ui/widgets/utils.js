import React from 'react';

import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider
} from '@material-ui/core';

import { cartoThemeOptions } from 'src/ui';

/**
 * Simple wrapper to get MaterialUI theme available
 */
export function getMaterialUIContext(children) {
  return (
    <ThemeProvider theme={getTheme()}>
      {children}
    </ThemeProvider>
  );
}

function getTheme() {
  let theme = createMuiTheme(cartoThemeOptions);
  theme = responsiveFontSizes(theme, {
    breakpoints: cartoThemeOptions.breakpoints.keys,
    disableAlign: false,
    factor: 2,
    variants: [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'subtitle1',
      'subtitle2',
      'body1',
      'body2',
      'button',
      'caption',
      'overline',
    ],
  });
  return theme;
}
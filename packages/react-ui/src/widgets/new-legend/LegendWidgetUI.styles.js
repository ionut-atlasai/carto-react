export const LEGEND_WIDTH = 240;
export const styles = {
  root: {
    background: (theme) => theme.palette.background.paper,
    position: 'absolute',
    maxHeight: 'calc(100% - 120px)',
    display: 'flex',
    flexDirection: 'column'
  },
  legendToggleOpen: {
    borderBottom: (theme) => `1px solid ${theme.palette.divider}`
  },
  legendToggle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    pl: 2,
    pr: 1,
    py: 1
  },
  legendItemList: {
    overflow: 'auto',
    maxHeight: `calc(100% - 12px)`
  },
  legendItem: {
    '&:not(:first-of-type)': {
      borderTop: (theme) => `1px solid ${theme.palette.divider}`
    }
  },
  legendItemHeader: {
    p: 1.5,
    pr: 2,
    gap: 0.5,
    display: 'flex',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    background: (theme) => theme.palette.background.paper
  },
  legendItemBody: {
    px: 2
    // '& [data-testid="categories-legend"] > .MuiGrid-root': {
    //   paddingTop: '6px',
    //   paddingBottom: '6px'
    // },
    // '& [data-testid="icon-legend"] > .MuiGrid-root': {
    //   paddingTop: '2px',
    //   paddingBottom: '2px',
    //   '& > .MuiBox-root': {
    //     width: '20px',
    //     height: '20px',
    //     marginRight: '8px'
    //   },
    //   '& img': {
    //     display: 'block',
    //     margin: 'auto',
    //     width: 'auto',
    //     height: '20px'
    //   }
    // }
  },
  opacityControl: {
    display: 'flex',
    gap: 2,
    alignItems: 'center',
    p: 1,
    minWidth: LEGEND_WIDTH - 32
  },
  layerOptions: {
    background: (theme) => theme.palette.background.default,
    px: 2,
    py: 1,
    m: 2
  },
  opacityInput: {
    display: 'flex',
    width: '60px',
    flexShrink: 0
  },
  'top-left': {
    top: 0,
    left: 0
  },
  'top-right': {
    top: 0,
    right: 0
  },
  'bottom-left': {
    bottom: 0,
    left: 0
  },
  'bottom-right': {
    bottom: 0,
    right: 0
  }
};
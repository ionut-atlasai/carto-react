import { ICON_SIZE, ICON_SIZE_M } from '../../themeConstants';
import { getSpacing } from '../../themeUtils';
import { commonPalette } from '../palette';
import { themeTypography } from '../typography';

const tooltipArrowSize = 1;
const tooltipSeparation = 0.5;
const tooltipMargin = tooltipArrowSize + tooltipSeparation;

export const dataDisplayOverrides = {
  // Divider
  MuiDivider: {
    styleOverrides: {
      root: {
        backgroundColor: 'transparent',
        borderColor: commonPalette.divider
      },
      light: {
        borderColor: commonPalette.grey[50]
      }
    }
  },

  // List
  MuiList: {
    styleOverrides: {
      root: {
        // Indent sublevels, ugly but needed to avoid issues with hover
        '& .MuiList-root': {
          '& .MuiListItem-root': {
            paddingLeft: getSpacing(4)
          },

          '& .MuiList-root': {
            '& .MuiListItem-root': {
              paddingLeft: getSpacing(6)
            },

            '& .MuiList-root': {
              '& .MuiListItem-root': {
                paddingLeft: getSpacing(8)
              },

              '& .MuiList-root': {
                '& .MuiListItem-root': {
                  paddingLeft: getSpacing(10)
                }
              }
            }
          }
        }
      }
    }
  },

  // List Item
  MuiListItemText: {
    defaultProps: {
      primaryTypographyProps: {
        variant: 'body2',
        style: { fontWeight: themeTypography.fontWeightBold },
        noWrap: true
      },
      secondaryTypographyProps: { variant: 'caption' }
    }
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        minWidth: getSpacing(5.75),
        marginLeft: getSpacing(0.75),

        '& .MuiSvgIcon-root': {
          fontSize: ICON_SIZE_M
        }
      }
    }
  },
  MuiListItemAvatar: {
    styleOverrides: {
      root: {
        '& .MuiAvatar-root': {
          height: getSpacing(4.5),
          width: getSpacing(4.5)
        },
        '& .MuiSvgIcon-root': {
          fontSize: ICON_SIZE
        }
      }
    }
  },

  // Tooltip
  MuiTooltip: {
    defaultProps: {
      arrow: true,
      placement: 'top',
      enterDelay: 1000,
      leaveDelay: 200
    },

    styleOverrides: {
      tooltip: {
        ...themeTypography.caption,
        fontWeight: 500,
        maxWidth: '240px',
        backgroundColor: commonPalette.black[90],

        '.MuiTooltip-popper[data-popper-placement*="top"] &': {
          marginBottom: getSpacing(tooltipSeparation),

          '&.MuiTooltip-tooltipArrow': {
            marginBottom: getSpacing(tooltipMargin)
          }
        },
        '.MuiTooltip-popper[data-popper-placement*="right"] &': {
          marginLeft: getSpacing(tooltipSeparation),

          '&.MuiTooltip-tooltipArrow': {
            marginLeft: getSpacing(tooltipMargin)
          }
        },
        '.MuiTooltip-popper[data-popper-placement*="bottom"] &': {
          marginTop: getSpacing(tooltipSeparation),

          '&.MuiTooltip-tooltipArrow': {
            marginTop: getSpacing(tooltipMargin)
          }
        },
        '.MuiTooltip-popper[data-popper-placement*="left"] &': {
          marginRight: getSpacing(tooltipSeparation),

          '&.MuiTooltip-tooltipArrow': {
            marginRight: getSpacing(tooltipMargin)
          }
        }
      },

      arrow: {
        height: getSpacing(tooltipArrowSize),
        color: commonPalette.black[90]
      }
    }
  },

  // Dialog
  MuiDialog: {
    defaultProps: {
      maxWidth: 'md'
    }
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: {
        padding: getSpacing(3, 3, 2)
      }
    }
  },
  MuiDialogContent: {
    styleOverrides: {
      root: {
        '& .MuiFormGroup-root': {
          padding: getSpacing(1, 0)
        }
      }
    }
  },
  MuiDialogContentText: {
    defaultProps: {
      variant: 'body2'
    }
  },

  // Table
  MuiTablePagination: {
    styleOverrides: {
      select: {
        paddingRight: getSpacing(7.5),
        paddingLeft: getSpacing(1.5)
      },
      input: {
        height: getSpacing(4),
        border: `2px solid ${commonPalette.divider}`,
        borderRadius: getSpacing(0.5),
        fontWeight: themeTypography.fontWeightMedium,
        '& .MuiSelect-icon': {
          top: '50%',
          transform: 'translateY(-50%)',
          width: getSpacing(2.25),
          height: getSpacing(2.25),
          right: getSpacing(0.75)
        }
      },
      caption: {
        ...themeTypography.caption,
        '&:first-of-type': {
          color: commonPalette.text.secondary
        }
      },
      toolbar: {
        minHeight: 0,
        marginTop: getSpacing(1)
      },
      actions: {
        '& button:last-child': {
          marginLeft: getSpacing(2)
        }
      }
    }
  },
  MuiTableCell: {
    styleOverrides: {
      head: {
        ...themeTypography.caption,
        color: commonPalette.text.secondary
      },
      stickyHeader: {
        backgroundColor: commonPalette.common.white
      }
    }
  },

  // Chip
  MuiChip: {
    styleOverrides: {
      root: {
        backgroundColor: commonPalette.grey[100],
        '&:hover': {
          backgroundColor: commonPalette.grey[200]
        },
        '& .MuiAvatar-root': {
          backgroundColor: '#7f3c8d',
          color: commonPalette.common.white
        }
      },
      colorPrimary: {
        '&.Mui-disabled': {
          backgroundColor: commonPalette.grey[100],
          color: commonPalette.text.primary
        },
        '&:hover': {
          backgroundColor: commonPalette.primary.dark
        }
      },
      colorSecondary: {
        '&.Mui-disabled': {
          backgroundColor: commonPalette.grey[100]
        },
        '&:hover': {
          backgroundColor: commonPalette.secondary.light
        }
      },
      label: {
        fontFamily: '"Open Sans", sans-serif',
        letterSpacing: 0.25
      },
      labelSmall: {
        fontSize: themeTypography.caption.fontSize,
        fontWeight: themeTypography.fontWeightLight
      },
      outlined: {
        transition: `border-color 250ms cubic-bezier(0.4, 0, 0.2, 1), color 250ms cubic-bezier(0.4, 0, 0.2, 1)`,
        '&.Mui-disabled': {
          backgroundColor: 'transparent'
        },
        '&:hover': {
          backgroundColor: 'transparent',
          borderColor: commonPalette.grey[200],
          '&.MuiChip-clickable': {
            backgroundColor: 'transparent'
          }
        }
      },
      outlinedPrimary: {
        '&:hover': {
          backgroundColor: 'transparent',
          borderColor: commonPalette.primary.dark,
          color: commonPalette.primary.dark,
          '&.MuiChip-clickable': {
            backgroundColor: 'transparent'
          }
        }
      },
      outlinedSecondary: {
        '&:hover': {
          backgroundColor: 'transparent',
          borderColor: commonPalette.secondary.dark,
          color: commonPalette.secondary.dark,
          '&.MuiChip-clickable': {
            backgroundColor: 'transparent'
          }
        }
      },
      clickable: {
        '&:focus': {
          webkitTapHighlightColor: 'none'
        }
      }
    }
  },

  // Skeleton
  MuiSkeleton: {
    defaultProps: {
      animation: 'wave'
    }
  },

  // Typography
  MuiTypography: {
    defaultProps: {
      color: 'textPrimary'
    }
  },

  // Svg Icons
  MuiSvgIcon: {
    styleOverrides: {
      root: {
        fontSize: ICON_SIZE
      },
      sizeLarge: {
        fontSize: ICON_SIZE_M
      }
    }
  }
};

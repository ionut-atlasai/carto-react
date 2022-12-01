import { ICON_SIZE, ICON_SIZE_M } from '../../themeConstants';
import { getSpacing } from '../../themeUtils';
import { commonPalette } from '../palette';
import { themeShadows } from '../shadows';
import { themeTypography } from '../typography';
import ArrowDropIcon from '../../../assets/ArrowDropIcon';

const switchSizeS = 2;
const switchSizeM = 3;
const switchSizeL = 4;

const checkboxRadioOverrides = {
  root: ({ ownerState }) => ({
    padding: getSpacing(0.5),

    ...(ownerState.size === 'small' && {
      padding: '3px' // Forced to a non-standard value to meet with design
    }),

    '&:hover, &:focus-visible': {
      backgroundColor: commonPalette.primary.background
    },
    '& + .MuiFormControlLabel-label': {
      ...themeTypography.body2,
      marginLeft: getSpacing(0.25),

      ...(ownerState.size === 'small' && {
        marginLeft: getSpacing(0.5)
      })
    },

    '& .MuiSvgIcon-root': {
      fontSize: ICON_SIZE_M,

      ...(ownerState.size === 'small' && {
        fontSize: ICON_SIZE
      })
    }
  })
};

export const formsOverrides = {
  // Checkbox
  MuiCheckbox: {
    styleOverrides: {
      ...checkboxRadioOverrides
    }
  },

  // Radio Button
  MuiRadio: {
    styleOverrides: {
      ...checkboxRadioOverrides
    }
  },

  // Text Field
  MuiTextField: {
    defaultProps: {
      fullWidth: true,

      InputLabelProps: {
        shrink: true
      },
      SelectProps: {
        IconComponent: ArrowDropIcon
      }
    },
    styleOverrides: {
      root: ({ ownerState }) => ({
        '& legend': {
          display: 'none'
        },
        '& + &': {
          marginLeft: getSpacing(2)
        },

        // Select bool
        ...(ownerState.select === true && {
          '& .MuiInputBase-root': {
            padding: 0,

            '&.MuiOutlinedInput-root': {
              padding: 0
            },
            '& .MuiInputAdornment-positionEnd': {
              marginRight: getSpacing(3)
            },
            '& .MuiSelect-select': {
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              padding: 0,

              '&.MuiInputBase-input': {
                paddingLeft: getSpacing(2),
                paddingRight: getSpacing(5),

                '&.MuiSelect-standard': {
                  paddingLeft: 0
                }
              },
              '&:focus': {
                background: 'transparent'
              },
              '& .MuiTypography-root': {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }
            },
            '& .MuiSelect-icon': {
              right: getSpacing(2)
            },
            '& .MuiSelect-iconStandard': {
              right: 0
            }
          },

          '& .MuiInputBase-sizeSmall': {
            '& .MuiSelect-select': {
              ...themeTypography.body2,

              '&.MuiInputBase-input': {
                paddingLeft: getSpacing(1.5),
                paddingRight: getSpacing(4)
              }
            },
            '&.MuiOutlinedInput-root.MuiInputBase-sizeSmall': {
              padding: 0
            },
            '& .MuiSelect-icon': {
              right: getSpacing(1.5)
            }
          }
        })
      })
    }
  },

  // Input Base
  MuiInputBase: {
    styleOverrides: {
      root: {
        height: getSpacing(6),
        padding: getSpacing(0, 2),
        ...themeTypography.body1,

        '& input': {
          padding: 0,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',

          '&::placeholder': {
            opacity: 1,
            color: commonPalette.text.hint
          }
        },

        '&.MuiInputBase-formControl::after': {
          top: 0,
          transform: 'none',
          opacity: 0
        },
        '&.MuiInputBase-formControl.Mui-focused::after': {
          transform: 'none',
          opacity: 1
        },

        // Variants
        '&.MuiFilledInput-root': {
          borderRadius: getSpacing(0.5),
          backgroundColor: commonPalette.default.background,

          '&:hover': {
            backgroundColor: commonPalette.default.background
          },
          '&::before': {
            top: 0,
            borderRadius: getSpacing(0.5),
            border: '1px solid transparent',
            transition: 'border 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
          },
          '&:hover:not(.Mui-disabled)::before': {
            borderColor: commonPalette.text.primary
          },
          '&::after': {
            borderRadius: getSpacing(0.5),
            border: '1px solid transparent'
          },
          '&.Mui-focused': {
            backgroundColor: commonPalette.background.paper,

            '&::after': {
              border: `2px solid ${commonPalette.primary.main}`
            }
          },
          '&.Mui-disabled': {
            backgroundColor: commonPalette.default.background,

            '&::before': {
              borderBottomStyle: 'solid'
            }
          },
          '&.Mui-error::after': {
            opacity: 1,
            border: `2px solid ${commonPalette.error.light}`
          }
        },

        '&.MuiOutlinedInput-root': {
          padding: getSpacing(0, 2),

          '&.MuiInputBase-sizeSmall': {
            padding: getSpacing(0, 1.5)
          },
          '&.Mui-focused': {
            backgroundColor: commonPalette.background.paper
          },
          '& .MuiOutlinedInput-notchedOutline': {
            top: 0,
            borderColor: commonPalette.default.outlinedBorder,
            transition: 'border 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            transition: 'none'
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            border: `2px solid ${commonPalette.error.light}`
          }
        },

        '&.MuiInput-underline': {
          marginTop: 0,
          padding: 0,

          '&::before': {
            borderColor: commonPalette.default.outlinedBorder
          },
          '&:hover:not(.Mui-disabled)::before': {
            borderBottom: `1px solid ${commonPalette.text.primary}`
          },
          '&:not(.Mui-disabled)::after': {
            borderBottom: '1px solid transparent'
          },
          '&.Mui-focused::after': {
            borderBottom: `2px solid ${commonPalette.primary.main}`
          },
          '&.Mui-error::after': {
            opacity: 1,
            borderBottom: `2px solid ${commonPalette.error.light}`
          },
          '&.Mui-disabled::before': {
            borderBottomStyle: 'solid'
          }
        },

        // TextArea (multiline)
        '&.MuiInputBase-multiline': {
          height: 'auto',
          minHeight: getSpacing(12),
          alignItems: 'flex-start',
          padding: getSpacing(0, 0.25),

          '& textarea': {
            padding: getSpacing(1.5, 1.75),
            ...themeTypography.body1,

            '&::placeholder, &.Mui-disabled::placeholder': {
              opacity: 1,
              color: commonPalette.text.hint
            }
          },

          '&.MuiInputBase-sizeSmall': {
            minHeight: getSpacing(9),
            padding: getSpacing(0, 0.25),

            '& textarea': {
              padding: getSpacing(1, 1.25),
              ...themeTypography.body2
            }
          }
        }
      },

      // size
      sizeSmall: {
        height: getSpacing(4),
        padding: getSpacing(0, 1.5),

        '& input': {
          ...themeTypography.body2
        }
      }
    }
  },

  // Input Adornment
  MuiInputAdornment: {
    styleOverrides: {
      root: {
        '& .MuiTypography-root': {
          ...themeTypography.body1,
          color: commonPalette.text.secondary
        },
        '&.MuiInputAdornment-sizeSmall': {
          '& .MuiTypography-root': {
            ...themeTypography.body2
          }
        },
        '&.MuiInputAdornment-positionStart.MuiInputAdornment-root:not(.MuiInputAdornment-hiddenLabel)':
          {
            marginTop: 0
          },
        '& .MuiSvgIcon-root': {
          fontSize: ICON_SIZE,
          color: commonPalette.text.secondary
        },
        '.Mui-disabled &': {
          '& .MuiTypography-root, & .MuiSvgIcon-root': {
            color: commonPalette.text.disabled
          }
        }
      }
    }
  },

  // Form Control
  MuiFormControl: {
    defaultProps: {
      fullWidth: true
    }
  },

  // Form Helper Text
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        margin: 0,
        marginTop: getSpacing(1)
      }
    }
  },

  // Label
  MuiInputLabel: {
    styleOverrides: {
      root: {
        position: 'static',
        transform: 'none',
        marginBottom: getSpacing(1),
        ...themeTypography.caption,
        fontWeight: 500,
        color: commonPalette.text.primary
      },
      sizeSmall: {
        marginBottom: getSpacing(0.5)
      },
      standard: {
        marginBottom: 0
      }
    }
  },

  // Select
  MuiSelect: {
    defaultProps: {
      IconComponent: ArrowDropIcon,
      fullWidth: true
    },

    styleOverrides: {
      root: {
        padding: 0,

        '& .MuiSelect-icon': {
          right: getSpacing(2)
        },
        '& .MuiSelect-iconStandard': {
          right: 0
        },
        '& legend': {
          display: 'none'
        },

        // Variants
        '&.MuiOutlinedInput-root': {
          padding: 0
        },
        '&.MuiFilledInput-root, &.MuiInput-underline': {
          '&.Mui-focused::after': {
            height: '100%',
            transition: 'none'
          }
        },

        // Size Small
        '&.MuiInputBase-sizeSmall': {
          ...themeTypography.body2,

          '& .MuiSelect-select': {
            '&.MuiInputBase-input': {
              paddingLeft: getSpacing(1.5),
              paddingRight: getSpacing(4)
            },
            '&.MuiSelect-standard': {
              paddingLeft: 0
            }
          },
          '&.MuiOutlinedInput-root.MuiInputBase-sizeSmall': {
            padding: 0
          },
          '& .MuiSelect-icon': {
            right: getSpacing(1.5)
          }
        }
      },
      select: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        padding: 0,

        '&.MuiInputBase-input': {
          paddingLeft: getSpacing(2),
          paddingRight: getSpacing(5),

          '&.MuiSelect-standard': {
            paddingLeft: 0
          }
        },
        '&:focus': {
          background: 'transparent'
        },
        '& .MuiTypography-root': {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }
      }
    }
  },

  // Autocomplete
  MuiAutocomplete: {
    styleOverrides: {
      inputRoot: {
        '&[class*="MuiOutlinedInput-root"]': {
          padding: getSpacing(3, 1.25, 0.5),

          '& .MuiAutocomplete-input': {
            padding: getSpacing(0, 1.25, 0.5)
          }
        },
        '&.MuiInputBase-marginDense.MuiOutlinedInput-root .MuiInputBase-input.MuiOutlinedInput-inputMarginDense':
          {
            paddingTop: getSpacing(0.25),
            paddingBottom: getSpacing(0.25)
          }
      }
    }
  },

  // Switch
  MuiSwitch: {
    defaultProps: {
      disableRipple: true
    },

    styleOverrides: {
      root: {
        width: getSpacing(switchSizeM),
        height: getSpacing(switchSizeS),
        padding: 0,
        overflow: 'visible',

        '& + .MuiFormControlLabel-label': {
          ...themeTypography.body2,
          marginLeft: getSpacing(1),
          color: commonPalette.text.primary
        }
      },

      switchBase: {
        width: getSpacing(switchSizeL),
        height: getSpacing(switchSizeL),
        padding: getSpacing(0.5),
        borderRadius: '50%',
        color: commonPalette.text.secondary,
        transform: 'translate(-8px, -8px)',

        '&:hover': {
          backgroundColor: commonPalette.action.hover
        },
        '&.Mui-checked': {
          transform: 'translate(0, -8px)',
          color: commonPalette.common.white,

          '& input': {
            left: getSpacing(-1.5)
          },
          '& + .MuiSwitch-track': {
            opacity: 1,
            border: 0
          }
        }
      },

      thumb: {
        width: getSpacing(1),
        height: getSpacing(1),
        boxShadow: themeShadows[0],

        '.Mui-checked &': {
          boxShadow: themeShadows[1]
        },
        '.Mui-disabled &': {
          backgroundColor: commonPalette.text.disabled
        },
        '.Mui-disabled.Mui-checked &': {
          backgroundColor: commonPalette.common.white
        }
      },

      input: {
        width: getSpacing(switchSizeM),
        height: getSpacing(switchSizeS),
        left: 0
      },

      track: {
        height: 'auto',
        border: `1px solid ${commonPalette.text.secondary}`,
        borderRadius: getSpacing(2),
        opacity: 1,
        backgroundColor: commonPalette.common.white,
        transitionDuration: '300ms',

        '.MuiButtonBase-root.MuiSwitch-switchBase.Mui-disabled + &': {
          opacity: 1,
          borderColor: commonPalette.text.disabled
        },
        '.MuiButtonBase-root.Mui-checked.Mui-disabled + &': {
          backgroundColor: commonPalette.text.disabled
        }
      },

      colorPrimary: {
        '&.Mui-checked:hover': {
          backgroundColor: commonPalette.primary.background
        }
      },
      colorSecondary: {
        '&.Mui-checked:hover': {
          backgroundColor: commonPalette.secondary.background
        }
      }
    }
  },

  // Circular Progress
  CircularProgress: {
    defaultProps: {
      size: 40,
      thickness: 4
    }
  },

  // Slider
  MuiSlider: {
    defaultProps: {
      color: 'primary',
      marks: false
    }
  }
};
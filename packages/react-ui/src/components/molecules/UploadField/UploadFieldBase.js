import React from 'react';
import PropTypes from 'prop-types';

import FilesAction from './FilesAction';
import StyledUploadField from './StyledUploadField';

function UploadFieldBase({
  buttonText,
  inProgress,
  size,
  error,
  filesText,
  muiInputProps,
  nativeInputProps,
  onChange,
  handleReset,
  dragOver,
  name,
  uploadInputRef,
  multiple,
  focused,
  ...props
}) {
  return (
    <>
      <StyledUploadField
        {...props}
        size={size}
        error={!!error}
        helperText={error}
        focused={focused || dragOver}
        InputProps={{
          ...muiInputProps,
          readOnly: true,
          multiple: multiple,
          name: name,
          endAdornment: (
            <FilesAction
              buttonText={buttonText}
              hasFiles={!!filesText}
              size={size}
              error={!!error}
              disabled={!!dragOver}
              handleReset={handleReset}
              inProgress={inProgress}
            />
          )
        }}
      />
      <input
        {...nativeInputProps}
        ref={uploadInputRef}
        style={{ display: 'none' }}
        type='file'
        aria-label={name}
        onChange={onChange}
      />
    </>
  );
}

UploadFieldBase.defaultProps = {
  buttonText: 'Browse',
  filesText: '',
  size: 'small',
  onChange: (files) => files
};

UploadFieldBase.propTypes = {
  name: PropTypes.string,
  accept: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  handleReset: PropTypes.func,
  dragOver: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  inProgress: PropTypes.bool,
  muiInputProps: PropTypes.object,
  nativeInputProps: PropTypes.object,
  size: PropTypes.oneOf(['small', 'medium']),
  buttonText: PropTypes.string,
  filesText: PropTypes.string,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
};

export default UploadFieldBase;

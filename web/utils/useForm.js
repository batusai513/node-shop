import React, { useCallback } from 'react';
import useConstant from './useConstant';

export default function useForm(initialValues) {
  const defaults = useConstant(() => initialValues);
  const [state, setState] = React.useState(defaults);

  const onHandleChange = useCallback(_handleChange, []);
  const resetForm = useCallback(_resetForm, [initialValues]);

  return [state, onHandleChange, { initialValues: defaults, resetForm }];

  function _resetForm() {
    setState(initialValues);
  }

  function _handleChange(e) {
    const { value, name, type, files } = e.target;
    var valueToUse = value;
    if (type == 'file') {
      valueToUse = { value: value, files: files };
    } else if (type == 'number') {
      valueToUse = parseFloat(value);
    }
    setState((s) => ({ ...s, [name]: valueToUse }));
  }
}

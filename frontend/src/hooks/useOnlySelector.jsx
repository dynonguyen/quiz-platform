import { isDeepEqual } from '@cads-ui/core';
import { useSelector } from 'react-redux';

function useSelectorOnly(reducerKey, specifiedKeys = [], isExclude = false) {
  return useSelector((state) => {
    const selector = state[reducerKey];

    if (!selector) return {};
    if (typeof selector !== 'object') return selector;

    const data = {};

    if (!isExclude) {
      specifiedKeys.forEach((key) =>
        Object.assign(data, { [key]: selector[key] })
      );
    } else {
      Object.keys(selector).forEach((key) => {
        if (specifiedKeys.findIndex((s) => s === key) === -1) {
          Object.assign(data, { [key]: selector[key] });
        }
      });
    }

    return data;
  }, isDeepEqual);
}

export default useSelectorOnly;

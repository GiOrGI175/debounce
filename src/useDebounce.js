import { useState, useEffect } from 'react';

export function useDebounce(value, delay) {
  const [debunceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const SetHandler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(SetHandler);
    };
  }, [value, delay]);

  return debunceValue;
}

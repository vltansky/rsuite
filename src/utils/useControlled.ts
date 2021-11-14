import { useRef, useState, useCallback } from 'react';

/**
 * A hook for controlled value management.
 * In the case of passing the controlled value, the controlled value is returned, otherwise the value in state is returned.
 * Generally used for a component including controlled and uncontrolled modes.
 * @param controlledValue
 * @param defaultValue
 * @param formatValue
 */
function useControlled<V = any>(
  controlledValue: V | undefined,
  defaultValue: V | undefined
): [V | undefined, (value: React.SetStateAction<V>) => void, boolean] {
  const controlledRef = useRef(false);
  controlledRef.current = controlledValue !== undefined;

  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  // If it is controlled, this directly returns the attribute value.
  const value: V | undefined = controlledRef.current ? controlledValue! : uncontrolledValue;

  const setValue = useCallback(
    nextValue => {
      // Only update the value in state when it is not under control.
      if (!controlledRef.current) {
        setUncontrolledValue(nextValue);
      }
    },
    [controlledRef]
  );

  return [value, setValue, controlledRef.current];
}

export default useControlled;

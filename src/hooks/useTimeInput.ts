import { useRef, useCallback } from 'react';

export function useTimeInput() {
  const longPressTimer = useRef<number | null>(null);
  const repeatInterval = useRef<number | null>(null);

  const handleTimeButtonPress = useCallback((callback: () => void) => {
    callback(); // Execute immediately
    longPressTimer.current = window.setTimeout(() => {
      repeatInterval.current = window.setInterval(callback, 100);
    }, 500);
  }, []);

  const handleTimeButtonRelease = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    if (repeatInterval.current) {
      clearInterval(repeatInterval.current);
      repeatInterval.current = null;
    }
  }, []);

  return {
    handleTimeButtonPress,
    handleTimeButtonRelease,
  };
}

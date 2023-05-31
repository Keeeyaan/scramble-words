import { useState, useEffect, useRef } from 'react';

type Timer = {
  seconds: number;
  minutes: number;
};

type UseTimerProps = {
  startTime: number;
  startCountdown: boolean;
};

export const useTimer = ({ startTime, startCountdown }: UseTimerProps) => {
  const [timer, setTimer] = useState<Timer>({
    minutes: Math.floor(startTime / 60),
    seconds: startTime % 60,
  });
  const [isActive, setIsActive] = useState<boolean>(false);
  const countRef = useRef<number>(0);

  useEffect(() => {
    if (startCountdown) {
      setIsActive(true);
    } else {
      setIsActive(false);
      countRef.current = 0;
      setTimer({
        minutes: Math.floor(startTime / 60),
        seconds: startTime % 60,
      });
    }
  }, [startCountdown, startTime]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isActive) {
      intervalId = setInterval(() => {
        countRef.current += 1;

        const remainingSeconds = startTime - countRef.current;

        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;

        setTimer({
          minutes,
          seconds,
        });

        if (remainingSeconds === 0) {
          setIsActive(false);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, startTime]);

  return timer;
};

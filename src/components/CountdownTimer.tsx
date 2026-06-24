'use client';

import { useEffect, useState } from 'react';

type CountdownTimerProps = {
  deadline: string;
  label?: string;
  compact?: boolean;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(deadline: string): TimeLeft {
  const difference = Math.max(0, new Date(deadline).getTime() - Date.now());
  const totalSeconds = Math.floor(difference / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function twoDigits(value: number) {
  return String(value).padStart(2, '0');
}

export function CountdownTimer({ deadline, label = 'Time left', compact = false }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(deadline));

  useEffect(() => {
    const interval = window.setInterval(() => setTimeLeft(getTimeLeft(deadline)), 1000);
    return () => window.clearInterval(interval);
  }, [deadline]);

  if (compact) {
    return (
      <div className="text-center" aria-label={`${label}: ${timeLeft.days} days ${timeLeft.hours} hours ${timeLeft.minutes} minutes ${timeLeft.seconds} seconds`}>
        <p className="text-xl font-bold text-navy">{timeLeft.days}d {twoDigits(timeLeft.hours)}h</p>
        <p className="text-xs font-semibold text-slate-500">{twoDigits(timeLeft.minutes)}m {twoDigits(timeLeft.seconds)}s</p>
      </div>
    );
  }

  const units = [
    ['Days', timeLeft.days],
    ['Hours', timeLeft.hours],
    ['Minutes', timeLeft.minutes],
    ['Seconds', timeLeft.seconds],
  ] as const;

  return (
    <div aria-label={`${label}: ${timeLeft.days} days ${timeLeft.hours} hours ${timeLeft.minutes} minutes ${timeLeft.seconds} seconds`}>
      <p className="text-xs font-semibold uppercase tracking-[.16em] text-graphite">{label}</p>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {units.map(([unit, value]) => (
          <div key={unit} className="rounded-2xl border border-sky/20 bg-ivory px-2 py-3 text-center">
            <p className="text-2xl font-bold text-navy">{unit === 'Days' ? value : twoDigits(value)}</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[.12em] text-graphite">{unit}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

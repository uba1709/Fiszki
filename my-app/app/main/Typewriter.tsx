"use client";
import React, { useEffect, useState } from 'react';

type Props = {
  text: string;
  speed?: number; // ms per character (smaller = faster)
  loop?: boolean;
  className?: string;
  onComplete?: () => void; // called once when typing finishes
};

export default function Typewriter({ text, speed = 40, loop = false, className = '', onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const doneRef = React.useRef(false);

  useEffect(() => {
    let id: number | undefined;

    if (index < text.length) {
      id = window.setTimeout(() => setIndex((i) => i + 1), speed);
      doneRef.current = false;
    } else if (index === text.length) {
      if (!doneRef.current) {
        doneRef.current = true;
        if (onComplete) onComplete();
      }
      if (loop) {
        id = window.setTimeout(() => setIndex(0), 800); // pause then restart
        doneRef.current = false;
      }
    }

    return () => { if (id) window.clearTimeout(id); };
  }, [index, text, speed, loop, onComplete]);

  useEffect(() => {
    // if text prop changes, reset typing (schedule to avoid synchronous setState warnings)
    const id = window.setTimeout(() => {
      setIndex(0);
      doneRef.current = false;
    }, 0);
    return () => window.clearTimeout(id);
  }, [text]);

  const visible = text.slice(0, Math.min(index, text.length));

  return (
    <span className={`typewriter-js ${className}`} aria-live="polite">
      {visible}
      <span className="typewriter-caret" aria-hidden="true" />
    </span>
  );
}

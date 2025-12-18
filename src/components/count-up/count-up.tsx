import { useEffect, useRef, useState } from 'react';

type CountUpProps = {
    targetNumber: number;
    duration?: number; // in ms
};

const CountUp = ({ targetNumber, duration = 1500 }: CountUpProps) => {
    const [value, setValue] = useState(0);
    const startTimestampRef = useRef<number | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
        // Reset on target change
        setValue(0);
        startTimestampRef.current = null;

        const step = (timestamp: number) => {
            if (startTimestampRef.current === null) {
                startTimestampRef.current = timestamp;
            }

            const progress = Math.min(
                (timestamp - startTimestampRef.current) / duration,
                1,
            );

            setValue(Math.round(targetNumber * progress));

            if (progress < 1) {
                animationFrameRef.current = window.requestAnimationFrame(step);
            }
        };

        animationFrameRef.current = window.requestAnimationFrame(step);

        return () => {
            if (animationFrameRef.current !== null) {
                window.cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [targetNumber, duration]);

    return <>{value}</>;
};

export default CountUp;


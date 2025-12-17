import { useEffect, useRef } from 'react';
import styles from './jobs-ticker.module.scss';

export type VacancyItem = {
    flag: string;
    country: string;
    count: number;
};

type Props = {
    items: VacancyItem[];
    speedPxPerSec?: number;
    className?: string;
};

export default function JobsTicker({
                                       items,
                                       speedPxPerSec = 60,
                                       className = '',
                                   }: Props) {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);

    const rafRef = useRef<number | null>(null);
    const lastTsRef = useRef<number>(0);
    const offsetRef = useRef<number>(0);
    const pausedRef = useRef<boolean>(false);
    const loopWidthRef = useRef<number>(0);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const track = trackRef.current;
        if (!wrapper || !track || items.length === 0) return;
        const removeReactAttrs = (el: HTMLElement) => {
            Array.from(el.attributes).forEach(attr => {
                if (attr.name.startsWith('data-react')) {
                    el.removeAttribute(attr.name);
                }
            });
            Array.from(el.children).forEach(child =>
                removeReactAttrs(child as HTMLElement),
            );
        };

        const ensureLength = () => {
            const minWidth = wrapper.clientWidth * 3;
            let safety = 0;

            while (track.scrollWidth < minWidth && safety < 20) {
                const baseChildren = Array.from(track.children).slice(
                    0,
                    items.length,
                );

                baseChildren.forEach(node => {
                    const clone = node.cloneNode(true) as HTMLElement;
                    removeReactAttrs(clone);
                    track.appendChild(clone);
                });

                safety++;
            }
        };

        const computeLoopWidth = () => {
            if (track.children.length < items.length) return;

            const first = track.children[0] as HTMLElement;
            const last = track.children[items.length - 1] as HTMLElement;

            const rect1 = first.getBoundingClientRect();
            const rect2 = last.getBoundingClientRect();

            loopWidthRef.current = Math.max(1, rect2.right - rect1.left);
        };

        ensureLength();
        computeLoopWidth();

        lastTsRef.current = performance.now();

        const step = (ts: number) => {
            if (!pausedRef.current) {
                const dt = (ts - lastTsRef.current) / 1000;
                offsetRef.current -= speedPxPerSec * dt;

                if (Math.abs(offsetRef.current) >= loopWidthRef.current) {
                    offsetRef.current += loopWidthRef.current;
                }

                track.style.transform = `translateX(${offsetRef.current}px)`;
            }

            lastTsRef.current = ts;
            rafRef.current = requestAnimationFrame(step);
        };

        rafRef.current = requestAnimationFrame(step);


        const pause = () => (pausedRef.current = true);
        const resume = () => (pausedRef.current = false);

        wrapper.addEventListener('mouseenter', pause);
        wrapper.addEventListener('mouseleave', resume);
        wrapper.addEventListener('touchstart', pause, { passive: true });
        wrapper.addEventListener('touchend', resume, { passive: true });

        const onResize = () => {
            ensureLength();
            computeLoopWidth();
        };

        window.addEventListener('resize', onResize);

        document.addEventListener('visibilitychange', () => {
            if (document.hidden && rafRef.current) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            } else if (!document.hidden && !rafRef.current) {
                lastTsRef.current = performance.now();
                rafRef.current = requestAnimationFrame(step);
            }
        });

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', onResize);

            wrapper.removeEventListener('mouseenter', pause);
            wrapper.removeEventListener('mouseleave', resume);
            wrapper.removeEventListener('touchstart', pause);
            wrapper.removeEventListener('touchend', resume);
        };
    }, [items, speedPxPerSec]);

    return (
        <div
            ref={wrapperRef}
            className={`${styles.wrapper} ${className}`}
        >
            <div ref={trackRef} className={styles.track}>
                {items.map((item, i) => (
                    <TickerItem key={`a-${i}`} {...item} />
                ))}
                {items.map((item, i) => (
                    <TickerItem key={`b-${i}`} {...item} />
                ))}
            </div>
        </div>
    );
}

function TickerItem({ flag, country, count }: VacancyItem) {
    return (
        <div className={styles.item}>
            <span className={styles.flag}>{flag}</span>
            <span className={styles.country}>{country}</span>
            <span className={styles.count}>{count.toLocaleString()}</span>
            <span className={styles.label}>vacancies</span>
        </div>
    );
}

"use client";

import { animate, hover } from "motion";
import { splitText } from "motion-plus";
import { useMotionValue } from "motion/react";
import { useEffect, useRef } from "react";

export default function ScatterText() {
    const containerRef = useRef(null);
    const velocityX = useMotionValue(0);
    const velocityY = useMotionValue(0);
    const prevEvent = useRef(0);

    useEffect(() => {
        if (!containerRef.current) return;

        const h1 = containerRef.current.querySelector(".h1");
        if (!h1) return;

        const { chars } = splitText(h1);

        const handlePointerMove = (event) => {
            const now = performance.now();
            const timeSinceLastEvent = Math.max((now - prevEvent.current) / 1000, 0.016); // Prevent division by zero
            prevEvent.current = now;
            velocityX.set(event.movementX / timeSinceLastEvent);
            velocityY.set(event.movementY / timeSinceLastEvent);
        };

        const handlePointerLeave = () => {
            // Reset characters to original position
            chars.forEach((element) => {
                animate(
                    element,
                    { x: 0, y: 0 },
                    { type: "spring", stiffness: 100, damping: 50 }
                );
            });
        };

        h1.addEventListener("pointermove", handlePointerMove);
        h1.addEventListener("pointerleave", handlePointerLeave);

        hover(chars, (element) => {
            const speed = Math.sqrt(
                velocityX.get() * velocityX.get() +
                velocityY.get() * velocityY.get()
            );
            const angle = Math.atan2(velocityY.get(), velocityX.get());
            const distance = speed * 0.1;

            animate(
                element,
                {
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                },
                { type: "spring", stiffness: 100, damping: 50 }
            );
        });

        return () => {
            h1.removeEventListener("pointermove", handlePointerMove);
            h1.removeEventListener("pointerleave", handlePointerLeave);
        };
    }, []);

    return (
        <div className="" ref={containerRef}>
            <h1 className="h1 text-4xl md:text-6xl font-bold tracking-tighter ">
                Grow Your Reach with SocialSync
            </h1>
            <Stylesheet />
        </div>
    );
}

function Stylesheet() {
    return (
        <style>{`
            .split-char {
                will-change: transform, opacity;
            }
        `}</style>
    );
}
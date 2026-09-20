"use client";

import {useState, useRef, useEffect} from 'react';

interface HoverVideoPlayerProps {
    thumbnailSrc: string;
    videoSrc: string;
    linkUrl?: string;
    containerClassName?: string;
    videoClassName?: string;
    title?: string;
    software?: string;
    description?: string;
    /** Buffer the video up-front. Use only on the first 1-2 cards. */
    eager?: boolean;
}

const HoverVideoPlayer = ({
    thumbnailSrc,
    videoSrc,
    linkUrl,
    title,
    software,
    description,
    containerClassName = 'w-full relative overflow-hidden cursor-pointer',
    videoClassName = "w-full h-full object-cover",
    eager = false
}: HoverVideoPlayerProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleClick = () => {
        if (linkUrl) {
            window.location.href = linkUrl;
        }
    };

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isHovered) {
            video.controls = false;

            // Try to play with sound first. Browsers block unmuted autoplay
            // until the user has interacted with the page (any click counts),
            // so we fall back to muted when it's not allowed yet.
            video.muted = false;
            video.play().catch(() => {
                video.muted = true;
                video.play().catch(() => {});
            });
        } else {
            video.pause();
            video.currentTime = 0;
            video.muted = true;
        }
    }, [isHovered]);

     return (
        <div className="flex flex-col group relative text-base sm:text-sm">
        {/* Video Container — always mounted so hover starts instantly.
            The poster shows until the first frame plays. */}
        <div
            className={`relative aspect-video overflow-hidden rounded-lg scale-[1.05px] bg-white dark:bg-gray-900 group-hover:opacity-75 ${containerClassName}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
        >
            <video
                ref={videoRef}
                src={videoSrc}
                poster={thumbnailSrc}
                preload={eager ? "auto" : "metadata"}
                loop
                playsInline
                className={videoClassName}
            />
        </div>
        {/* Text Content Below the Video */}
        <div className="mt-3 flex flex-col">
            {/* Software Name (Small & subtle) */}
            {software && (
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {software}
            </span>
            )}

            {/* Video Name (Bold & prominent) */}
            {title && (
            <a
                href={linkUrl}
                className="block font-medium text-gray-900 dark:text-gray-100 text-lg">
                {title}
            </a>
            )}
            {/* Description (Gray text) */}
            {description && (
            <p className="text-gray-500 dark:text-gray-400">
                {description}
            </p>
            )}
        </div>
        </div>
    );
};
export default HoverVideoPlayer;

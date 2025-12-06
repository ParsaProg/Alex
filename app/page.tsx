"use client";

import { useLanguage } from "@/src/context/languageContext";
import { audioList } from "@/src/data/AudioList";
import { Pause, Play, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [showError, setShowError] = useState(false);
  const inputRef = useRef(null);

  // Add these states OUTSIDE the map at the top of your component
  const [playingItem, setPlayingItem] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Create this function OUTSIDE the map - FIXED
  const audioPlay = (index: number) => {
    if (playingItem === index && isPlaying) {
      // Pause current audio
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      // Stop current audio if playing
      if (audioRef.current && isPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      // Get the audio item
      const audioItem = audioList[index];

      // Create or reuse audio element
      if (!audioRef.current) {
        audioRef.current = new Audio(audioItem.audioPath);
      } else {
        audioRef.current.src = audioItem.audioPath;
      }

      // Play the audio
      audioRef.current
        .play()
        .then(() => {
          setPlayingItem(index);
          setIsPlaying(true);
        })
        .catch((error: any) => {
          console.error("Error playing audio:", error);
          setPlayingItem(null);
          setIsPlaying(false);
        });

      // Handle when audio ends
      audioRef.current.onended = () => {
        setPlayingItem(null);
        setIsPlaying(false);
      };

      // Handle errors
      audioRef.current.onerror = () => {
        setPlayingItem(null);
        setIsPlaying(false);
      };
    }
  };

  // Cleanup useEffect
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, []);

  const handleInput = (e: any) => {
    const value = e.target.value;
    const maxPages = 136;

    // Remove non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, "");
    e.target.value = numericValue;

    if (numericValue && Number(numericValue) > maxPages) {
      // Show error
      setShowError(true);

      // Trigger phone vibration (if supported)
      if (navigator.vibrate) {
        navigator.vibrate(200); // Vibrate for 200ms
      }

      // Reset to max value
      e.target.value = maxPages.toString();
    } else {
      setShowError(false);
    }
  };

  const { lang } = useLanguage();

  return (
    <div className="sm:w-[80%] w-[90%] mx-auto">
      <div className="relative w-full">
        {/* Error message */}
        {showError && (
          <div className="mb-2 text-red-500 text-sm font-medium animate-pulse">
            {lang === "fa"
              ? "حداکثر تعداد صفحات ۱۳۶ است"
              : "Maximum pages is 136"}
          </div>
        )}

        <div className="group relative w-full">
          {/* Error state red border */}
          <div
            className={`absolute -inset-[2px] rounded-xl ${
              showError
                ? "bg-red-500/40 ring-2 ring-red-500"
                : "group-focus-within:bg-blue-500/40"
            } blur-sm transition-all duration-300 ${
              showError
                ? "opacity-100"
                : "opacity-0 group-focus-within:opacity-100"
            }`}
          ></div>

          {/* Main container with error border */}
          <div
            className={`relative w-full rounded-xl border overflow-hidden bg-white dark:bg-neutral-900 transition-all duration-300 ${
              showError
                ? "border-red-500 dark:border-red-500 ring-1 ring-red-500"
                : "border-neutral-300 dark:border-neutral-800"
            }`}
          >
            <Search
              size={18}
              className={`absolute top-[50%] translate-y-[-50%] ${
                lang === "en" ? "left-3" : "right-3"
              } ${
                showError
                  ? "text-red-500 dark:text-red-400"
                  : "text-neutral-600 dark:text-neutral-400"
              }`}
            />

            <div
              className={`absolute top-[50%] text-sm translate-y-[-50%] border dark:border-neutral-700 border-neutral-300 p-2 rounded-lg dark:text-neutral-400 text-nerutral-600 ${
                lang === "en" ? "right-1" : "left-1"
              }`}
            >
              8 {lang === "en" ? "to" : "تا"} 136
            </div>
            <input
              ref={inputRef}
              onInput={handleInput}
              inputMode="numeric"
              type="number"
              max={136}
              placeholder={
                lang === "fa"
                  ? "صفحه مورد نظر را پیدا کنید"
                  : "Find your page you want"
              }
              className={`w-full outline-none border-none py-3 px-10 bg-transparent placeholder:font-thin transition-colors duration-300 ${
                showError
                  ? "text-red-600 dark:text-red-400 placeholder:text-red-400/70"
                  : "dark:placeholder:text-neutral-400 placeholder:text-neutral-600"
              } [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-moz-appearance]:textfield`}
            />
          </div>
        </div>
      </div>
      <section className="mt-8 w-full md:grid-cols-2 xl:grid-cols-3 grid-cols-1 grid gap-5">
        {audioList.map((item, _i) => {
          const [duration, setDuration] = useState("0:00");
          const [loading, setLoading] = useState(false);

          useEffect(() => {
            if (duration === "0:00" && !loading) {
              loadDuration();
            }
          }, []);

          const loadDuration = () => {
            if (duration !== "0:00" || loading) return;

            setLoading(true);
            const audio = new Audio();
            audio.preload = "metadata";
            audio.src = item.audioPath;
            audio.onloadedmetadata = () => {
              const minutes = Math.floor(audio.duration / 60);
              const seconds = Math.floor(audio.duration % 60);
              setDuration(`${minutes}:${seconds.toString().padStart(2, "0")}`);
              setLoading(false);
            };

            audio.onerror = () => {
              setLoading(false);
              audio.src = "";
            };
          };

          return (
            <div
              className="w-full rounded-xl bg-transparent border dark:border-neutral-800 border-neutral-300 p-5 flex flex-col items-start gap-y-2"
              key={_i}
            >
              {/* Your existing content */}
              <div className="flex items-center justify-between w-full">
                <div className="dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg p-2 text-sm">
                  {lang === "en" ? "Page" : "صفحه"} {item.page}
                </div>

                <div
                  className={`flex items-center gap-x-2 ${
                    lang === "en" ? "pl-2 pr-1" : "pl-1 pr-2"
                  } py-1 rounded-lg border dark:border-neutral-800 border-neutral-300`}
                >
                  <h1 className="text-sm">
                    {lang === "en" ? "Listen time" : "زمان موردنیاز"}
                  </h1>
                  <div className="flex items-center gap-2">
                    {loading ? (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                        <span className="text-xs">
                          {lang === "en" ? "Loading" : "در حال بارگذاری"}...
                        </span>
                      </div>
                    ) : (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-950 dark:border-neutral-800 border-neutral-300 border rounded text-sm">
                        ⏱ {duration}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <h1>
                {lang === "en"
                  ? "How to speak english Fluently"
                  : "چطور انگلیسی را روان صحبت کنیم"}{" "}
                <strong className="font-bold">
                  {lang === "en" ? "Page" : "صفحه"} {item.page}
                </strong>{" "}
              </h1>
              <div className="w-full flex items-center sm:flex-row flex-row justify-between">
                <h1 className="font-bold dark:text-neutral-300 text-neutral-700">
                  {lang === "en"
                    ? "listen to the pronounciation"
                    : "به تلفظ صحیح گوش کن"}
                </h1>
                <motion.div
                  onClick={() => audioPlay(_i)}
                  whileTap={{ scale: 0.94 }}
                  className="flex items-center gap-x-2 dark:text-white text-black border dark:border-neutral-800 border-neutral-300 rounded-lg p-2 "
                >
                  {playingItem === _i && isPlaying ? (
                    <Pause size={18} />
                  ) : (
                    <Play size={18} />
                  )}
                </motion.div>
              </div>
            </div>
          );
        })}
      </section>
      
    </div>
  );
}

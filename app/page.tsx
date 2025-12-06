"use client";

import { useLanguage } from "@/src/context/languageContext";
import { audioList } from "@/src/data/AudioList";
import { Pause, Play, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Create a separate component for the audio card to use hooks properly
function AudioCard({ 
  item, 
  playingPage, 
  isPlaying, 
  onPlay, 
  lang 
}: { 
  item: any; 
  playingPage: number | null; 
  isPlaying: boolean; 
  onPlay: (page: number) => void; 
  lang: string; 
}) {
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
      key={item.page}
    >
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
          onClick={() => onPlay(item.page)}
          whileTap={{ scale: 0.94 }}
          className="flex items-center gap-x-2 dark:text-white text-black border dark:border-neutral-800 border-neutral-300 rounded-lg p-2 cursor-pointer"
        >
          {playingPage === item.page && isPlaying ? (
            <Pause size={18} />
          ) : (
            <Play size={18} />
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default function Home() {
  const [showError, setShowError] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredItems, setFilteredItems] = useState(audioList);
  const inputRef = useRef<HTMLInputElement>(null);

  // Audio states - track by PAGE NUMBER, not array index
  const [playingPage, setPlayingPage] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentPageRef = useRef<number | null>(null); // Track which page is currently loaded

  const audioPlay = (page: number) => {
    if (playingPage === page && isPlaying) {
      // Pause current audio - DON'T reset to 0!
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      // Stop current audio if playing a DIFFERENT page
      if (audioRef.current && isPlaying && currentPageRef.current !== page) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Reset only when switching to different audio
      }

      // Find the audio item by page number in the original list
      const audioItem = audioList.find(item => item.page === page);
      
      if (!audioItem) {
        console.error("Audio item not found for page:", page);
        return;
      }

      // If clicking on the same page that was paused, just resume it
      if (currentPageRef.current === page && audioRef.current && !isPlaying) {
        audioRef.current.play()
          .then(() => {
            setPlayingPage(page);
            setIsPlaying(true);
          })
          .catch((error: any) => {
            console.error("Error resuming audio:", error);
          });
        return;
      }

      // Otherwise, load new audio
      currentPageRef.current = page;
      
      // Create or reuse audio element
      if (!audioRef.current) {
        audioRef.current = new Audio(audioItem.audioPath);
      } else {
        // Only reset if it's a different audio
        if (audioRef.current.src !== audioItem.audioPath) {
          audioRef.current.src = audioItem.audioPath;
          audioRef.current.currentTime = 0;
        }
      }

      // Play the audio
      audioRef.current
        .play()
        .then(() => {
          setPlayingPage(page);
          setIsPlaying(true);
        })
        .catch((error: any) => {
          console.error("Error playing audio:", error);
          setPlayingPage(null);
          setIsPlaying(false);
          currentPageRef.current = null;
        });

      // Handle when audio ends
      audioRef.current.onended = () => {
        setPlayingPage(null);
        setIsPlaying(false);
        currentPageRef.current = null;
      };

      // Handle errors
      audioRef.current.onerror = () => {
        setPlayingPage(null);
        setIsPlaying(false);
        currentPageRef.current = null;
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
        currentPageRef.current = null;
      }
    };
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const maxPages = 136;

    // Remove non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, "");
    
    // Update the search value
    setSearchValue(numericValue);

    if (numericValue && Number(numericValue) > maxPages) {
      // Show error
      setShowError(true);

      // Trigger phone vibration (if supported)
      if (navigator.vibrate) {
        navigator.vibrate(200); // Vibrate for 200ms
      }

      // Reset to max value
      e.target.value = maxPages.toString();
      setSearchValue(maxPages.toString());
    } else {
      setShowError(false);
    }

    // Filter audio list based on search
    if (numericValue === "") {
      setFilteredItems(audioList);
    } else {
      const filtered = audioList.filter(item => 
        item.page.toString().includes(numericValue)
      );
      setFilteredItems(filtered);
    }
  };

  const handleClearSearch = () => {
    setSearchValue("");
    setFilteredItems(audioList);
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
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
            
            {/* Clear button when there's search value */}
            {searchValue && (
              <button
                onClick={handleClearSearch}
                className={`absolute top-[50%] translate-y-[-50%] text-sm ${
                  lang === "en" ? "right-20" : "left-20"
                } text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors`}
              >
                {lang === "fa" ? "پاک کردن" : "Clear"}
              </button>
            )}

            <input
              ref={inputRef}
              onChange={handleInput}
              inputMode="numeric"
              type="number"
              max={136}
              placeholder={
                lang === "fa"
                  ? "شماره صفحه را وارد کنید (۸-۱۳۶)"
                  : "Enter page number (8-136)"
              }
              className={`w-full outline-none border-none py-3 px-10 bg-transparent placeholder:font-thin transition-colors duration-300 ${
                showError
                  ? "text-red-600 dark:text-red-400 placeholder:text-red-400/70"
                  : "dark:placeholder:text-neutral-400 placeholder:text-neutral-600"
              } [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-moz-appearance]:textfield`}
            />
          </div>
        </div>

        {/* Search results info */}
        {searchValue && (
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              {lang === "fa" ? (
                <>
                  <span className="font-semibold">{filteredItems.length}</span> نتیجه برای صفحه‌ی "
                  <span className="font-semibold">{searchValue}</span>"
                </>
              ) : (
                <>
                  <span className="font-semibold">{filteredItems.length}</span> results for page "
                  <span className="font-semibold">{searchValue}</span>"
                </>
              )}
            </div>
            <button
              onClick={handleClearSearch}
              className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              {lang === "fa" ? "نمایش همه صفحات" : "Show all pages"}
            </button>
          </div>
        )}
      </div>

      <section className="mt-8 w-full md:grid-cols-2 xl:grid-cols-3 grid-cols-1 grid gap-5">
        {filteredItems.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-neutral-500 dark:text-neutral-400 mb-4">
              {lang === "fa" ? "😞 هیچ صفحه‌ای یافت نشد" : "😞 No pages found"}
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-500 mb-4">
              {lang === "fa" 
                ? `صفحه‌ای با شماره "${searchValue}" وجود ندارد. لطفاً شماره‌ای بین ۸ تا ۱۳۶ وارد کنید.`
                : `No page with number "${searchValue}" exists. Please enter a number between 8 and 136.`
              }
            </p>
            <button
              onClick={handleClearSearch}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {lang === "fa" ? "نمایش همه صفحات" : "Show all pages"}
            </button>
          </div>
        ) : (
          filteredItems.map((item) => (
            <AudioCard
              key={item.page}
              item={item}
              playingPage={playingPage}
              isPlaying={isPlaying}
              onPlay={audioPlay}
              lang={lang}
            />
          ))
        )}
      </section>
    </div>
  );
}
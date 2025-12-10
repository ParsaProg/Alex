"use client";

import {  Github, Rocket, User, Zap } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import ParsaShaabani1 from "@/public/images/parsa-shaabani-1.jpg";
import ParsaShaabani2 from "@/public/images/parsa-shaabani-2.jpg";
import ParsaShaabani3 from "@/public/images/parsa-shaabani-3.jpg";
import { useEffect, useState } from "react";

export default function DeveloperAbout() {
  const [pictureIndex, setPictureIndex] = useState<number>(0);
  useEffect(() => {
    const changeIndexInterval = setInterval(() => {
      if (pictureIndex < 2) {
        setPictureIndex((pictureIndexPreValue) => (pictureIndexPreValue += 1));
      } else setPictureIndex(0);
    }, 10000);

    return () => clearInterval(changeIndexInterval);
  }, [pictureIndex, setPictureIndex]);
  return (
    <div className="flex flex-col gap-y-10 sm:w-[80%] w-[90%] mx-auto mt-[150px]">
      <section className="text-center flex flex-col items-center gap-y-3 w-full justify-center">
        <h1 className="font-bold sm:text-5xl text-4xl">I made this for you</h1>
        <h3 className="sm:text-lg text-md dark:text-neutral-400 text-neutral-700">
          I'm{" "}
          <strong className="font-bold dark:text-neutral-300 text-neutral-800">
            Parsa-Shaabani
          </strong>{" "}
          from Fars/Shiraz, NextJs and typescript developer.
        </h3>
        <h3 className="text-sm dark:text-[#4ADE80] text-[#1aa24c] font-medium">
          Inspired by others, I share my open-source derived work with the
          community.
        </h3>
        <div className="flex items-center gap-x-3 mt-2 font-semibold text-sm">
          <motion.div whileTap={{ scale: 0.91 }}>
            <a
              target="_blank"
              href={"https://github.com/parsaprog"}
              className="flex items-center gap-x-2 p-3 rounded-lg border dark:border-neutral-800 border-neutral-300 dark:hover:bg-neutral-800 hover:bg-neutral-300 transition-all duration-200"
            >
              <Github size={18} />
              GitHub
            </a>
          </motion.div>
          <motion.a
            target="_blank"
            href={"https://parsashaabani.ir"}
            whileTap={{ scale: 0.91 }}
            className="flex items-center p-3 rounded-lg dark:bg-white dark:text-black text-white bg-black"
          >
            My wesbite
          </motion.a>
        </div>
      </section>
      <section className="gap-y-3 overflow-y-hidden relative min-[1150px]:max-w-[1000px] max-w-full mx-auto w-full py-10 flex flex-col items-start border-t dark:border-t-neutral-700 border-neutral-400 ">
        <div className="min-[1150px]:opacity-[0.2] opacity-[0.3] left-[50%] translate-x-[-50%] absolute -top-16 dark:bg-blue-400 bg-blue-600 min-[1150px]:w-[600px] w-[40vw] h-[130px] rounded-xl blur-[80px]"></div>
        <h5 className="font-medium dark:text-blue-400 text-blue-600 text-sm">
          Introduction
        </h5>
        <h1 className="font-semibold sm:text-5xl text-3xl">
          Building confidence and containers.
        </h1>
        <div className="flex max-[1200px]:flex-col flex-row items-start gap-5 w-full min-[1200px]:mt-5">
          <p className="sm:text-md text-sm font-normal min-[1200px]:w-[50%]">
            'm a DevOps and Platform Engineering enthusiast from Zaandam, The
            Netherlands. I studied data science and machine learning at the
            Vrije Universiteit, where I adopted skills in Python, JavaScript,
            and Linux.
            <br />
            <br />
            In my free time, I enjoy working on personal projects or playing
            games with friends. Beyond the screens, you can find me vibing to
            vinyl, watching movies, attending concerts and festivals, and
            sharing laughs with my oversized cat and amazing girlfriend. I also
            enjoy a good whiskey and am always up for a chat or ready to help.
            <br />
            <br />
            At Triple, I provided cloud services for clients like HEINEKEN, BAM,
            and citizenM, using Akamai, Azure, and Azure DevOps to create and
            maintain robust, scalable cloud infrastructures.
            <br />
            <br />
            Currently, I work at Blender, creating free and open-source 3D
            software. I streamline the build, test, and release processes for
            Blender and related services, aiming to improve both the user and
            developer experience.
          </p>
          <div
            className={`relative min-[1200px]:w-[50%] w-full  ${
              pictureIndex === 1 && "max-[1200px]:h-[120vw]"
            } ${
              pictureIndex !== 1 && "max-[1200px]:h-[87vw]"
            } rounded-xl overflow-hidden transition-all duration-200`}
          >
            <AnimatePresence mode="wait">
              {pictureIndex === 0 && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                  }}
                  transition={{ duration: 0.3 }}
                  key={"parsa-shaabani-1"}
                >
                  <PictureContainer src={ParsaShaabani1.src} />
                </motion.div>
              )}
              {pictureIndex === 1 && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                  }}
                  transition={{ duration: 0.3 }}
                  key={"parsa-shaabani-2"}
                >
                  <PictureContainer src={ParsaShaabani2.src} />
                </motion.div>
              )}
              {pictureIndex === 2 && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                  }}
                  transition={{ duration: 0.3 }}
                  key={"parsa-shaabani-3"}
                >
                  <PictureContainer src={ParsaShaabani3.src} />
                </motion.div>
              )}
            </AnimatePresence>
            <div className="absolute flex items-center gap-x-3 left-[50%] translate-x-[-50%] bottom-3">
              <ButtonSwitcherPictures
                pictureIndex={pictureIndex}
                index={0}
                setPictureIndex={setPictureIndex}
              />
              <ButtonSwitcherPictures
                pictureIndex={pictureIndex}
                index={1}
                setPictureIndex={setPictureIndex}
              />
              <ButtonSwitcherPictures
                pictureIndex={pictureIndex}
                index={2}
                setPictureIndex={setPictureIndex}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export const PictureContainer = ({ src }: { src: string }) => {
  return (
    <Image
      draggable={false}
      width={1000}
      height={1000}
      unoptimized
      alt="Parsa-Shaabani | پارسا شعبانی"
      src={src}
      className={`w-full ${
        src === ParsaShaabani2.src ? "h-[650px]" : "h-[500px]"
      } z-1 ${src === ParsaShaabani2.src && "max-[1200px]:h-[120vw]"} ${
        src !== ParsaShaabani2.src && "max-[1200px]:h-[87vw]"
      }`}
    />
  );
};

export const ButtonSwitcherPictures = ({
  index,
  setPictureIndex,
  pictureIndex,
}: {
  index: number;
  setPictureIndex: (val: number) => void;
  pictureIndex: number;
}) => {
  return (
    <motion.div whileTap={{ scale: 0.91 }}>
      <button
        onClick={() => setPictureIndex(index)}
        className={`${
          pictureIndex === index ? "opacity-100" : "opacity-70"
        } transition-opacity duration-200 p-3 rounded-lg bg-black text-white`}
      >
        {index === 0 ? (
          <User size={18} />
        ) : index === 1 ? (
          <Rocket size={18} />
        ) : (
          <Zap size={18} />
        )}
      </button>
    </motion.div>
  );
};

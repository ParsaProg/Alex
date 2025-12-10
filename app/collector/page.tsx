"use client";

import RahimSaedi from "@/public/images/rahim-saedi.png";
import { useLanguage } from "@/src/context/languageContext";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export default function CollectorInfo() {
  const [isPictureLoad, setIsPictureLoad] = useState<boolean>(false);
  const { lang } = useLanguage();
  return (
    <div className="flex flex-col gap-y-10 sm:w-[80%] w-[90%] mx-auto mt-[150px] overflow-hidden">
      <div className="w-full flex gap-y-10 max-[1100px]:flex-col-reverse items-center gap-x-5">
        <section className="flex flex-col items-start gap-y-5">
          <motion.span
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: -100 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ delay: 1 }}
            className="animate-pulse dark:bg-white bg-black rounded-md w-28 h-2"
          ></motion.span>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ delay: 0.2 }}
            className="md:text-5xl font-bold text-2xl w-full bg-linear-to-b dark:from-slate-600 dark:to-white text-transparent bg-clip-text"
          >
            How to speak english fluently <br /> I'm Rahim-Saedi
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ delay: 0.4 }}
            className=" md:text-md text-sm dark:text-neutral-300 text-neutral-700 w-full leading-7"
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis
            ratione et laboriosam velit, blanditiis perferendis sed! Esse omnis
            dolores necessitatibus eligendi unde eius voluptas distinctio, culpa
            sed inventore molestiae ducimus.
          </motion.p>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ delay: 1 }}
            className="my-3 w-full h-px dark:bg-neutral-800 bg-neutral-300"
          />
          <section className="flex items-center min-[1100px]:gap-x-20 max-[1100px]:w-full gap-x-5">
            <div className="flex gap-x-3 items-center">
              <motion.p
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, x: -100 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ delay: 0.5 }}
                className="w-full inline font-bold md:text-6xl text-5xl max-[480px]:text-xl"
              >
                12
                <strong className="dark:text-blue-500 text-blue-600">+</strong>
              </motion.p>
              <motion.p
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, x: -100 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ delay: 0.6 }}
                className="w-full inline font-bold max-[480px]:text-xs text-sm"
              >
                Years of
                <br />
                experience
              </motion.p>
            </div>
            <div className="flex max-[480px]:gap-x-1 gap-x-3 items-center">
              <motion.p
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, x: -100 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ delay: 0.7 }}
                className="inline font-bold md:text-6xl text-5xl  max-[480px]:text-xl"
              >
                150
                <strong className="dark:text-blue-500 text-blue-600">+</strong>
              </motion.p>
              <motion.p
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, x: -100 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ delay: 0.8 }}
                className="inline font-bold text-sm max-[480px]:text-xs"
              >
                Successfull
                <br />
                projects
              </motion.p>
            </div>
            <div className="flex gap-x-2">
              <p className="inline font-bold md:text-6xl text-5xl  max-[480px]:text-3xl"></p>
            </div>
          </section>
        </section>
        <div className="max-[1100px]:w-[300px] w-[800px] rounded-full bg-[#29323E] p-3 overflow-hidden">
          <Image
            onLoad={() => setIsPictureLoad(true)}
            draggable={false}
            src={RahimSaedi.src}
            alt="Rahim-Saedi | رحیم ساعدی"
            width={800}
            height={800}
            className={`max-[1100px]:w-[300px] w-[800px] ${isPictureLoad? "grayscale-0 blur-[0px]": "blur-[100px] grayscale-100"} transition-all duration-100`}
          />
        </div>
      </div>
    </div>
  );
}

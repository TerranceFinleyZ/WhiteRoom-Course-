"use client";

import { motion } from "framer-motion";
import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

type SliderCard = {
  id: number;
  bg: string;
  image?: string;
  text?: string;
  verticalText?: boolean;
  link?: string;
  bottomText?: string;
};

const cards: SliderCard[] = [
  {
    id: 1,
    bg: "bg-neutral-200",
    image: "/whiteeye.png",
    link: "https://apps.apple.com/us/iphone/apps",
  },
  { id: 2, bg: "bg-neutral-300", image: "/Socialproof.png", text: "" },
  {
    id: 3,
    bg: "bg-neutral-100",
    image: "/Patr.png",
    text: "Support us on Patreon",
    link: "https://www.patreon.com/cw/WhiteRoom132",
  },
  {
    id: 4,
    bg: "bg-neutral-200",
    image: "/school.png",
    text: "Online classes are the Future",
  },
  {
    id: 5,
    bg: "bg-neutral-300",
    image: "/hallway.png",
    text: "エリート",
    verticalText: true,
    bottomText: "Enroll Now before the Bell rings",
  },
];

const programmeItems = [
  { label: "Zoom", bg: "bg-neutral-100", image: "/zoome.png" },
  { label: "Slack", bg: "bg-neutral-200", image: "/OIP.webp" },
  { label: "WR", bg: "bg-neutral-100", image: "/appswhite.png" },
  { label: "Laptop/Desktop", bg: "bg-neutral-200", image: "/laptop.jpg", jpText: "マインド" },
  { label: "Paper & Pen", bg: "bg-neutral-100", image: "/pen.avif" },
];

const lectureTopics = [
  { label: "Political Science", image: "/Poli.jpg" },
  { label: "Liberal Arts", image: "/libra.jpg" },
  { label: "Wealth", image: "/dollar.jpg" },
  { label: "Religion", image: "/relig.jpg" },
  { label: "Leadership", image: "/chesss.jpg" },
  { label: "Manipulation", image: "/man.jpg" },
];

const faqItems = [
  {
    question: "How long is the Alpha program?",
    answer: "Project Alpha is an intensive 1-Month program with structured weekly modules and guided assignments.",
  },
  {
    question: "How many programs or classes will there be in the future?",
    answer: "This is the Alpha, or A Class. We will also be running Bravo, Charlie, and Delta - and finally, the Elite Class Echo, which will bring together the winners and runners-up from all previous classes for one ultimate final.",
  },
  {
    question: "How many classmates can win?",
    answer: "Only one will be crowned the Elite Student, but we will also have 2nd and 3rd place.",
  },
  {
    question: "Will there be live sessions?",
    answer: "Yes. Live sessions are scheduled every day during the program, with a class of up to 30+ other students. All cameras must remain on at all times.",
  },
  {
    question: "What if we get eliminated or lose?",
    answer: "If you get eliminated or lose, depending on your performance, you may have an opportunity to join future White Room programs — Classes B, C, D, and E.",
  },
  {
    question: "What If I win the event?",
    answer: "If you claim 1st place in your class, you will ascend as a VIP to the Echo Final Class — a chamber reserved exclusively for champions. There, you will face the other victors, each sharpened by their own trials. Should you triumph in the Final, you will be crowned The One Above All — The Elite Student — and granted the Grand Prize. As nature is confidential; only those worthy of victory will ever learn what it is. See you in the White Room.",
  },
];

const getCardStyle = (index: number, current: number, total: number) => {
  const offset = index - current;
  // Wrap around
  let adjustedOffset = offset;
  if (offset > Math.floor(total / 2)) adjustedOffset = offset - total;
  if (offset < -Math.floor(total / 2)) adjustedOffset = offset + total;

  if (adjustedOffset === 0) {
    return { x: "0%", y: "0%", scale: 1, rotate: 0, opacity: 1, zIndex: 10 };
  }
  if (adjustedOffset === 1) {
    return { x: "100%", y: "5%", scale: 0.88, rotate: 2, opacity: 1, zIndex: 5 };
  }
  if (adjustedOffset === -1) {
    return { x: "-100%", y: "5%", scale: 0.88, rotate: -2, opacity: 1, zIndex: 5 };
  }
  if (adjustedOffset === 2) {
    return { x: "200%", y: "10%", scale: 0.8, rotate: 4, opacity: 0, zIndex: 1 };
  }
  if (adjustedOffset === -2) {
    return { x: "-200%", y: "10%", scale: 0.8, rotate: -4, opacity: 0, zIndex: 1 };
  }
  return { x: `${adjustedOffset * 100}%`, y: "10%", scale: 0.75, rotate: adjustedOffset * 2, opacity: 0, zIndex: 0 };
};

export default function Home() {
  const [current, setCurrent] = useState(2);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showQuizPopup, setShowQuizPopup] = useState(true);

  const prev = useCallback(
    () => setCurrent((c) => (c === 0 ? cards.length - 1 : c - 1)),
    []
  );
  const next = useCallback(
    () => setCurrent((c) => (c === cards.length - 1 ? 0 : c + 1)),
    []
  );

  // Auto-slide
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c === cards.length - 1 ? 0 : c + 1));
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const resetAutoSlide = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c === cards.length - 1 ? 0 : c + 1));
    }, 4000);
  }, []);

  const handlePrev = useCallback(() => { prev(); resetAutoSlide(); }, [prev, resetAutoSlide]);
  const handleNext = useCallback(() => { next(); resetAutoSlide(); }, [next, resetAutoSlide]);

  return (
    <>
    {showQuizPopup && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4">
        <div
          className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-cover bg-center p-10 text-center shadow-2xl"
          style={{ backgroundImage: "url('/persoimag.jpg')" }}
        >
          <button
            type="button"
            onClick={() => setShowQuizPopup(false)}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-xl text-white transition-colors hover:bg-black/80"
          >
            &times;
          </button>
          <div className="flex min-h-[420px] flex-col items-center justify-end gap-6 pt-32">
            <h2 className="text-3xl font-bold text-white drop-shadow-md sm:text-5xl">
              Free Personality Quiz
            </h2>
            <Link
              href="/WR-personality-quiz"
              className="rounded-full bg-white px-8 py-4 text-lg font-semibold text-black transition-colors hover:bg-white/90"
            >
              Start Quiz
            </Link>
          </div>
        </div>
      </div>
    )}
    <div
      className="relative flex min-h-screen flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/Cl.jpg')" }}
    >
      {/* Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 sm:gap-8 rounded-full px-5 sm:px-8 py-2 text-sm backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg"
      >
        <a
          href="#lectures"
          className="text-sm sm:text-lg font-semibold text-white tracking-wide hover:text-white/70 transition-colors"
        >
          Lectures
        </a>
        <a
          href="#study"
          className="text-sm sm:text-lg font-semibold text-white tracking-wide hover:text-white/70 transition-colors"
        >
          Study
        </a>
        <a
          href="#faq"
          className="text-sm sm:text-lg font-semibold text-white tracking-wide hover:text-white/70 transition-colors"
        >
          FAQ
        </a>
      </motion.nav>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-5xl sm:text-7xl font-extrabold tracking-tight drop-shadow-lg md:text-9xl bg-gradient-to-r from-white via-white/70 to-white/40 bg-clip-text text-transparent"
        >
          White Room
        </motion.h1>
        <motion.p
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="mt-4 text-xl sm:text-2xl font-medium text-white/90 drop-shadow md:text-3xl"
        >
          Project Alpha
        </motion.p>
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
        >
          <Link
            href="/Erolling"
            className="mt-8 inline-block rounded-full px-8 py-3 text-sm sm:text-base font-semibold text-white tracking-wide backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg transition-all duration-300 hover:bg-red-600 hover:border-red-600"
          >
            Enroll Now
          </Link>
        </motion.div>
      </main>
      {/* Bottom fade to white */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent" />
    </div>

    {/* Angled Carousel — bleeds between hero and next section */}
    <div className="relative z-10 -mt-40">
      <div className="relative mx-auto flex h-[28rem] items-center justify-center overflow-hidden sm:h-[32rem]">
        {/* Cards */}
        {cards.map((card, i) => {
          const style = getCardStyle(i, current, cards.length);
          return (
            <motion.div
              key={card.id}
              animate={{
                x: style.x,
                y: style.y,
                scale: style.scale,
                rotate: style.rotate,
                opacity: style.opacity,
              }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              style={{ zIndex: style.zIndex }}
              className={`absolute aspect-[16/10] w-[60vw] sm:w-[50vw] max-w-2xl rounded-2xl shadow-md overflow-hidden ${card.bg}`}
            >
              {card.image && (
                card.link ? (
                  <a href={card.link} target="_blank" rel="noreferrer" className="relative block h-full w-full">
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      className="object-cover"
                    />
                    {card.text !== "" && (
                      <span
                        className={`absolute font-semibold drop-shadow-lg ${
                          card.verticalText
                            ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl sm:text-7xl text-red-600 tracking-[0.2em] [writing-mode:vertical-rl] [text-orientation:upright]"
                            : "bottom-4 left-0 right-0 text-center text-sm sm:text-base text-white"
                        }`}
                      >
                        {card.text ?? "Download the WR App Now"}
                      </span>
                    )}
                    {card.bottomText && (
                      <span className="absolute bottom-4 left-0 right-0 text-center text-sm sm:text-base font-semibold text-white drop-shadow-lg">
                        {card.bottomText}
                      </span>
                    )}
                  </a>
                ) : (
                  <>
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      className="object-cover"
                    />
                    {card.text !== "" && (
                      <span
                        className={`absolute font-semibold drop-shadow-lg ${
                          card.verticalText
                            ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl sm:text-7xl text-red-600 tracking-[0.2em] [writing-mode:vertical-rl] [text-orientation:upright]"
                            : "bottom-4 left-0 right-0 text-center text-sm sm:text-base text-white"
                        }`}
                      >
                        {card.text ?? "Download the WR App Now"}
                      </span>
                    )}
                    {card.bottomText && (
                      <span className="absolute bottom-4 left-0 right-0 text-center text-sm sm:text-base font-semibold text-white drop-shadow-lg">
                        {card.bottomText}
                      </span>
                    )}
                  </>
                )
              )}
            </motion.div>
          );
        })}

        {/* Left control */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-0 z-20 h-full w-1/3 cursor-pointer bg-transparent"
          aria-label="Previous"
        />
        {/* Right control */}
        <button
          onClick={handleNext}
          className="absolute right-0 top-0 z-20 h-full w-1/3 cursor-pointer bg-transparent"
          aria-label="Next"
        />
      </div>
    </div>

    {/* Experience text */}
    <div className="bg-white pt-4 pb-16 sm:py-16 text-center">
      <h2 className="text-xl sm:text-2xl font-medium md:text-3xl bg-gradient-to-r from-neutral-500 via-neutral-400 to-neutral-300 bg-clip-text text-transparent">
        &ldquo;Experience the White Room&rdquo;
      </h2>

      {/* Ivy League Seals Banner */}
      <div className="mt-28 sm:mt-32 md:mt-40 flex items-center justify-center gap-10 sm:gap-16 md:gap-20">
        <motion.a
          href="https://www.harvard.edu/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0 }}
        >
          <span className="text-xs sm:text-sm md:text-base font-semibold text-neutral-400">Harvard</span>
          <Image src="/seals/harvard.svg" alt="Harvard" width={120} height={120} className="h-16 w-16 sm:h-20 sm:w-20 md:h-32 md:w-32 lg:h-36 lg:w-36 object-contain transition-transform duration-300 hover:scale-110" />
        </motion.a>
        <motion.a
          href="https://www.yale.edu/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          <span className="text-xs sm:text-sm md:text-base font-semibold text-neutral-400">Yale</span>
          <Image src="/seals/yale.svg" alt="Yale" width={120} height={120} className="h-16 w-16 sm:h-20 sm:w-20 md:h-32 md:w-32 lg:h-36 lg:w-36 object-contain transition-transform duration-300 hover:scale-110" />
        </motion.a>
        <motion.a
          href="https://www.psu.edu/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
        >
          <span className="text-xs sm:text-sm md:text-base font-semibold text-neutral-400">Penn</span>
          <Image src="/seals/penn.svg" alt="Penn" width={120} height={120} className="h-16 w-16 sm:h-20 sm:w-20 md:h-32 md:w-32 lg:h-36 lg:w-36 object-contain transition-transform duration-300 hover:scale-110" />
        </motion.a>
      </div>
      <p className="mt-8 sm:mt-10 text-sm sm:text-base md:text-lg text-neutral-500 font-medium">
        Research is required from the most prestigious universities in the United States.
      </p>
    </div>

    {/* Programmes Section */}
    <div className="bg-white py-16 sm:py-24 text-center">
      <h2 className="text-xl sm:text-2xl font-medium md:text-3xl bg-gradient-to-r from-neutral-500 via-neutral-400 to-neutral-300 bg-clip-text text-transparent">
        &ldquo;Join the first of its kind&rdquo;
      </h2>
      <p className="mt-4 text-sm sm:text-base md:text-lg text-neutral-500 font-medium">
        Supplies needed for Project Alpha
      </p>

      {/* Programme Carousel */}
      <ProgrammeCarousel />
    </div>

    {/* Developed Personality Section */}
    <div id="video-section" className="bg-white pt-4 pb-16 sm:py-16 text-center">
      <h2 className="text-xl sm:text-2xl font-medium md:text-3xl bg-gradient-to-r from-neutral-500 via-neutral-400 to-neutral-300 bg-clip-text text-transparent">
        &ldquo;Develop an elitist mindset.&rdquo;
      </h2>
      <p className="mt-8 sm:mt-10 text-sm sm:text-base md:text-lg text-neutral-500 font-medium">
        What is the White Room?
      </p>
      <div className="mt-12 sm:mt-16 flex justify-center">
        <video
          className="w-full max-w-4xl aspect-video bg-neutral-200 rounded-2xl shadow-md"
          controls
          poster="/fesxthumbnail.png"
        >
          <source src="/WhiteRoomvideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <Link
        href="/Erolling"
        className="mt-8 inline-block rounded-full px-8 py-3 text-sm sm:text-base font-semibold text-neutral-500 tracking-wide backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg transition-all duration-300 hover:bg-red-600 hover:border-red-600"
      >
        Enroll Now
      </Link>
    </div>

    {/* Strategies Section */}
    <div id="lectures" className="bg-white pt-4 pb-16 sm:py-16 text-center">
      <h2 className="text-xl sm:text-2xl font-medium md:text-3xl bg-gradient-to-r from-neutral-500 via-neutral-400 to-neutral-300 bg-clip-text text-transparent">
        &ldquo;Learn how to bend reality&rdquo;
      </h2>
      <p className="mt-4 text-sm sm:text-base md:text-lg text-neutral-500 font-medium">
        Lecture-Topics.
      </p>
      <div className="mx-auto mt-10 grid w-full max-w-6xl grid-cols-1 gap-5 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {lectureTopics.map((topic) => (
          <TiltCard key={topic.label} label={topic.label} image={topic.image} />
        ))}
      </div>
    </div>

    <div className="bg-white px-6 pb-16 sm:pb-24">
      <div className="mx-auto flex max-w-6xl justify-center">
        <Image
          src="/whiteeye.png"
          alt="White Eye"
          width={1200}
          height={560}
          className="h-auto max-h-80 w-full max-w-5xl object-contain"
        />
      </div>
    </div>

    <div id="study" className="bg-white pb-16 text-center sm:pb-24">
      <h2 className="text-xl sm:text-2xl font-medium md:text-3xl bg-gradient-to-r from-neutral-500 via-neutral-400 to-neutral-300 bg-clip-text text-transparent">
        &ldquo;Grow, Expand, Evolve.&rdquo;
      </h2>
      <p className="mt-4 text-sm sm:text-base md:text-lg text-neutral-500 font-medium">
        Things-To-Study.
      </p>
      <div className="mx-auto mt-10 grid w-full max-w-6xl grid-cols-1 gap-5 px-6 sm:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <TiltCard
            key={`study-${i}`}
            video={i === 0 ? "/carcards.mp4" : i === 1 ? "/patt.mp4" : undefined}
            label={i === 0 ? "Observation" : "Pattern Recognition"}
          />
        ))}
      </div>
    </div>

    <div id="faq" className="bg-white pb-16 text-center sm:pb-24">
      <h2 className="text-xl sm:text-2xl font-medium md:text-3xl bg-gradient-to-r from-neutral-500 via-neutral-400 to-neutral-300 bg-clip-text text-transparent">
        &ldquo;Question Everything&rdquo;
      </h2>
      <p className="mt-4 text-sm sm:text-base md:text-lg text-neutral-500 font-medium">
        Frequently Asked Questions
      </p>
      <div className="mx-auto mt-10 w-full max-w-4xl px-6 text-left">
        {faqItems.map((item, i) => {
          const isOpen = openFaq === i;
          return (
            <div key={item.question} className="border-b border-neutral-300 py-1">
              <button
                type="button"
                onClick={() => setOpenFaq((prev) => (prev === i ? null : i))}
                className="flex w-full items-center justify-between gap-4 px-1 py-5 text-left"
                aria-expanded={isOpen}
              >
                <span className="text-base sm:text-lg font-medium tracking-wide text-neutral-700">
                  {item.question === "What If I win the event?" ? (
                    <>
                      What If I <span className="text-red-600">win</span> the event?
                    </>
                  ) : (
                    item.question
                  )}
                </span>
                <span className="relative block h-4 w-4 shrink-0">
                  <span className="absolute left-0 top-1/2 block h-[1.5px] w-4 -translate-y-1/2 bg-neutral-700" />
                  <span
                    className={`absolute left-1/2 top-0 block h-4 w-[1.5px] -translate-x-1/2 bg-neutral-700 transition-transform duration-300 ${isOpen ? "scale-y-0" : "scale-y-100"}`}
                  />
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${isOpen ? "max-h-32 pb-5" : "max-h-0"}`}
              >
                <p className="px-1 pr-8 text-sm sm:text-base leading-7 text-neutral-500">
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>

    <footer className="bg-black px-6 py-12 text-white sm:py-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <a
          href="#"
          className="inline-flex items-center justify-center rounded-full border border-white/30 p-2.5 transition-colors hover:bg-white/10"
        >
          <Image src="/bbl.png" alt="Home" width={40} height={40} className="h-10 w-10 object-contain" />
        </a>
        <div className="flex items-center gap-6">
          <a
            href="https://www.tiktok.com/@whiteroom_6?_r=1&_t=ZP-95muRSW2WQZ"
            target="_blank"
            rel="noreferrer"
            aria-label="TikTok"
            className="text-white/85 transition-colors hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
              <path d="M16.1 3h2.7c.2 1.8 1.3 3.3 3 4.1v2.8c-1.1 0-2.2-.3-3.2-.9V15a6 6 0 1 1-6-6c.4 0 .8 0 1.2.1v2.9A3.1 3.1 0 1 0 15.5 15V3.1h.6z" />
            </svg>
          </a>
          <a
            href="https://youtube.com/@whiteroom6?si=toQAdHq3HOaa2Z8x"
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube"
            className="text-white/85 transition-colors hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
              <path d="M23 12s0-3.3-.4-4.9c-.2-.9-.9-1.6-1.8-1.8C19.2 5 12 5 12 5s-7.2 0-8.8.3c-.9.2-1.6.9-1.8 1.8C1 8.7 1 12 1 12s0 3.3.4 4.9c.2.9.9 1.6 1.8 1.8 1.6.3 8.8.3 8.8.3s7.2 0 8.8-.3c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-4.9.4-4.9zM10 15.5v-7l6 3.5-6 3.5z" />
            </svg>
          </a>
          <a
            href="https://x.com/whiteroom7777"
            target="_blank"
            rel="noreferrer"
            aria-label="X"
            className="text-white/85 transition-colors hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
              <path d="M18.9 2H22l-6.8 7.8L23 22h-6.2l-4.9-6.5L6.1 22H3l7.2-8.2L2 2h6.3l4.4 5.9L18.9 2zm-1.1 18h1.7L7.4 3.9H5.7L17.8 20z" />
            </svg>
          </a>
        </div>
        <Link
          href="/WR-personality-quiz"
          className="cursor-pointer text-sm font-semibold text-white/85 underline underline-offset-4 transition-colors hover:text-white sm:text-base"
        >
          Free Personality Quiz
        </Link>
        <p className="text-sm sm:text-base text-white/85">Email: whiteroom101mindgames@gmail.com</p>
        <p className="text-sm sm:text-base text-white/75">All Rights Reserved Built In 2026</p>
      </div>
    </footer>
    </>
  );
}

function TiltCard({ label, image, video }: { label?: string; image?: string; video?: string }) {
  const [cardTransform, setCardTransform] = useState(
    "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
  );
  const [shadowTransform, setShadowTransform] = useState("translate3d(0, 0, 0) scale(1)");

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 16;
    const rotateX = (0.5 - y) * 16;
    const shadowX = (x - 0.5) * 20;
    const shadowY = (y - 0.5) * 12;

    setCardTransform(
      `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    );
    setShadowTransform(`translate3d(${shadowX}px, ${shadowY}px, 0) scale(1.05)`);
  };

  const handleMouseLeave = () => {
    setCardTransform("perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setShadowTransform("translate3d(0, 0, 0) scale(1)");
  };

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="relative aspect-[4/5] [transform-style:preserve-3d]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="absolute inset-x-5 bottom-0 h-10 rounded-full bg-black/12 blur-2xl transition-transform duration-200 ease-out"
          style={{ transform: shadowTransform }}
        />
        <div
          className="relative h-full overflow-hidden rounded-2xl bg-neutral-200 shadow-md transition-transform duration-200 ease-out will-change-transform"
          style={image ? { transform: cardTransform, backgroundImage: `url('${image}')`, backgroundSize: "cover", backgroundPosition: "center" } : { transform: cardTransform }}
        >
          {video && (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src={video} type="video/mp4" />
            </video>
          )}
        </div>
      </div>
      {label && (
        <p className="mt-4 text-sm sm:text-base md:text-lg text-neutral-500 font-medium">
          <span className={label === "Manipulation" ? "italic text-red-600" : "text-neutral-500"}>
            {label}
          </span>
        </p>
      )}
    </motion.div>
  );
}

function ProgrammeCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = programmeItems.length;

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (paused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, total]);

  // Dot sizing: active dot is wide pill, neighbors are medium, far ones are small
  const getDotSize = (i: number) => {
    const dist = Math.abs(i - activeIndex);
    if (dist === 0) return { w: 32, h: 6 };
    if (dist === 1) return { w: 5, h: 5 };
    return { w: 4, h: 4 };
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const children = container.children;
    if (!children[activeIndex]) return;
    const child = children[activeIndex] as HTMLElement;
    const containerWidth = container.parentElement?.offsetWidth ?? 0;
    const childCenter = child.offsetLeft + child.offsetWidth / 2;
    setOffset(containerWidth / 2 - childCenter);
  }, [activeIndex]);

  return (
    <div className="mt-12 sm:mt-16 relative overflow-hidden">
      <motion.div
        ref={containerRef}
        className="flex gap-6 sm:gap-8 md:gap-10"
        animate={{ x: offset }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ width: "max-content" }}
      >
        {programmeItems.map((item, i) => (
          <motion.div
            key={item.label}
            className="flex flex-col items-center gap-3 shrink-0 cursor-pointer"
            initial={{ y: 56 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            animate={{
              scale: i === activeIndex ? 1 : 0.9,
              opacity: i === activeIndex ? 1 : 0.5,
            }}
            transition={{ duration: 0.5 }}
            onClick={() => { goTo(i); }}
          >
            <span className="text-sm sm:text-base md:text-lg font-semibold text-neutral-400">
              {item.label}
            </span>
            <div
              className={`${item.bg} relative w-72 h-96 sm:w-80 sm:h-[26rem] md:w-[24rem] md:h-[32rem] lg:w-[28rem] lg:h-[36rem] rounded-2xl shadow-md transition-transform duration-300 hover:scale-[1.03] bg-cover bg-center overflow-hidden`}
              style={item.image ? { backgroundImage: `url('${item.image}')` } : {}}
            >
              {item.jpText && (
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl sm:text-5xl font-bold text-red-600 [writing-mode:vertical-rl] [text-orientation:upright] drop-shadow-lg">
                  {item.jpText}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Toolbar: dots + pause/play */}
      <div className="mt-8 flex items-center justify-center gap-4">
        {/* Paging dots */}
        <div className="flex items-center gap-1.5">
          {programmeItems.map((_, i) => {
            const size = getDotSize(i);
            return (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="relative flex items-center justify-center"
                aria-label={`Go to slide ${i + 1}`}
              >
                <span
                  className="block rounded-full bg-neutral-300 transition-all duration-300"
                  style={{ width: size.w, height: size.h }}
                />
                {i === activeIndex && (
                  <motion.span
                    className="absolute left-0 top-0 block rounded-full bg-neutral-600"
                    style={{ height: size.h }}
                    initial={{ width: 0 }}
                    animate={{ width: size.w }}
                    transition={{ duration: 4, ease: "linear" }}
                    key={activeIndex}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Pause / Play button */}
        <button
          onClick={() => setPaused((p) => !p)}
          className="flex items-center justify-center text-neutral-400 hover:text-neutral-600 transition-colors"
          aria-label={paused ? "Play" : "Pause"}
        >
          {paused ? (
            <svg fill="currentColor" height="12" width="10" viewBox="0 0 10 12" xmlns="http://www.w3.org/2000/svg">
              <polygon points="0,0 10,6 0,12" />
            </svg>
          ) : (
            <svg fill="none" height="10" viewBox="0 0 8 10" width="8" xmlns="http://www.w3.org/2000/svg">
              <g fill="currentColor">
                <rect height="9" rx="0.2" width="3" y="0.5" />
                <rect height="9" rx="0.2" width="3" x="5" y="0.5" />
              </g>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

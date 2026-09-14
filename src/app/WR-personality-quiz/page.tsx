"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";

const questionOverrides: Record<number, { text: string; answers: string[] }> = {
  1: {
    text: "How intelligent are you?",
    answers: [
      "I'm average at best",
      "I'm top of my class in every category",
      "I am all knowing, the one above all",
      "I am lower than average, I think",
    ],
  },
  2: {
    text: "How intelligent do others think you are?",
    answers: [
      "People think I'm dumb",
      "People know I'm more intelligent than them",
      "People's view of my intelligence is no concern to me",
      "People think I'm fun",
    ],
  },
  3: {
    text: "You're thirsty, what type of drink would you like?",
    answers: ["Water", "Energy drink", "Milk", "Juice"],
  },
  4: {
    text: "What does your room/living quarters look like?",
    answers: [
      "I don't have much property",
      "All my items are nicely put away and my space is clean and structured",
      "It's not my problem, someone will clean it up",
      "It's messy, sorry",
    ],
  },
  5: {
    text: "What makes right?",
    answers: [
      "Right and wrong doesn't exist",
      "Right is being correct and according to society's and government's norms",
      "Anything I say and believe",
      "Right is what we, deep down as humanity, know to be true",
    ],
  },
  6: {
    text: "If a very attractive person came up to you flirting and asked to have some drinks/alcohol with them, what would you do?",
    answers: [
      "Say yes, but wonder why this person chose you and what they're trying to convince you of besides a drink",
      "Say yes, but wonder what the status of this individual is and if they're worth actually being associated with",
      "Say no, because you're above them and their little drinks",
      "Say no, because you're so attractive that you'd say yes just from blushing and blood already coming out of your nose",
    ],
  },
  7: {
    text: "If you were trying to get someone to do you a favor, how would you do it?",
    answers: [
      "Make a deal with the person so they don't feel like they're being used",
      "Go up and demand that they help you since it's very important to you",
      "Ask them to do a favor, and when they say no, laugh in their face and walk away",
      "Plead and beg that they help; I would be on my knees if I have to",
    ],
  },
  8: {
    text: "Do you think you're a nice person?",
    answers: [
      "No, I am evil",
      "I am, when people are not being idiots and are not useless",
      "I am the kindest, nicest person there is; I have no flaws; I am God",
      "Man, I sure hope so; I try to be a nice person to everyone",
    ],
  },
  9: {
    text: "Do you think other people think you're a nice person?",
    answers: [
      "Only the ones who don't really know me think I'm a nice person; the ones who do wish they didn't",
      "I think people can think what they want, but when they realize I am correct or doing the right thing, they will find out I am a good person",
      "People think and know I am a God, and are happy to even be in my presence; of course they believe I'm nice",
      "I hope so",
    ],
  },
  10: {
    text: "Are you the MC?",
    answers: [
      "Probably, but that seems like too much work",
      "No such thing; everyone thinks they're important, but when they die, life moves on",
      "Yes, I am the main character, simple as that",
      "Nah, bruh, I'm an NPC",
    ],
  },
  11: {
    text: "You're on vacation, what do you plan on doing?",
    answers: [
      "Find something interesting to entertain myself",
      "Catch up on things I've been putting off, like reading or studying",
      "Relax and swim, show off my body to the locals, show them what real beauty is",
      "Try to get laid",
    ],
  },
  12: {
    text: "Have you ever been beaten as a child?",
    answers: [
      "Yes",
      "Yes, but only when I was out of line",
      "No, my mother wouldn't dare",
      "No, my mother and father were amazing",
    ],
  },
  13: {
    text: "Have you ever felt like taking your own life?",
    answers: [
      "Yes",
      "Yes, but I have worked on myself to become better",
      "No, why would I want to kill a God like myself",
      "No, I get down sometimes, but I never wanted to hurt myself in that way",
    ],
  },
  14: {
    text: "Have you ever wanted to escape your reality?",
    answers: [
      "Yes",
      "Yes, but reality is reality, and I will face the truth even if it hurts",
      "No, why? My life is amazing",
      "No, is that even a thing?",
    ],
  },
  15: {
    text: "When you were little, were you surrounded by kids your age?",
    answers: [
      "Yes, all the time",
      "Yes, my family is big and competitive",
      "No, I am an only child",
      "No, only at school or with my siblings, and when my cousins visited",
    ],
  },
};

const questions = Array.from({ length: 15 }, (_, i) => {
  const id = i + 1;
  const override = questionOverrides[id];
  const answerTexts = override?.answers ?? ["Answer placeholder 1", "Answer placeholder 2", "Answer placeholder 3", "Answer placeholder 4"];
  return {
    id,
    text: override?.text ?? `Question ${id} placeholder`,
    // personaIndex ties each answer to its matching personality, independent of display order
    answers: answerTexts.map((text, personaIndex) => ({ text, personaIndex })),
  };
});

function shuffleAnswers<T>(answers: T[]): T[] {
  const copy = [...answers];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Each answer's personaIndex (0-3) correlates to the matching personality below.
const personas = ["Kiyotaka Ayanokōji", "Suzune Horikita", "Rokusuke Kōenji", "Kanji Ike"];

const personaContent: Record<string, { image: string; description: string }> = {
  "Kiyotaka Ayanokōji": {
    image: "/ak1.jpg",
    description: `You carry the White Room mentality — forged in pressure, shaped by isolation, and sharpened by truth. You've endured more than most people could imagine, and it shows in the way you move through the world.

You don't chase comforting lies.
You accept the harsh truth, even when it cuts, even when it changes you.
You see through people — their masks, their motives, their noise.
Nothing gets past you.

You know your power.
You don't flaunt it.
You don't beg for recognition.
But the moment someone underestimates you, the moment they think you're "average,"
that's when you've already won.

To you, life is a competition — not because you're obsessed with victory, but because you understand the simple reality:

There are winners.
There are losers.
And you?
You were built to win.

Calm.
Unshaken.
Unmoved.
You don't need validation.
You don't need applause.
You simply execute.

This is the Ayanokōji mindset — quiet dominance, silent calculation, inevitable victory.`,
  },
  "Suzune Horikita": {
    image: "/suz.webp",
    description: `You judge people with precision — not out of arrogance, but out of clarity. You see things as they are, not as others *wish* they were. Your mind is structured, analytical, and disciplined. You understand your strengths, you confront your weaknesses, and you work every day to forge yourself into something unstoppable.

You don't hide from your flaws.
You dissect them.
You improve them.
You rise above them.

This honesty with yourself sets you apart — but it also isolates you. You notice what's wrong in others just as sharply as you notice what's wrong in yourself. That level of awareness makes friendships rare, and followers even rarer. You've always believed it's because of your intelligence, your standards, your seriousness.

And deep down, you carry a quiet desire:
To impress someone.
To earn validation from a parent, guardian, mentor, or institution.
To prove that your effort means something.

But here's the truth you're still learning:

You don't need their approval.
You already carry the strength they never taught you.
You can move mountains — not through luck, but through discipline.

What others call "cold," "strict," or "distant" is simply your commitment to becoming the best version of yourself. You have a drive most people wish they had the courage to develop.

You're not just building yourself.
You're becoming a force.
One that doesn't need permission to rise.`,
  },
  "Rokusuke Kōenji": {
    image: "/kouen.webp",
    description: `You walk with the certainty of someone who believes — no, *knows* — they stand above the crowd. Not in a petty, narcissistic way, but in the grand, effortless manner of someone born with a presence that cannot be ignored.

Your confidence isn't an act.
Your ego isn't a mask.
Your mentality surpasses simple arrogance — it borders on a god complex, the kind that makes people stare, whisper, admire, and deny all at once.

When you speak, it feels like a decree.
When you move, it feels like a performance.
If humanity needed a ruler, a symbol, a flawless ideal, you'd nominate yourself — and no one could argue convincingly against it.

Your genetics? Superior.
Your thoughts? Beyond ordinary comprehension.
Your independence? Absolute.

You cannot be manipulated.
You cannot be fooled.
You cannot be trapped, because you dance to the rhythm of your own drum — a rhythm no one else can hear, let alone predict.

And yet, you do not hide your flaws.
Why would you?
Flaws are the only thread connecting you to the human race. They are not weaknesses — they are ornaments, reminders that even a being of your caliber can choose to be vulnerable.

To show vulnerability is not a defeat for you.
It is a gift you grant to mortals.
A glimpse behind the divine curtain.

You are Kōenji in spirit:
Unrestrained.
Unapologetic.
Unreachable.
A force of nature wrapped in elegance and chaos.`,
  },
  "Kanji Ike": {
    image: "/kam.jpg",
    description: `You carry the energy of someone who's genuinely chill — not lazy, not careless, just comfortable in your own skin. You're one of the boys, easy to talk to, easy to hang around, and you try to get along with everyone. You're not here to start problems. You're here for a good time, not a long time.

Your past hasn't been perfect.
You've seen rough days, heavy moments, and things that could've changed you for the worse.
But instead, you chose to look for the bright side.
You chose to stay light, stay positive, stay human.

You're not a manipulator.
You're not a schemer.
You don't want to be.

You use your intelligence in ways that help people — creative ideas, simple solutions, good vibes, and steady support. You don't need to compete with everyone. You don't need to be angry all the time. You don't need to prove you're above anyone.

In truth, you're one of the most mature personalities here.
People might mistake your happy‑go‑lucky attitude for childishness, but they don't know what you've seen. They don't know what you've survived. They don't know how deeply you understand life.

You've looked at the darker side of things.
You've felt what it's like to struggle.
And because of that, you've decided your final days — whenever they come — should be spent with a bang, surrounded by friends, laughter, and the people you care about.

You're not running from life.
You're embracing it.

Kanji Ike isn't just a personality.
He's a reminder that strength doesn't always look cold or ruthless.
Sometimes strength looks like a smile, a joke, a chill moment, and the courage to stay kind in a world that isn't always kind back.`,
  },
};

export default function PersonalityQuizPage() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [displayQuestions, setDisplayQuestions] = useState(questions);

  // Shuffle each question's answer order client-side so the same position
  // doesn't always map to the same personality (avoids position bias).
  useEffect(() => {
    setDisplayQuestions(questions.map((q) => ({ ...q, answers: shuffleAnswers(q.answers) })));
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const scores = [0, 0, 0, 0];
    const body = displayQuestions
      .map((q) => {
        const selected = formData.get(`question-${q.id}`);
        const personaIndex = selected === null ? -1 : Number(selected);
        if (personaIndex >= 0) scores[personaIndex] += 1;
        const answer = q.answers.find((a) => a.personaIndex === personaIndex);
        return `${q.id}. ${q.text}\nAnswer: ${answer?.text ?? "(not answered)"}`;
      })
      .join("\n\n");

    const topScore = Math.max(...scores);
    const tiedIndices = scores.reduce<number[]>((acc, score, idx) => (score === topScore ? [...acc, idx] : acc), []);
    const topResult = personas[tiedIndices[Math.floor(Math.random() * tiedIndices.length)]];

    const fullBody = `Your personality result: ${topResult}\n\n${body}`;

    const mailtoLink = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(
      "Your Personality Quiz Results"
    )}&body=${encodeURIComponent(fullBody)}`;

    window.location.href = mailtoLink;
    setResult(topResult);
  };

  if (result) {
    const content = personaContent[result];
    return (
      <div className="min-h-screen bg-white px-6 py-16 text-black">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">Your Result: {result}</h1>
          {content && (
            <>
              <Image
                src={content.image}
                alt={result}
                width={400}
                height={400}
                className="h-auto w-full max-w-sm rounded-2xl object-cover shadow-lg"
              />
              <p className="whitespace-pre-line text-left text-base leading-relaxed">{content.description}</p>
              <Link
                href="/#video-section"
                className="mt-4 inline-block rounded-full bg-black px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-black/80"
              >
                Enroll Now
              </Link>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-6 py-16 text-black">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-12 text-center text-3xl font-bold sm:text-4xl">Free Personality Quiz</h1>
        <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
          {displayQuestions.map((q) => (
            <fieldset key={q.id} className="border-b border-black/10 pb-8">
              <legend className="mb-4 text-lg font-semibold">
                {q.id}. {q.text}
              </legend>
              <div className="flex flex-col gap-3">
                {q.answers.map((answer) => (
                  <label key={answer.personaIndex} className="flex items-center gap-3 text-base">
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={answer.personaIndex}
                      required
                      className="h-4 w-4"
                    />
                    {answer.text}
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-lg font-semibold">
              Enter your email to receive your results
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="rounded-lg border border-black/20 px-4 py-3 text-base focus:border-black focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="mx-auto rounded-full bg-black px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-black/80"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

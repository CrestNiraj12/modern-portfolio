import {
  AnimatedButton,
  GitHubLink,
  LinkedInLink,
  Reveal,
  RevealText,
} from "@/shared/components";
import { Sparkles } from "lucide-react";
import { forwardRef, type ReactNode } from "react";

type IconEntry = {
  label: string;
  slug?: string;
  color?: string;
  icon?: ReactNode;
};

const languages: IconEntry[] = [
  { slug: "typescript", label: "TypeScript", color: "3178C6" },
  { slug: "javascript", label: "JavaScript", color: "F7DF1E" },
  { slug: "python", label: "Python", color: "3776AB" },
  { slug: "go", label: "Go", color: "00ADD8" },
  { slug: "dart", label: "Dart", color: "0175C2" },
];

const tools: IconEntry[] = [
  { slug: "git", label: "Git", color: "F05032" },
  { slug: "neovim", label: "Neovim", color: "57A143" },
  { slug: "anthropic", label: "Claude Code" },
  { icon: <Sparkles strokeWidth={1.5} className="size-9" />, label: "Codex" },
  { slug: "docker", label: "Docker", color: "2496ED" },
  { slug: "postgresql", label: "Postgres", color: "4169E1" },
  { slug: "tmux", label: "tmux", color: "1BB91F" },
];

const Logo = ({ slug, label, color, icon }: IconEntry) => {
  return (
    <div className="flex flex-col items-center gap-2 w-20">
      {icon ? (
        <div className="size-10 flex items-center justify-center text-black">
          {icon}
        </div>
      ) : (
        <img
          src={
            color
              ? `https://cdn.simpleicons.org/${slug}/${color}`
              : `https://cdn.simpleicons.org/${slug}`
          }
          alt={label}
          className="size-10"
        />
      )}
      <span className="text-xs text-gray-600 text-center leading-tight">
        {label}
      </span>
    </div>
  );
};

export const About = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section
      ref={ref}
      id="about"
      className="relative bg-background text-black px-6 sm:px-10 lg:px-20 pt-20 pb-15 lg:pt-40 lg:pb-30 flex flex-col gap-10 lg:gap-15"
    >
      <RevealText
        text="About"
        className="text-sm uppercase tracking-widest text-gray-500"
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20">
        <div className="flex flex-col gap-6 lg:gap-10">
          <RevealText
            text={"Software engineer\nfrom Nepal."}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl"
            stagger={0.05}
          />
          <RevealText
            text="I build pragmatic, fast, user-focused products. From systems work to polished frontends, I care about good defaults, clean abstractions, and code that's still readable a year from now."
            className="text-base lg:text-lg text-gray-600 max-w-xl"
            delay={0.15}
            stagger={0.012}
            duration={0.7}
          />
          <RevealText
            text="Currently freelancing and open to collaborations. Say hi if you have something interesting cooking."
            className="text-base lg:text-lg text-gray-600 max-w-xl"
            delay={0.3}
            stagger={0.012}
            duration={0.7}
          />

          <div className="flex flex-wrap items-center gap-3 mt-4">
            <Reveal delay={0.4}>
              <a href="#contact">
                <AnimatedButton
                  variant="pill"
                  text="Contact me"
                  textClassName="text-black"
                  className="border-gray-400"
                />
              </a>
            </Reveal>
            <Reveal delay={0.5}>
              <GitHubLink
                className="border-gray-400 hover:border-black"
                iconClassName="text-black"
              />
            </Reveal>
            <Reveal delay={0.55}>
              <LinkedInLink
                className="border-gray-400 hover:border-[#0A66C2]"
                iconClassName="text-[#0A66C2]"
              />
            </Reveal>
          </div>
        </div>

        <div className="flex flex-col gap-10 self-start">
          <div>
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-6">
              Languages
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-4 gap-4 justify-items-center">
              {languages.map((lang, i) => (
                <Reveal key={lang.label} delay={i * 0.05}>
                  <Logo {...lang} />
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-6">
              Tools
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-4 gap-4 justify-items-center">
              {tools.map((tool, i) => (
                <Reveal key={tool.label} delay={i * 0.05}>
                  <Logo {...tool} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

About.displayName = "About";

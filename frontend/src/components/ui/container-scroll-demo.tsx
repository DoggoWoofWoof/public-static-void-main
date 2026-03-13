"use client";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden pb-[500px] pt-[1000px]">
      <ContainerScroll
        titleComponent={
          <h1 className="text-4xl font-semibold text-black dark:text-white">
            Unleash the power of <br />
            <span className="mt-1 block text-4xl font-bold leading-none md:text-[6rem]">
              Scroll Animations
            </span>
          </h1>
        }
      >
        <img
          src="/src/assets/hero.png"
          alt="hero"
          className="mx-auto h-full rounded-2xl object-cover object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}

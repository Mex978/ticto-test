"use client";

import React, { useEffect, useState } from "react";

import { useKeenSlider } from "keen-slider/react";
import { ResultCard } from "../components/ResultCard";
import { IResultSessionLayout } from "../data";

import "keen-slider/keen-slider.min.css";
import styles from "./styles.module.scss";

export const ResultSession: React.FC<IResultSessionLayout> = ({
  items,
  isLoading,
}) => {
  const [canScroll, setCanScroll] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    mode: "snap",
    slides: {
      perView: "auto",
      spacing: 16,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    updated(slider) {
      setCanScroll(slider.track.details.maxIdx > 0);
    },
  });

  useEffect(() => {
    instanceRef.current?.update();
  }, [items.length]);

  return (
    <div className={styles.wrapper}>
      <div ref={sliderRef} className={`keen-slider ${styles.carousel}`}>
        {items.map((item) => (
          <div
            key={item.title}
            className={`keen-slider__slide ${styles.slide}`}
          >
            <ResultCard
              title={item.title}
              icon={item.icon}
              value={item.value}
              isLoading={isLoading}
              type={item.type}
            />
          </div>
        ))}
      </div>

      {canScroll && (
        <div className={styles.dots}>
          {items.map((_, i) => (
            <button
              key={i}
              aria-label={`Ir para o slide ${i + 1}`}
              onClick={() => instanceRef.current?.moveToIdx(i)}
              className={`${styles.dot} ${
                currentSlide === i ? styles.active : ""
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

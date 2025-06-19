"use client";
import React from "react";

import { ResultCard } from "@/components/ResultCard";
import { formatCurrency } from "@/helpers/functions/formatCurrency";
import { FiArrowDownLeft, FiArrowUpRight } from "react-icons/fi";
import { IResultSessionLayout } from "../data";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import { useState } from "react";
import styles from "./styles.module.scss";

export const ResultSession: React.FC<IResultSessionLayout> = () => {
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

  const items = [
    {
      title: "Entradas",
      icon: <FiArrowDownLeft size={28} color="#06D6A2" />,
      value: formatCurrency(15292895200),
    },
    {
      title: "Saídas",
      icon: <FiArrowUpRight size={28} color="#DB3766" />,
      value: formatCurrency(15292895200),
    },
    {
      title: "Saldo Total",
      icon: <FiArrowDownLeft size={28} color="#06D6A2" />,
      value: formatCurrency(5000),
    },
  ];

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
            />
          </div>
        ))}
      </div>

      {canScroll && (
        <div className={styles.dots}>
          {items.map((_, i) => (
            <button
              key={i}
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

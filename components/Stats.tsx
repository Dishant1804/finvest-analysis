"use client"

import { stats } from "../app/constants";
import { useState, useEffect, useRef } from 'react';

const Stats = () => {
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({});
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateNumbers();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const animateNumbers = () => {
    stats.forEach((stat) => {
      const targetValue = parseInt(stat.value.replace(/[^\d]/g, ''));
      const duration = 2000;
      const increment = targetValue / (duration / 16);
      let currentValue = 0;

      const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
          currentValue = targetValue;
          clearInterval(timer);
        }
        setAnimatedValues(prev => ({
          ...prev,
          [stat.id]: Math.floor(currentValue)
        }));
      }, 16);
    });
  };

  const formatValue = (originalValue: string, animatedValue: number | undefined) => {
    if (animatedValue === undefined) return originalValue;
    const suffix = originalValue.replace(/[\d]/g, '').replace(/[+]/g, '');
    const hasPlus = originalValue.includes('+');
    return `${animatedValue}${hasPlus ? '+' : ''}${suffix}`;
  };

  return (
    <section
      ref={sectionRef}
      className="flex flex-row flex-wrap justify-center items-center w-full sm:mb-20 mb-6"
    >
      {stats.map((stat, index) => (
        <div
          key={stat.id}
          className="flex-1 flex justify-between items-center flex-row m-3"
        >
          <div className="flex flex-row justify-center items-center w-full">
            <h4 className="font-poppins font-semibold xs:text-4xl text-3xl xs:leading-14 leading-11 text-white">
              {formatValue(stat.value, animatedValues[stat.id])}
            </h4>
            <p className="font-poppins font-normal xs:text-xl text-base xs:leading-7 leading-5 text-gradient ml-3 uppercase">
              {stat.title}
            </p>
          </div>
          <div
            className={`bg-white rotate-90 hidden md:inline ${index === stats.length - 1
                ? "w-0 border-0"
                : "w-9 border-2 ml-14"
              }`}
          />
        </div>
      ))}
    </section>
  );
};
export default Stats;

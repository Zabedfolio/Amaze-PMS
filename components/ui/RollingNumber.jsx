"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

function DigitSlot({ digit, delay }) {
  const targetDigit = parseInt(digit, 10);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const digits = Array.from({ length: 10 }, (_, i) => i);

  return (
    <span 
      ref={containerRef}
      className="inline-block relative overflow-hidden text-center align-baseline leading-none font-mono"
      style={{ 
        height: "1.05em",
        width: "0.625em" 
      }}
    >
      <motion.span
        initial={{ y: "0%" }}
        animate={isInView ? { y: `-${targetDigit * 10}%` } : { y: "0%" }}
        transition={{ 
          type: "spring", 
          stiffness: 45, 
          damping: 14, 
          delay: delay 
        }}
        className="flex flex-col absolute top-0 left-0 w-full"
        style={{ height: "1000%" }} 
      >
        {digits.map((num) => (
          <span 
            key={num} 
            className="h-[10%] flex items-center justify-center font-extrabold"
            style={{ fontSize: "1em", lineHeight: "1" }}
          >
            {num}
          </span>
        ))}
      </motion.span>
      
      <span className="invisible select-none font-extrabold opacity-0">0</span>
    </span>
  );
}

export default function RollingNumber({ value, suffix = "" }) {
  
  const formattedString = typeof value === "number" ? value.toLocaleString("en-IN") : value;
  const chars = formattedString.split("");

  return (
    <span className="inline-flex items-baseline select-none font-extrabold leading-none">
      {chars.map((char, index) => {
        const isDigit = /^[0-9]$/.test(char);
        
        if (isDigit) {
          
          return (
            <DigitSlot 
              key={index} 
              digit={char} 
              delay={0.1 + index * 0.08} 
            />
          );
        }

        return (
          <span 
            key={index} 
            className="inline-block font-extrabold align-baseline"
            style={{ fontSize: "1em", lineHeight: "1" }}
          >
            {char}
          </span>
        );
      })}
      {suffix && (
        <span 
          className="inline-block font-extrabold align-baseline"
          style={{ fontSize: "1em", lineHeight: "1" }}
        >
          {suffix}
        </span>
      )}
    </span>
  );
}

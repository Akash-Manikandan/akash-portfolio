"use client";
import React, { useRef, useEffect, useState } from "react";

function Tree({ children }: { children: JSX.Element }) {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleValue,setVisibleValue] = useState(0)
  const targetRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        setVisibleValue(entry.intersectionRatio * 100)
      },
      {
        root: null, // Use the document's viewport as the root
        rootMargin: "0px",
        threshold:  Array.from({ length: 101 }, (_, i) => i / 100), 
      }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    // Cleanup the observer on component unmount
    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);
  return (
    <div ref={targetRef}>
      <p>{visibleValue}</p>:<div>{children}</div>
    </div>
  );
}

export default Tree;

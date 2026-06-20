"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface RoadmapContextType {
  activeDetour: string | null;
  detourOriginY: number;
  enterDetour: (detour: string, parentId?: string) => void;
  exitDetour: () => void;
}

const RoadmapContext = createContext<RoadmapContextType | undefined>(undefined);

export function RoadmapProvider({ children }: { children: ReactNode }) {
  const [activeDetour, setActiveDetour] = useState<string | null>(null);
  const [detourOriginY, setDetourOriginY] = useState(0);

  useEffect(() => {
    if (activeDetour) {

      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {

      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }, [activeDetour]);

  const enterDetour = (detour: string, parentId?: string) => {
    setActiveDetour(detour);
    setDetourOriginY(window.scrollY);
  };

  const exitDetour = () => {
    setActiveDetour(null);
  };

  return (
    <RoadmapContext.Provider value={{ activeDetour, detourOriginY, enterDetour, exitDetour }}>
      {children}
    </RoadmapContext.Provider>
  );
}

export function useRoadmap() {
  const context = useContext(RoadmapContext);
  if (context === undefined) {
    throw new Error("useRoadmap must be used within a RoadmapProvider");
  }
  return context;
}

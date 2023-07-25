"use client";

import { useRef } from "react";

import { useStore } from "@/src/store";

function StoreInitializer({ modal,CurrentMovie }) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useStore.setState({ modal,CurrentMovie });
    initialized.current = true;
  }
  return null;
}

export default StoreInitializer;
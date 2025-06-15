"use client";

import { useEffect } from "react";

export function PageReloadTrigger() {
  useEffect(() => {
    // Check if we just navigated here after login/signup
    const urlParams = new URLSearchParams(window.location.search);
    const justLoggedIn = urlParams.get('reload') === 'true';
    
    if (justLoggedIn) {
      // Remove the reload parameter and reload the page to update server components
      window.history.replaceState({}, '', window.location.pathname);
      window.location.reload();
    }
  }, []);

  return null; // This component doesn't render anything
}
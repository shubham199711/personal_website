import { useState, useEffect } from "react";

const useMediaQuery = (query: string) => {
  const [isMatching, setIsMatching] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const handleChange = (event: {
      matches: boolean | ((prevState: boolean) => boolean);
    }) => setIsMatching(event.matches);

    // Set the initial state
    setIsMatching(mediaQueryList.matches);

    // Add listener for changes
    mediaQueryList.addEventListener("change", handleChange);

    // Cleanup on unmount
    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, [query]);

  return isMatching;
};

export default useMediaQuery;

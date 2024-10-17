import React, { createContext, useContext } from "react";
import { LoadScript } from "@react-google-maps/api";

// create google map provider
const GoogleMapsContext = createContext();

export const GoogleMapsProvider = ({ children }) => {
  const apiKey = "AIzaSyAItmPJt0PQy4507Pu5j1f4-VFe77RjqvU";
  const libraries = ["places"];
  const language = "en";
  return (
    <LoadScript
      googleMapsApiKey={apiKey}
      libraries={libraries}
      language={language}
    >
      <GoogleMapsContext.Provider value={{}}>
        {children}
      </GoogleMapsContext.Provider>
    </LoadScript>
  );
};

export const useGoogleMaps = () => {
  return useContext(GoogleMapsContext);
};

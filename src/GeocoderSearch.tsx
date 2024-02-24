import React, { useState } from "react";

const GeocoderSearch = ({ viewer }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    if (!viewer || searchTerm.trim() === "") return;

    const geocoderService = new Cesium.Geocoder();
    try {
      const results = await geocoderService.geocode(searchTerm);
      if (results && results.length > 0) {
        const destination = Cesium.Cartesian3.fromDegrees(
          results[0].longitude,
          results[0].latitude,
          results[0].height ? results[0].height + 1000 : 3000 // Add a bit of height for better viewing. Adjust as necessary.
        );

        viewer.camera.flyTo({
          destination,
          duration: 2.0, // Adjust the duration as necessary
        });
      } else {
        alert("No results found");
      }
    } catch (error) {
      console.error("Geocoding failed: ", error);
      alert("Failed to geocode the location");
    }
  };

  return (
    <div
      className="cesium-geocoder-search"
      style={{
        position: "absolute",
        top: "10px",
        left: "10px",
        zIndex: 1000,
        background: "gray",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <h3>Where do you want to go?</h3>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        style={{ marginRight: "10px" }}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default GeocoderSearch;

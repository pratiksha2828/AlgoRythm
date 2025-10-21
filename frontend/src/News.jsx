import React, { useState } from "react";
import axios from "axios";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const GNEWS_API_KEY = "be5d136498f94deb73d1950f9365a0a1"; // Replace with your key

// Map country names → ISO codes
const countryCodeMap = {
  India: "in",
  "United States of America": "us",
  "United Kingdom": "gb",
  Canada: "ca",
  Germany: "de",
  France: "fr",
  Australia: "au",
  Japan: "jp",
  China: "cn",
  Brazil: "br",
  Russia: "ru",
};

export default function TechNewsMap() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [tooltipContent, setTooltipContent] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchNews = async (countryName) => {
    const code = countryCodeMap[countryName];
    if (!code) {
      setSelectedCountry(countryName);
      setNewsArticles([]);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(
        `https://gnews.io/api/v4/top-headlines?topic=technology&country=${code}&max=5&token=${GNEWS_API_KEY}`
      );
      setNewsArticles(res.data.articles || []);
    } catch (error) {
      console.error("Error fetching news:", error);
      setNewsArticles([]);
    } finally {
      setSelectedCountry(countryName);
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        position: "relative",
        background: "linear-gradient(to bottom right, #0f172a, #1e293b)",
        overflowY: "auto",
        padding: "20px",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1
          style={{
            color: "white",
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          🌍 Global Tech News
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "1.1rem" }}>
          Click on a country to view the latest technology news
        </p>
      </div>

      {/* Tooltip */}
      {tooltipContent && (
        <div
          style={{
            position: "fixed",
            top: 20,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgba(30, 41, 59, 0.95)",
            padding: "12px 24px",
            borderRadius: "12px",
            fontSize: "1rem",
            fontWeight: "600",
            color: "#f1f5f9",
            pointerEvents: "none",
            zIndex: 10,
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
          }}
        >
          {tooltipContent}
        </div>
      )}

      {/* World Map */}
      <div
        style={{
          width: "100%",
          height: "65vh",
          marginBottom: "30px",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        <ComposableMap
          projectionConfig={{ scale: 150 }}
          style={{ width: "100%", height: "100%" }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() =>
                    setTooltipContent(geo.properties.name)
                  }
                  onMouseLeave={() => setTooltipContent("")}
                  onClick={() => fetchNews(geo.properties.name)}
                  style={{
                    default: {
                      fill: "#475569",
                      outline: "none",
                      stroke: "#1e293b",
                      strokeWidth: 0.5,
                      transition: "all 0.3s ease",
                    },
                    hover: {
                      fill: "#3b82f6",
                      outline: "none",
                      cursor: "pointer",
                      transform: "scale(1.02)",
                    },
                    pressed: {
                      fill: "#2563eb",
                      outline: "none",
                    },
                  }}
                />
              ))
            }
          </Geographies>
        </ComposableMap>
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <div style={{ color: "#3b82f6", fontSize: "1.2rem" }}>
            Loading news...
          </div>
        </div>
      )}

      {/* News Section */}
      {selectedCountry && !loading && newsArticles.length > 0 && (
        <div>
          <h2
            style={{
              color: "white",
              textAlign: "center",
              marginBottom: "20px",
              fontSize: "1.8rem",
            }}
          >
            📰 Latest Tech News from {selectedCountry}
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "center",
            }}
          >
            {newsArticles.map((article, idx) => (
              <div
                key={idx}
                style={{
                  background: "#1f2937",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                  width: "300px",
                  overflow: "hidden",
                  color: "white",
                  transition: "transform 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.title}
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                    }}
                  />
                )}
                <div style={{ padding: "15px" }}>
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "700",
                      marginBottom: "8px",
                      lineHeight: "1.4",
                    }}
                  >
                    {article.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#d1d5db",
                      marginBottom: "12px",
                    }}
                  >
                    {article.description?.slice(0, 100)}...
                  </p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      padding: "8px 16px",
                      backgroundColor: "#3b82f6",
                      color: "white",
                      textDecoration: "none",
                      borderRadius: "6px",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#2563eb";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#3b82f6";
                    }}
                  >
                    Read More →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No News */}
      {selectedCountry && !loading && newsArticles.length === 0 && (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <p style={{ color: "#9ca3af", fontSize: "1.1rem" }}>
            No tech news available for {selectedCountry}.
          </p>
        </div>
      )}
    </div>
  );
}

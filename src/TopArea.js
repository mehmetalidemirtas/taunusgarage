import React, { useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import MapIcon from "@mui/icons-material/Map";
import PhoneIcon from "@mui/icons-material/Phone";

const TopArea = () => {
  const mapRef = useRef(null);

  const topAreaStyle = {
    height: "calc(100vh)",
    position: "relative",
    marginBottom: "15px",
  };

  const backgroundStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: "url('/assets/1.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    opacity: 0.9,
  };

  const contentStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    color: "white",
    zIndex: 1,
  };

  const redirectToFacebook = () => {
    window.open("https://www.facebook.com/groups/1287813332059338", "_blank");
  };
  const handlePhoneClick = () => {
    window.location.href = "tel:+905367611213";
  };
  const scrollToMap = () => {
    mapRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <Box sx={topAreaStyle}>
      {/* Arka plan */}
      <div style={backgroundStyle} />
      {/* İçerik */}
      <Box sx={contentStyle}>
        {/* Metin alanı */}
        <Typography
          variant="h3"
          fontWeight={800}
          sx={{ marginBottom: "16px", color: "white" }}
        >
          TAUNUS GARAGE
        </Typography>
        <Box>
          <PhoneIcon
            sx={{ marginRight: "10px", cursor: "pointer" }}
            onClick={handlePhoneClick}
          />

          <MapIcon
            sx={{ marginRight: "10px", cursor: "pointer" }}
            onClick={scrollToMap}
          />
          <FacebookIcon
            sx={{ cursor: "pointer" }}
            onClick={redirectToFacebook}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TopArea;

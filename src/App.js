import React, { useEffect, useRef, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  Container,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import MapIcon from "@mui/icons-material/Map";
import PhoneIcon from "@mui/icons-material/Phone";

const Gallery = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const photoPaths = Array.from(
    { length: 28 },
    (_, i) => `/assets/${i + 1}.jpg`
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % photoPaths.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [photoPaths.length]);

  const topAreaStyle = {
    height: "calc(100vh)",
    position: "relative",
    backgroundImage: `url(${photoPaths[backgroundIndex]})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  };

  const backgroundStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backgroundSize: "cover",
    backgroundPosition: "center center",
  };

  const centerTextStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  };

  const mapRef = useRef(null);

  const scrollToMap = () => {
    mapRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const redirectToFacebook = () => {
    window.open("https://www.facebook.com/groups/1287813332059338", "_blank");
  };
  const handlePhoneClick = () => {
    window.location.href = "tel:+905367611213";
  };

  return (
    <Box sx={{ backgroundColor: "#f7f7f7" }}>
      <Box sx={topAreaStyle}>
        <div style={backgroundStyle} />
        <div style={centerTextStyle}>
          <Typography
            variant="h3"
            color="white"
            fontStyle={"italic"}
            fontWeight={800}
          >
            DEMİRCİ TAUNUS GARAGE
          </Typography>
          <Box sx={{ marginTop: "10px" }}>
            <PhoneIcon
              sx={{
                marginRight: "10px",
                cursor: "pointer",
                color: "#dedede",
                fontSize: "40px",
              }}
              fontSize="50px"
              onClick={handlePhoneClick}
            />

            <MapIcon
              sx={{
                marginRight: "10px",
                cursor: "pointer",
                color: "#dedede",
                fontSize: "40px",
              }}
              onClick={scrollToMap}
            />
            <FacebookIcon
              sx={{ cursor: "pointer", color: "#dedede", fontSize: "40px" }}
              onClick={redirectToFacebook}
            />
          </Box>
        </div>
      </Box>
      <Container maxWidth={"xl"}>
        <Box sx={{ padding: "15px", marginTop: "15px" }}>
          <Typography variant="h6">FOTOĞRAFLAR</Typography>
          <Divider />
        </Box>
        <Grid container spacing={2}>
          {photoPaths.map((photoPath, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <Card elevation={2}>
                <CardMedia
                  component="img"
                  height="auto"
                  sx={{ maxHeight: "500px", padding: 1 }}
                  src={photoPath}
                  alt={`Photo ${index + 1}`}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box sx={{ marginTop: "20px" }}>
        <div ref={mapRef}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51106.42813553426!2d34.60336579943591!3d36.814883200825335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1527f30839c72255%3A0x9c5e42a4cfdee3d4!2sGarage%20Otomotiv!5e0!3m2!1str!2str!4v1707644929931!5m2!1str!2str"
            width="100%"
            height="450"
            allowfullscreen=""
            loading="lazy"
            style={{ border: 0 }}
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </Box>
    </Box>
  );
};

export default Gallery;

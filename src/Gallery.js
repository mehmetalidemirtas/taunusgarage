import React, { useRef } from "react";
import {
  Grid,
  Card,
  CardMedia,
  Container,
  Box,
  Typography,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import MapIcon from "@mui/icons-material/Map";
import PhoneIcon from "@mui/icons-material/Phone";

const Gallery = () => {
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
    backgroundPosition: "center center",
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

  const mapRef = useRef(null);

  const scrollToMap = () => {
    mapRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const photoPaths = Array.from(
    { length: 27 },
    (_, i) => `/assets/${i + 1}.jpg`
  );
  const redirectToFacebook = () => {
    window.open("https://www.facebook.com/groups/1287813332059338", "_blank");
  };
  const handlePhoneClick = () => {
    window.location.href = "tel:+905367611213";
  };

  return (
    <Box sx={{ backgroundColor: "#f7f7f7" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#f2f2f2",
          padding: "15px",
        }}
      >
        <Box>
          <Typography
            variant="h6"
            fontWeight={600}
            fontStyle={"italic"}
            color={"#12372A"}
          >
            TAUNUS GARAGE
          </Typography>
        </Box>
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
      <Box sx={topAreaStyle}>
        <div style={backgroundStyle} />
      </Box>
      <Container maxWidth={"xl"}>
        <Grid container spacing={2}>
          {photoPaths.map((photoPath, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="auto"
                  sx={{ maxHeight: "600px" }}
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

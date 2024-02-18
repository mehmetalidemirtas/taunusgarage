import React, { useEffect, useRef, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  Container,
  Box,
  Typography,
  Divider,
  Paper,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import MapIcon from "@mui/icons-material/Map";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import InstagramIcon from "@mui/icons-material/Instagram";
const Gallery = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [open, setOpen] = React.useState(true);
  const storage = getStorage();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageRefs = await listAll(ref(storage, "images"));
        const imageURLs = await Promise.all(
          imageRefs.items.map(async (imageRef) => {
            return await getDownloadURL(imageRef);
          })
        );
        setImages(imageURLs);
      } catch (error) {
        console.error("Mevcut resimleri alma hatası:", error);
      }
    };

    fetchImages();
  }, []);
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.error("Resim yükleme hatası:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("Dosya yüklendi. İndirme URL'si:", downloadURL);
          setImageUrl(downloadURL);
        });
      }
    );
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      handleClose();
    }, 6000);
  }, []);
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
    window.open("https://www.instagram.com/demirci_garagge/", "_blank");
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
              sx={{
                cursor: "pointer",
                marginRight: "10px",
                color: "#dedede",
                fontSize: "40px",
              }}
              onClick={redirectToFacebook}
            />
            <InstagramIcon
              sx={{ cursor: "pointer", color: "#dedede", fontSize: "40px" }}
              onClick={redirectToFacebook}
            />
          </Box>
        </div>
      </Box>
      <Container maxWidth={"xl"}>
        <Box sx={{ padding: "15px", marginTop: "15px" }}>
          <Typography variant="h6">İLETİŞİM</Typography>
          <Divider />
        </Box>
        <Box sx={{ padding: "15px", pt: 0 }}>
          <Typography>Mehmet Ali Demirci</Typography>
          <Typography>Telefon Numarası: +90 536 761 12 13</Typography>
          <Typography>
            Osmaniye Mahallesi, 81043. Sk. No:4/A, Toroslar/Mersin
          </Typography>
        </Box>
        <Box sx={{ padding: "15px", marginTop: "15px" }}>
          <Typography variant="h6">FOTOĞRAFLAR</Typography>
          <Divider />
        </Box>
        <Grid container spacing={2}>
          {images.map((photoPath, index) => (
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d199.64229725954024!2d34.61115175879984!3d36.81188754477042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1527f39b9fbebaeb%3A0x302ab86eded6f053!2sOsmaniye%2C%2081043.%20Sk.%20No%3A4%2C%2033220%20Toroslar%2FMersin!5e0!3m2!1str!2str!4v1708281745368!5m2!1str!2str"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
            style={{ border: 0 }}
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default Gallery;

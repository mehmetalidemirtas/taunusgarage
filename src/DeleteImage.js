import React, { useState, useEffect } from "react";
import {
  getStorage,
  ref,
  listAll,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import {
  Backdrop,
  Button,
  Card,
  CircularProgress,
  Container,
  Grid,
} from "@mui/material";

initializeApp(firebaseConfig);
const storage = getStorage();

function ImageGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchImages = async () => {
      try {
        const imageRefs = await listAll(ref(storage, "images"));
        const imageURLs = await Promise.all(
          imageRefs.items.map(async (imageRef) => {
            return {
              url: await getDownloadURL(imageRef),
              name: imageRef.name,
            };
          })
        );
        setImages(imageURLs);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Mevcut resimleri alma hatası:", error);
      }
    };

    fetchImages();
  }, []);

  const handleDelete = async (imageName) => {
    setLoading(true);
    try {
      await deleteObject(ref(storage, `images/${imageName}`));
      setImages(images.filter((image) => image.name !== imageName));
      console.log("Resim başarıyla silindi.");
      setLoading(false);
    } catch (error) {
      console.error("Resim silme hatası:", error);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth={"xl"}>
      <h2>Resimlerim</h2>

      <Grid container spacing={2}>
        {images.map((image, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <Card elevation={2}>
              <div
                key={index}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <img
                  src={image.url}
                  alt={`Resim ${index + 1}`}
                  style={{
                    marginRight: "10px",
                    marginBottom: "10px",
                    maxHeight: "500px",
                    padding: 1,
                  }}
                />
                <Button
                  variant="contained"
                  onClick={() => handleDelete(image.name)}
                >
                  Sil
                </Button>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}

export default ImageGallery;

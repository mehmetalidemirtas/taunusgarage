import React, { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

function UploadImage() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const storage = getStorage();
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.error("Resim yükleme hatası:", error);
      },
      () => {
        // Gönderim tamamlandığında çalışır
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setLoading(false);
          navigate("/");
        });
      }
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2 style={{ padding: 10 }}>Resim Seç</h2>
      <input style={{ padding: 10 }} type="file" onChange={handleImageChange} />

      {image !== null && (
        <Button
          variant="contained"
          sx={{ width: "300px", m: 2 }}
          onClick={handleUpload}
        >
          Seçilen Resimi Yükle
        </Button>
      )}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default UploadImage;

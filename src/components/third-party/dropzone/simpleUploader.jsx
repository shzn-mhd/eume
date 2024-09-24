import React, { useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Grid, Button, Typography, Paper, LinearProgress } from "@mui/material";
import {
  CameraOutlined,
  CloseOutlined,
  DeleteFilled,
} from "@ant-design/icons";



const SimpleUploader = ({
  imagesExist,
  handleFiles,
  multiple = false,
  handleRemoveExistingImage,
  uploadProgress,
  isDrawerOpen,
}) => {
  const [files, setFiles] = useState([]);
  const [err, setError] = useState("");

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: "image/*",
    multiple,
    maxSize: 10485760,
    maxFiles: 10,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) => ({
          ...file,
          preview: URL.createObjectURL(file),
        }))
      );
    },
  });

  useEffect(() => {
    if (fileRejections && fileRejections.length > 0) {
      const errorMessages = fileRejections
        .map(({ file, errors }) =>
          errors
            .map((e) =>
              e.code === "too-many-files"
                ? "Maximum 10 images can be uploaded"
                : e.message
            )
            .join(", ")
        )
        .join(", ");
      setError(errorMessages);
    } else {
      setError("");
    }
    handleFiles(files);
  }, [files, fileRejections]);

  useEffect(() => {
    if (!isDrawerOpen) {
      setFiles([]);
    }
  }, [isDrawerOpen]);

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const handleRemoveImage = (file) => {
    setFiles((prevState) => prevState.filter((fi) => fi.name !== file.name));
  };

  const thumbs = files?.map((file, index) => (
    <Grid item key={file.name}>
      <div>
        <img
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
            borderRadius: "4px",
          }}
          src={file.preview}
          alt={file.name}
        />
        <Button
          type="text"
          danger
          icon={<CloseOutlined />}
          onClick={() => handleRemoveImage(file)}
        />
        {uploadProgress && uploadProgress.length !== 0 && (
          <Progress
            percent={uploadProgress[index] ?? 0}
            size="small"
            style={{ width: "100%" }}
          />
        )}
      </div>
    </Grid>
  ));

  const thumbsExist = imagesExist?.map((file, index) => (
    <Grid item key={`existing-image-${index}`}>
      <div>
        <img
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
            borderRadius: "4px",
          }}
          src={file}
          alt={`existing-image-${index}`}
        />
        {handleRemoveExistingImage && (
          <Button
            type="text"
            danger
            icon={<DeleteFilled />}
            onClick={() => handleRemoveExistingImage(file)}
          />
        )}
      </div>
    </Grid>
  ));

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <Paper
        variant="outlined"
        square
        {...getRootProps()}
        style={{
          padding: "20px",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CameraOutlined style={{ fontSize: "3em", color: "#4caf50" }} />
        </div>
        <Typography variant="subtitle1" style={{ marginTop: "10px" }}>
          Drag your image
        </Typography>
        <Typography type="secondary">Image format: jpg, png, gif</Typography>
      </Paper>

      {err && <Typography type="danger">{err}</Typography>}

      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        {thumbsExist}
        {thumbs}
      </Grid>
    </div>
  );
};

export default SimpleUploader;

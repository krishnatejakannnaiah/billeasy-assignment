import React from "react";
import Modal from "react-modal";
import "./productmodal.css";
import { Typography } from "@mui/material";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function ProductModal({ open, handleClose, data }) {
  const { id, title, price, description, category, image, rating } = data;
  return (
    <Modal
      isOpen={open}
      onRequestClose={handleClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {data?.id && (
        <div className="modal-content">
          <div className="flex-wrap">
            <div className="div-one">
              <img src={image} alt="modal product" className="prd-img" />
            </div>
            <div>
              <Typography sx={{ marginBottom: "14px", color: "lightGreen" }}>
                {category}
              </Typography>
              <Typography
                sx={{ marginBottom: "10px", fontWeight: 600, fontSize: "18px" }}
              >
                {title}
              </Typography>
              <Typography
                sx={{
                  marginBottom: "12px",
                  fontWeight: 600,
                  fontSize: "24px",
                  color: "grey",
                }}
              >{`$${price}`}</Typography>
              <div style={{ width: "300px" }}>
                <Typography
                  sx={{
                    marginBottom: "12px",
                    fontWeight: 600,
                    fontSize: "16px",
                    color: "grey",
                  }}
                >{`${description}`}</Typography>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default ProductModal;

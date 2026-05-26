import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";


function UploadPage() {

  const navigate = useNavigate();

  const [file, setFile] =
    useState(null);

  const [sourceType,
    setSourceType] =
    useState("SAP");

  const [showSuccess,
    setShowSuccess] =
    useState(false);


  const uploadFile = async () => {

    if (!file) {

      alert(
        "Please select a file"
      );

      return;
    }

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    formData.append(
      "source_type",
      sourceType
    );

    try {

      await API.post(

        "upload/",

        formData,

        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setShowSuccess(true);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.error ||
        "Selected source does not match uploaded file."
      );
    }
  };


  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right, #dbeafe, #f0f9ff)",
        display: "flex",
        justifyContent:
          "center",
        alignItems: "center",
      }}
    >

      <div
        style={{
          backgroundColor:
            "white",
          padding: "50px",
          borderRadius: "18px",
          width: "450px",
          boxShadow:
            "0 6px 20px rgba(0,0,0,0.15)",
        }}
      >

        <h1
          style={{
            color: "#1e3a8a",
            marginBottom:
              "10px",
          }}
        >
          ESG Data Upload
        </h1>

        <p
          style={{
            color: "#475569",
            marginBottom:
              "30px",
          }}
        >
          Upload enterprise ESG
          source files for
          analyst review and
          audit processing.
        </p>

        <label style={labelStyle}>
          Select Source Type
        </label>

        <select
          value={sourceType}
          onChange={(e) =>
            setSourceType(
              e.target.value
            )
          }
          style={inputStyle}
        >

          <option value="SAP">
            SAP Fuel Data
          </option>

          <option value="UTILITY">
            Utility Electricity
          </option>

          <option value="TRAVEL">
            Corporate Travel
          </option>

        </select>

        <label style={labelStyle}>
          Upload CSV File
        </label>

        <input
          type="file"
          accept=".csv,.pdf,.xlsx,.txt"
          onChange={(e) =>
            setFile(
              e.target.files[0]
            )
          }
          style={{
            marginBottom:
              "25px",
          }}
        />

        <button
          onClick={uploadFile}
          style={{
            width: "100%",
            backgroundColor:
              "#2563eb",
            color: "white",
            padding: "14px",
            border: "none",
            borderRadius:
              "10px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Upload ESG Data
        </button>

        {/* SUCCESS POPUP */}

        {showSuccess && (

          <div
            style={{
              marginTop: "25px",
              backgroundColor:
                "#dcfce7",
              padding: "20px",
              borderRadius:
                "10px",
              textAlign:
                "center",
            }}
          >

            <h3
              style={{
                color: "#166534",
              }}
            >
              Upload Successful ✅
            </h3>

            <p
              style={{
                color: "#166534",
              }}
            >
              ESG records processed
              successfully.
            </p>

            <button
              onClick={() =>
                navigate(
                  "/dashboard"
                )
              }
              style={{
                marginTop: "10px",
                backgroundColor:
                  "#16a34a",
                color: "white",
                border: "none",
                padding:
                  "12px 20px",
                borderRadius:
                  "8px",
                cursor:
                  "pointer",
                fontWeight:
                  "bold",
              }}
            >
              Go to Dashboard
            </button>

          </div>

        )}

      </div>

    </div>
  );
}


const labelStyle = {

  display: "block",

  marginBottom: "10px",

  marginTop: "20px",

  fontWeight: "bold",

  color: "#334155",
};


const inputStyle = {

  width: "100%",

  padding: "12px",

  borderRadius: "8px",

  border:
    "1px solid #cbd5e1",

  marginBottom: "15px",
};


export default UploadPage;
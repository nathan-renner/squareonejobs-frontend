import React, { useRef, useState } from "react";
import Card from "./../../Card";

import {
  MdDelete,
  MdFileUpload,
  MdModeEdit,
  MdPictureAsPdf,
} from "react-icons/md";
import Button from "../../Button";
import useApi from "./../../../hooks/useApi";
import { deleteDocument, uploadDocument } from "./../../../api/users";

// const documents = [
//   {
//     name: "Resume.pdf",
//     url:
//       "https://squareonejobs-documents.s3.us-east-2.amazonaws.com/5f4a65ad493af94af0bdfbd6/Fake+Resume.pdf",
//   },
// ];

function Documents({
  portfolio,
  setProgress,
  setUploadVisible,
  updateDocuments,
  setLoading,
  edit = true,
  ...props
}) {
  const { documents } = portfolio;
  const [isEditing, setIsEditing] = useState(false);
  const uploadDocApi = useApi(uploadDocument);
  const deleteDocApi = useApi(deleteDocument);
  const uploadRef = useRef();

  const selectDocument = () => {
    uploadRef.current.click();
  };

  const handleDocumentChange = async (e) => {
    e.preventDefault();
    let newFile = e.target.files[0];

    for (let i = 0; i < documents.length; i++)
      if (documents[i].name === newFile.name)
        return window.alert("Cannot upload multiple files with the same name.");

    setProgress(0);
    setUploadVisible(true);

    const formData = new FormData();
    formData.append("document", newFile);

    const response = await uploadDocApi.request(formData, (progress) =>
      setProgress(progress)
    );
    if (response.ok) {
      updateDocuments(response.data);
      uploadRef.current.value = null;
      setIsEditing(false);
    }
  };

  const handleDeleteDocument = async (index) => {
    setLoading(true);
    const doc = documents[index];

    const response = await deleteDocApi.request(doc._id);
    if (response.ok) {
      updateDocuments(response.data);
      setIsEditing(false);
      setLoading(false);
    }
  };

  return (
    <Card className="documents" {...props}>
      {edit && (
        <div className="control-icons">
          <input
            ref={uploadRef}
            type="file"
            accept="application/pdf"
            onChange={handleDocumentChange}
            hidden
          />
          <MdFileUpload
            size={25}
            className="control-icon"
            onClick={selectDocument}
          />
          <MdModeEdit
            size={25}
            className={`control-icon ${isEditing ? "active" : null}`}
            onClick={() => setIsEditing(true)}
          />
        </div>
      )}
      <h2>Documents</h2>
      {documents.length === 0 && (
        <p style={{ marginBottom: 0 }}>No documents</p>
      )}
      {documents.length > 0 && (
        <div className="items">
          {documents.map((doc, index) => (
            <div className="doc" key={doc.name}>
              <div>
                <MdPictureAsPdf size={20} color="#ff5252" />
              </div>
              <a href={doc.url} target="_blank" rel="noreferrer">
                {doc.name}
              </a>
              {isEditing && (
                <div className="remove-icon-container">
                  <MdDelete
                    size={20}
                    className="remove-icon"
                    onClick={() => handleDeleteDocument(index)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {isEditing && (
        <div className="ok-button">
          <Button label="OK" onClick={() => setIsEditing(false)} />
        </div>
      )}
    </Card>
  );
}

export default Documents;

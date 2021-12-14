import React, { useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory, useLocation } from "react-router-dom";
import { MdCloudUpload } from "react-icons/md";

import { Button, Card } from "../../components/common";
import { ErrorMessage, FormField } from "../../components/forms";

import CompanySearch from "../../components/Auth/CompanySearch";
import FormDropdown from "./../../components/forms/FormDropdown";
import SubmitButton from "./../../components/forms/SubmitButton";

import industries from "../../data/industries";

const sizes = ["1-49", "50-149", "150-249", "250-499", "500-999", "1000+"];

function PostJob(props) {
  const history = useHistory();
  const uploadRef = useRef();
  const { state: pd } = useLocation();
  const [imagePreview, setImagePreview] = useState(
    pd && pd.imagePreview ? pd.imagePreview : null
  );
  const [companyLogo, setCompanyLogo] = useState(
    pd && pd.companyLogo ? pd.companyLogo : null
  );
  const [companyId, setCompanyId] = useState(
    pd && pd.companyId ? pd.companyId : false
  );
  const [companyName, setCompanyName] = useState(
    pd && pd.companyName ? pd.companyName : ""
  );
  const [error, setError] = useState(false);
  const [schema] = useState(
    companyId
      ? Yup.object().shape({})
      : Yup.object().shape({
          industry: Yup.string()
            .required("Required")
            .label("Industry")
            .oneOf(industries, "Must be a industry listed"),
          size: Yup.string()
            .label("Company Size")
            .required("Required")
            .label("Company Size"),
          websiteUrl: Yup.string()
            .label("websiteUrl")
            .required("Required")
            .label("Website Url"),
          description: Yup.string()
            .label("description")
            .required("Required")
            .label("Company Description"),
          locations: Yup.array().of(
            Yup.object().shape({
              street: Yup.string().label("Street"),
              city: Yup.string().label("City"),
              state: Yup.string().label("State"),
              zip: Yup.string().label("Zip").min(5).max(5),
              coordinates: Yup.array().of(Yup.number()),
            })
          ),
        })
  );

  const selectImage = () => {
    uploadRef.current.click();
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let newFile = e.target.files[0];

    reader.onloadend = () => {
      setCompanyLogo(newFile);
      setImagePreview(reader.result);
      setError(false);
    };
    reader.readAsDataURL(newFile);
  };

  const handleSubmit = (data) => {
    if (!companyId && companyName === "")
      return setError({ name: "name", message: "Company Name is required" });
    else if (!companyId && companyLogo === null)
      return setError({
        name: "companyLogo",
        message: "Company Logo is required",
      });

    if (companyId) {
      data = {};
      data.companyId = companyId;
    } else {
      delete data.companyId;
    }
    data.companyName = companyName;
    data.companyLogo = companyLogo;
    data.imagePreview = imagePreview;

    history.push("/auth/postjob-2", { ...pd, ...data });
  };

  return (
    <Card className="auth-container extended postjob">
      <h1>Welcome to SquareOneJobs!</h1>
      <p className="subtitle">
        Post your first job within minutes. First, tell us about your company.
      </p>
      <div className="company-form">
        <CompanySearch
          companyName={companyName}
          setCompanyName={setCompanyName}
          setCompanyId={setCompanyId}
          setError={setError}
          error={error}
        />
        {companyId && (
          <div className="success-button">
            <div />
            <Button label="Next" onClick={handleSubmit} />
          </div>
        )}
        {!companyId && (
          <Formik
            initialValues={
              pd
                ? pd
                : {
                    industry: "",
                    size: "",
                    websiteUrl: "",
                    description: "",
                  }
            }
            onSubmit={handleSubmit}
            validationSchema={schema}
          >
            {({ handleSubmit }) => (
              <div
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit();
                }}
              >
                <p className="image-label">Company Logo</p>
                <div className="image-picker" onClick={selectImage}>
                  <input
                    ref={uploadRef}
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleImageChange}
                    hidden
                  />
                  {imagePreview ? (
                    <img src={imagePreview} alt="Avatar" />
                  ) : (
                    <MdCloudUpload size={80} color="#1d8cf8" />
                  )}
                </div>
                <ErrorMessage
                  error={error && error.message}
                  visible={error && error.name === "companyLogo"}
                  className="text-center"
                />
                <FormDropdown
                  size="sm"
                  label="Industry"
                  name="industry"
                  items={industries}
                  autocomplete="off"
                />
                <FormDropdown
                  name="size"
                  size="sm"
                  label="Company Size"
                  items={sizes}
                  autocomplete="off"
                />
                <FormField
                  name="websiteUrl"
                  label="Website Url"
                  autocomplete="off"
                />
                <FormField
                  name="description"
                  label="Company Description"
                  type="textarea"
                  rows={10}
                />
                <div className="success-button">
                  <div />
                  <SubmitButton label="Next" />
                </div>
              </div>
            )}
          </Formik>
        )}
      </div>
    </Card>
  );
}

export default PostJob;

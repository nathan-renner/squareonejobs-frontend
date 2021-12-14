import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { useHistory, useLocation } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import _ from "underscore";

import { getLocations } from "./../../../api/companies";
import {
  getListingNoCompany,
  postDraft,
  updateDraft,
} from "./../../../api/listings";
import { useResponseModal } from "./../../../hooks/useResponseModal";
import useApi from "./../../../hooks/useApi";
import categories from "../../../data/categories";

import {
  FormCheckbox,
  FormField,
  FormDropdown,
  SubmitButton,
  FormDate,
} from "../../../components/forms";
import { ActivityIndicator, Button, Card } from "../../../components/common";
import AddLocation from "./AddLocation";
import { getProducts } from "api/payments";

const initialVals = {
  category: "",
  position: "",
  startDateTime: null,
  endDateTime: null,
  salary: "",
  wage: "",
  remote: false,
  driversLicense: false,
  description: "",
  benefits: "",
  otherQualifications: "",
  tags: [],
};

const flattenObject = (obj) => {
  const flattened = {};

  Object.keys(obj).forEach((key) => {
    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      key !== "location" &&
      key !== "startDateTime" &&
      key !== "endDateTime"
    ) {
      Object.assign(flattened, flattenObject(obj[key]));
    } else {
      flattened[key] = obj[key];
    }
    if (obj["other"]) {
      flattened["otherQualifications"] = flattened["other"];
      delete flattened["other"];
    }
  });

  return flattened;
};

const buildListing = (data, type, location) => {
  const builtListing = {
    type,
    category: data.category,
    details: {
      position: data.position,
      startDateTime: data.startDateTime,
      location,
      remote: data.remote,
      description: data.description,
      qualifications: {
        driversLicense: data.driversLicense,
        other: data.otherQualifications,
      },
    },
  };

  if (type.name === "Day Listing") {
    builtListing.details.endDateTime = data.endDateTime;
    builtListing.details.wage = parseFloat(data.wage);
  } else {
    builtListing.details.salary = data.salary;
    builtListing.details.benefits = data.benefits;
  }

  return builtListing;
};

function NewListing(props) {
  const [type, setType] = useState(false);
  const [locations, setLocations] = useState(false);
  const [location, setLocation] = useState(false);
  const [initialValues, setInitialValues] = useState(false);
  const [status, setStatus] = useState(false);
  const [isAddLocOpen, setIsAddLocOpen] = useState(false);
  const [jobTypes, setJobTypes] = useState(false);

  const history = useHistory();
  const { state: passedState } = useLocation();
  const { setModal } = useResponseModal();
  const getJobTypesApi = useApi(getProducts);
  const getLocationsApi = useApi(getLocations);
  const getListingApi = useApi(getListingNoCompany);

  const fetchListing = async () => {
    const res = await getListingApi.request(passedState);
    if (res.ok) {
      setStatus(res.data.status);
      setType(res.data.type);
      setLocation(res.data.details.location);
      getSavedLocations();
      setInitialValues(
        _.omit(flattenObject(res.data), ["status", "type", "details.location"])
      );
    } else
      setModal({
        type: "error",
        header: "Something went wrong",
        body: res.data,
        buttonText: "retry",
        onClick: fetchListing,
      });
  };

  const getSavedLocations = async () => {
    if (!locations) {
      const response = await getLocationsApi.request();
      if (response.ok) {
        return passedState &&
          typeof passedState === "object" &&
          !passedState.details.location.coordinates
          ? setLocations([...response.data, passedState.details.location])
          : setLocations(response.data);
      } else
        setModal({
          type: "error",
          header: "Error Receiving Previous Locations",
          body: response.data,
          buttonText: "Retry",
          onClick: () => getSavedLocations(),
        });
    }
  };

  useEffect(() => {
    if (
      passedState &&
      typeof passedState === "string" &&
      !initialValues &&
      !getListingApi.error
    )
      fetchListing();
    else if (passedState && typeof passedState === "object") {
      getSavedLocations();
      setType(passedState.type);
      setLocation(passedState.details.location);

      setInitialValues(
        _.omit(flattenObject(passedState), ["status", "type", "location"])
      );
    } else {
      getSavedLocations();
      setInitialValues(initialVals);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const getJobTypes = async () => {
      const response = await getJobTypesApi.request();
      if (response.ok) setJobTypes(response.data);
    };
    getJobTypes();
    // eslint-disable-next-line
  }, []);

  const schema = Yup.object().shape({
    category: Yup.string()
      .required("Required")
      .label("Category")
      .oneOf(categories, "Must be a category listed"),
    position: Yup.string().required("Required").label("Position").max(255),
    startDateTime: Yup.date()
      .typeError("Must be a valid date")
      .label("Start Time")
      .min(
        dayjs().add(3, "hours"),
        "Job start time must be at least 24 hours from now."
      ),
    endDateTime:
      type.name === "Day Listing"
        ? Yup.date()
            .typeError("Must be a valid date")
            .label("End Time")
            .required("Required")
            .min(Yup.ref("startDateTime"), "End time must be after start time.")
        : Yup.date().label("End Time").nullable(),
    salary:
      type.name !== "Day Listing"
        ? Yup.string().label("Salary").max(255).required("Required")
        : Yup.string().label("Salary").max(255),
    wage:
      type.name === "Day Listing"
        ? Yup.number()
            .label("Wage")
            .min(1)
            .required("Required")
            .typeError("Must be a number")
        : Yup.number().label("Wage").min(1),
    remote: Yup.boolean().label("Remote"),
    driversLicense: Yup.boolean().label("Driver's Licence Required"),
    description: Yup.string().required("Required").label("Description"),
    benefits:
      type.name !== "Day Listing"
        ? Yup.string().label("Benefits").required("Required")
        : Yup.string().label("Benefits"),
    otherQualifications: Yup.string(),
    tags: Yup.array().of(Yup.string()),
  });

  const handleSubmit = (i) => {
    const builtListing = buildListing(i, type, location);

    if (status === "draft") {
      builtListing._id = passedState.id;
    }

    history.push("/new-listing/review", builtListing);
  };

  const handleSaveDraft = async (i) => {
    const builtListing = buildListing(i, type, location);
    console.log(builtListing);

    if (status === "draft") {
      const response = await updateDraft(builtListing, passedState);
      if (response.ok) history.push("/my-listings/drafts");
      else
        setModal({
          type: "error",
          header: "Something went wrong",
          body: response.data,
          buttonText: "Retry",
          onClick: () => handleSaveDraft(i),
        });
    } else {
      const response = await postDraft(builtListing);
      if (response.ok) history.push("/my-listings/drafts");
      else
        setModal({
          type: "error",
          header: "Something went wrong",
          body: response.data,
          buttonText: "Retry",
          onClick: () => handleSaveDraft(i),
        });
    }
  };

  return (
    <div className="post-listing">
      <ActivityIndicator
        visible={
          getLocationsApi.loading ||
          getListingApi.loading ||
          getJobTypesApi.loading
        }
      />
      <Card>
        <h1>Post Listing</h1>
        {initialValues && (
          <>
            <div className={`section ${!type ? "nopadding" : ""}`}>
              <h2>Job Type</h2>
              <div className="types-container">
                {jobTypes &&
                  jobTypes.map((btn) => (
                    <div
                      className={`job-type ${
                        btn.name === type.name ? "active" : ""
                      }`}
                      onClick={() => setType(btn)}
                      key={btn.name}
                    >
                      <div>
                        <p className="type-text">{btn.name}</p>
                        <h3>
                          {btn.price}
                          {btn.subscription && <span>/month</span>}
                        </h3>
                        <p className="type-subtext">{btn.description}</p>
                      </div>
                      <Button
                        label={`${
                          btn.name === type.name ? "Selected" : "Select"
                        }`}
                        color={`${
                          btn.name === type.name ? "primary" : "transparent"
                        }`}
                        textColor={`${
                          btn.name === type.name ? "white" : "primary"
                        }`}
                        outline
                        onClick={() => setType(btn)}
                      />
                    </div>
                  ))}
              </div>
            </div>
            {type && (
              <Formik
                enableReinitialize={true}
                validationSchema={schema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
              >
                {({ validateForm, values }) => (
                  <>
                    <div className="section">
                      <h2>Overview</h2>
                      <FormField name="position" label="Position" />
                      <FormDropdown
                        name="category"
                        label="Category"
                        items={categories}
                      />
                      {type.name === "Day Listing" ? (
                        <FormField name="wage" label="Wage" startingChar="$" />
                      ) : (
                        <FormField name="salary" label="Salary" />
                      )}
                      <div className="split">
                        <FormDate
                          name="startDateTime"
                          label={`Start Date${
                            type.name === "Day Listing" ? "/Time" : ""
                          }`}
                          time={type.name === "Day Listing"}
                          minDate={dayjs().add(3, "hours")}
                        />
                        {type.name === "Day Listing" && (
                          <FormDate
                            name="endDateTime"
                            label="End Date/Time"
                            time
                            minDate={dayjs(values["startDateTime"])}
                          />
                        )}
                      </div>
                    </div>
                    <div className="section">
                      <h2>Location</h2>
                      {!locations ? (
                        <div>Loading Previous Locations...</div>
                      ) : (
                        <>
                          {locations.length === 0 ? (
                            <div>No saved locations.</div>
                          ) : (
                            <>
                              {locations.map((loc, i) => (
                                <div
                                  key={i}
                                  className={`location ${
                                    loc.street === location.street
                                      ? "active"
                                      : ""
                                  }`}
                                  onClick={() => {
                                    setIsAddLocOpen(false);
                                    setLocation(
                                      location.street === loc.street
                                        ? false
                                        : loc
                                    );
                                  }}
                                >
                                  <div className="location-text">
                                    <MdLocationOn className="icon" size={20} />
                                    <p>
                                      {`${loc.street}, ${loc.city}, ${loc.state} ${loc.zip}`}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </>
                          )}
                        </>
                      )}
                      {isAddLocOpen ? (
                        <AddLocation
                          handleSubmit={(i) => {
                            setLocations([...locations, i]);
                            setLocation(i);
                            setIsAddLocOpen(false);
                          }}
                        />
                      ) : (
                        <p
                          className="add-location"
                          onClick={() => {
                            setIsAddLocOpen(true);
                          }}
                        >
                          + Add new location
                        </p>
                      )}
                    </div>
                    <div className="section">
                      <h2>Details</h2>
                      <FormCheckbox name="remote" label="Remote work" />
                      <FormField
                        name="description"
                        label="Description"
                        type="textarea"
                        rows={10}
                      />
                      {type.name !== "Day Listing" && (
                        <FormField
                          name="benefits"
                          label="Benefits"
                          type="textarea"
                          rows={10}
                        />
                      )}
                    </div>
                    <div className="section">
                      <h2>Qualifications</h2>
                      <FormCheckbox
                        name="driversLicense"
                        label="Driver's License Required"
                      />
                      <FormField
                        name="otherQualifications"
                        label="Other Qualifications"
                        type="textarea"
                        rows={10}
                      />
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <Button
                        label="Save as Draft"
                        color="transparent"
                        textColor="primary"
                        style={{ marginLeft: ".1em" }}
                        onClick={() =>
                          validateForm().then(() => handleSaveDraft(values))
                        }
                      />
                      <SubmitButton
                        label="Review Listing"
                        style={{ marginLeft: "auto" }}
                      />
                    </div>
                  </>
                )}
              </Formik>
            )}
          </>
        )}
      </Card>
    </div>
  );
}

export default NewListing;

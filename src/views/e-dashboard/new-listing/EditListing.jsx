import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { MdLocationOn } from "react-icons/md";
import { useHistory, useParams } from "react-router-dom";
import _ from "underscore";
import dayjs from "dayjs";

import { getLocations } from "../../../api/companies";
import { getListingNoCompany, updateListing } from "../../../api/listings";
import { useResponseModal } from "../../../hooks/useResponseModal";
import useApi from "../../../hooks/useApi";

import AddLocation from "./AddLocation";
import { ActivityIndicator, Card } from "../../../components/common";
import {
  FormCheckbox,
  FormFieldLine,
  FormDate,
  FormDropdown,
  SubmitButton,
} from "../../../components/forms";

const categories = [
  "Accounting",
  "Administrative Support",
  "Architecture",
  "Art",
  "Business",
  "Communications",
  "Computer Science",
  "Construction",
  "Customer Service",
  "Design",
  "E-Commerce",
  "Education & Training",
  "Engineering",
  "Entertainment",
  "Farming & Fishing",
  "Healthcare",
  "Human Resources",
  "Legal",
  "Management",
  "Marketing",
  "Mechanic",
  "Protective Services",
  "Real Estate",
  "Restaurant & Food Ind.",
  "Sales",
  "Social Sciences",
  "Social Work",
  "Technology Support",
  "Transportation",
  "Warehousing",
];

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

  if (type === "day") {
    builtListing.details.endDateTime = data.endDateTime;
    builtListing.details.wage = parseFloat(data.wage);
  } else {
    builtListing.details.salary = data.salary;
    builtListing.details.benefits = data.benefits;
  }

  return builtListing;
};

function EditListing(props) {
  const history = useHistory();
  const { id } = useParams();

  const getLocationsApi = useApi(getLocations);
  const getListingApi = useApi(getListingNoCompany);
  const updateListingApi = useApi(updateListing);

  const [type, setType] = useState(false);
  const [isAddLocOpen, setIsAddLocOpen] = useState(false);
  const [initialVals, setInitialVals] = useState(false);
  const [locations, setLocations] = useState(false);
  const [location, setLocation] = useState(false);
  const { setModal } = useResponseModal();

  const fetchListing = async () => {
    const res = await getListingApi.request(id);
    if (res.ok) {
      setType(res.data.type);
      setLocation(res.data.details.location);
      setInitialVals(
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

  useEffect(() => {
    getSavedLocations();
    if (!initialVals && !getListingApi.error) fetchListing();
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
        dayjs().add(1, "days"),
        "Job start time must be at least 24 hours from now."
      ),
    endDateTime:
      type === "day"
        ? Yup.date()
            .typeError("Must be a valid date")
            .label("End Time")
            .required("Required")
            .min(Yup.ref("startDateTime"), "End time must be after start time.")
        : Yup.date().label("End Time").nullable(),
    salary:
      type !== "day"
        ? Yup.string().label("Salary").max(255).required("Required")
        : Yup.string().label("Salary").max(255),
    wage:
      type === "day"
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
      type !== "day"
        ? Yup.string().label("Benefits").required("Required")
        : Yup.string().label("Benefits"),
    otherQualifications: Yup.string(),
    tags: Yup.array().of(Yup.string()),
  });

  const getSavedLocations = async () => {
    if (!locations) {
      const response = await getLocationsApi.request();
      if (response.ok) {
        return setLocations(response.data);
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

  const handleSubmit = async (i) => {
    const builtListing = buildListing(i, type, location);

    const response = await updateListingApi.request(builtListing, id);
    if (response.ok) {
      setModal({
        header: "Listing updated",
        buttonText: "OK",
        onButtonClick: () => {
          history.push(`/listing/${id}`);
          setModal(false);
        },
      });
    } else {
      setModal({
        type: "error",
        header: "Something went wrong",
        body: response.data,
        buttonText: "Retry",
        onButtonClick: fetchListing,
      });
      setInitialVals(i);
    }
  };

  return (
    <div className="post-listing">
      <ActivityIndicator
        visible={getLocationsApi.loading || getListingApi.loading}
      />
      <Card>
        <h1>Edit Listing</h1>
        {initialVals && (
          <>
            <div className={`section ${!type ? "nopadding" : ""}`}>
              <h2>Job Type</h2>
              <p>{type.charAt(0).toUpperCase() + type.slice(1)}</p>
            </div>
            <Formik
              enableReinitialize={true}
              validationSchema={schema}
              initialValues={initialVals}
              onSubmit={handleSubmit}
            >
              {({ values }) => (
                <>
                  <div className="section">
                    <h2>Overview</h2>
                    <FormFieldLine name="position" label="Position" />
                    <FormDropdown
                      name="category"
                      label="Category"
                      items={categories}
                    />
                    {type === "day" ? (
                      <FormFieldLine
                        name="wage"
                        label="Wage"
                        startingChar="$"
                      />
                    ) : (
                      <FormFieldLine name="salary" label="Salary" />
                    )}
                    <div className="split">
                      <FormDate
                        name="startDateTime"
                        label={`Start Date${type === "day" ? "/Time" : ""}`}
                        time={type === "day"}
                        minDate={dayjs().add(1, "days")}
                      />
                      {type === "day" && (
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
                                  loc.street === location.street ? "active" : ""
                                }`}
                                onClick={() => {
                                  setIsAddLocOpen(false);
                                  setLocation(
                                    location.street === loc.street ? false : loc
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
                    <FormFieldLine
                      name="description"
                      label="Description"
                      type="textarea"
                      rows={10}
                    />
                    {type !== "day" && (
                      <FormFieldLine
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
                    <FormFieldLine
                      name="otherQualifications"
                      label="Other Qualifications"
                      type="textarea"
                      rows={10}
                    />
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <SubmitButton
                      label="Update Listing"
                      style={{ marginLeft: "auto" }}
                    />
                  </div>
                </>
              )}
            </Formik>
          </>
        )}
      </Card>
    </div>
  );
}

export default EditListing;

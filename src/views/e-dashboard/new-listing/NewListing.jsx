import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import FormField from "../../../components/forms/FormField";
import * as Yup from "yup";
import Card from "../../../components/Card";
import FormDatePicker from "../../../components/forms/FormDatePicker";
import SubmitButton from "../../../components/forms/SubmitButton";
import Button from "../../../components/Button";
import { MdCheck } from "react-icons/md";
import FormDropdown from "../../../components/forms/FormDropdown";
import { useHistory, useLocation } from "react-router-dom";
import { getLocations } from "./../../../api/companies";
import ActivityIndicator from "./../../../components/ActivityIndicator";
import useApi from "./../../../hooks/useApi";
import { getListing, postDraft, updateDraft } from "./../../../api/listings";
import { useResponseModal } from "./../../../hooks/useResponseModal";

const initialVals = {
  category: "",
  position: "",
  location: {
    street: "",
    city: "",
    state: "",
    zip: "",
    coordinates: undefined,
  },
  startDateTime: null,
  endDateTime: null,
  salary: "",
  wage: undefined,
  remote: "",
  description: "",
  benefits: "",
  otherQualifications: "",
  tags: [],
};
const types = [
  { type: "day", name: "Day Job" },
  { type: "part", name: "Part Time" },
  { type: "full", name: "Full Time" },
];
const categories = [
  "Restaurant Services",
  "Sales",
  "Construction",
  "Warehouse",
  "Driving",
  "E-Commerce",
  "Labor",
  "Technology Support",
];
const states = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

function NewListing(props) {
  const history = useHistory();
  const { state: prevListing } = useLocation();
  const [type, setType] = useState(false);
  const [prevLoc, setPrevLoc] = useState(false);
  const [savedLocs, setSavedLocs] = useState(false);
  const [location, setLocation] = useState(false);
  const [dl, setDl] = useState(false);
  const [remote, setRemote] = useState(false);
  const [initialValues, setInitialValues] = useState(false);
  const { setModal } = useResponseModal();
  const [status, setStatus] = useState(false);

  const getLocationsApi = useApi(getLocations);
  const getListingApi = useApi(getListing);

  const fetchListing = async () => {
    const res = await getListingApi.request(prevListing);
    if (res.ok) {
      setStatus(res.data.status);
      setType(res.data.type);
      handlePrevLoc();
      setDl(
        res.data.details.qualifications &&
          res.data.details.qualifications.driversLicense
      );
      setRemote(res.data.details.remote && res.data.details.remote);
      setLocation(res.data.details.location);
      setInitialValues({
        category: res.data.category,
        otherQualifications: res.data.details.qualifications
          ? res.data.details.qualifications.other
          : "",
        ...res.data.details,
      });
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
    if (prevListing && !initialValues && !getListingApi.error) fetchListing();
    else setInitialValues(initialVals);
    // eslint-disable-next-line
  }, []);

  const schema = Yup.object().shape({
    category: Yup.string().required().label("Category"),
    position: Yup.string().required().label("Position").max(255),
    location: Yup.object().shape({
      street: Yup.string().label("Street"),
      city: Yup.string().label("City"),
      state: Yup.string().label("State"),
      zip: Yup.string().label("Zip").min(5).max(5),
      coordinates: Yup.array().of(Yup.number()),
    }),
    startDateTime: Yup.date().label("Start Time"),
    endDateTime:
      type === "day"
        ? Yup.date().label("End Time").required()
        : Yup.date().label("End Time").nullable(),
    salary:
      type !== "day"
        ? Yup.string().label("Salary").max(255).required()
        : Yup.string().label("Salary").max(255),
    wage:
      type === "day"
        ? Yup.number().label("Wage").min(1).required()
        : Yup.number().label("Wage").min(1),
    remote: Yup.boolean().label("Remote"),
    description: Yup.string().required().label("Description"),
    benefits:
      type !== "day"
        ? Yup.string().label("Benefits").required()
        : Yup.string().label("Benefits"),
    otherQualifications: Yup.string(),
    tags: Yup.array().of(Yup.string()),
  });

  const handlePrevLoc = async () => {
    if (!prevLoc && !savedLocs) {
      setPrevLoc(!prevLoc);
      const response = await getLocationsApi.request();
      if (response.ok) setSavedLocs(response.data);
    } else setPrevLoc(!prevLoc);
  };

  const handleSubmit = (i) => {
    const data = {
      type,
      category: i.category,
      details: {
        position: i.position,
        startDateTime: i.startDateTime,
        location:
          prevLoc && location
            ? location
            : {
                street: i.street,
                city: i.city,
                state: i.state,
                zip: i.zip,
              },
        remote,
        description: i.description,
        qualifications: {
          driversLicense: dl,
          other: i.otherQualifications,
        },
      },
    };

    if (data.details.qualifications.other === "")
      delete data.details.qualifications.other;
    if (!data.details.qualifications.driversLicense)
      delete data.details.qualifications.driversLicense;
    if (type === "day") {
      data.details.endDateTime = i.endDateTime;
      data.details.wage = i.wage;
    } else {
      data.details.salary = i.salary;
      data.details.benefits = i.benefits;
    }

    if (status === "draft") {
      data._id = prevListing;
    }

    history.push("/new-listing/review", data);
  };

  const handleSaveDraft = async (i) => {
    const data = {
      type,
      category: i.category,
      details: {
        position: i.position,
        startDateTime: i.startDateTime,
        location:
          prevLoc && location
            ? location
            : {
                street: i.street,
                city: i.city,
                state: i.state,
                zip: i.zip,
              },
        remote,
        description: i.description,
        qualifications: {
          driversLicense: dl,
          other: i.otherQualifications,
        },
      },
    };

    if (data.details.qualifications.other === "")
      delete data.details.qualifications.other;
    if (!data.details.qualifications.driversLicense)
      delete data.details.qualifications.driversLicense;
    if (type === "day") {
      data.details.endDateTime = i.endDateTime;
      data.details.wage = i.wage;
    } else {
      data.details.salary = i.salary;
      data.details.benefits = i.benefits;
    }
    if (status === "draft") {
      const response = await updateDraft(data, prevListing);
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
      const response = await postDraft(data);
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

  const renderTypes = () => {
    return types.map((t) => (
      <label
        className="radio-button"
        key={t.type}
        onClick={() => setType(t.type)}
      >
        <input type="radio" checked={type === t.type} />
        <span className="checkmark"></span>
        {t.name}
      </label>
    ));
  };

  return (
    <div className="post-listing">
      <ActivityIndicator
        visible={getLocationsApi.loading || getListingApi.loading}
      />
      <h1>Post Listing</h1>
      <Card>
        {initialValues && (
          <>
            <div className={`section ${!type ? "nopadding" : ""}`}>
              <h2>Job Type</h2>
              <div className="types-container">{renderTypes()}</div>
            </div>
            {type && (
              <Formik
                validationSchema={schema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
              >
                {({ validateForm, values }) => (
                  <>
                    <div className="section">
                      <h2>Overview</h2>
                      <FormField size="sm" name="position" label="Position" />
                      <FormDropdown
                        size="sm"
                        name="category"
                        label="Category"
                        items={categories}
                      />
                      {type === "day" ? (
                        <FormField size="sm" name="wage" label="Wage" />
                      ) : (
                        <FormField size="sm" name="salary" label="Salary" />
                      )}
                      <FormDatePicker
                        size="sm"
                        name="startDateTime"
                        label={`Start Date${type === "day" ? "/Time" : ""}`}
                        showTimeSelect={type === "day"}
                      />
                      {type === "day" && (
                        <FormDatePicker
                          size="sm"
                          name="endDateTime"
                          label="End Date/Time"
                          showTimeSelect={type === "day"}
                        />
                      )}
                    </div>
                    <div className="section">
                      <h2>Location</h2>
                      <label
                        className="checkbox"
                        onChange={handlePrevLoc}
                        style={{ marginBottom: "1em" }}
                      >
                        <input type="checkbox" defaultChecked={prevLoc} />
                        <span className="checkmark"></span>
                        Use Previous Location
                      </label>
                      {prevLoc ? (
                        <>
                          {!savedLocs ? (
                            <div>Loading Previous Locations...</div>
                          ) : (
                            <>
                              {savedLocs.length === 0 ? (
                                <div>No saved locations.</div>
                              ) : (
                                <>
                                  {savedLocs.map((loc, i) => (
                                    <div
                                      key={i}
                                      className={`location ${
                                        loc.street === location.street
                                          ? "active"
                                          : ""
                                      }`}
                                      onClick={() =>
                                        setLocation(
                                          location.street === loc.street
                                            ? false
                                            : loc
                                        )
                                      }
                                    >
                                      {loc.street === location.street && (
                                        <MdCheck size={20} color="#51cc8e" />
                                      )}
                                      <p>
                                        -{" "}
                                        {`${loc.street} ${loc.city} ${loc.state} ${loc.zip}`}
                                      </p>
                                    </div>
                                  ))}
                                </>
                              )}
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          <FormField size="sm" name="street" label="Address" />
                          <FormField size="sm" name="city" label="City" />
                          <div className="split">
                            <FormDropdown
                              size="sm"
                              name="state"
                              label="State"
                              items={states}
                            />
                            <FormField size="sm" name="zip" label="Zip Code" />
                          </div>
                        </>
                      )}
                    </div>
                    <div className="section">
                      <h2>Details</h2>
                      <label
                        className="checkbox"
                        onChange={() => setRemote(!remote)}
                        style={{ marginBottom: "1em" }}
                      >
                        <input type="checkbox" defaultChecked={remote} />
                        <span className="checkmark"></span>
                        Remote Work
                      </label>
                      <FormField
                        name="description"
                        label="Description"
                        type="textarea"
                      />
                      {type !== "day" && (
                        <FormField
                          name="benefits"
                          label="Benefits"
                          type="textarea"
                        />
                      )}
                    </div>
                    <div className="section">
                      <h2>Qualifications</h2>
                      <label
                        className="checkbox"
                        onChange={() => setDl(!dl)}
                        style={{ marginBottom: "1em" }}
                      >
                        <input type="checkbox" defaultChecked={dl} />
                        <span className="checkmark"></span>
                        Driver's License Required
                      </label>
                      <FormField
                        name="otherQualifications"
                        label="Other Qualifications"
                        type="textarea"
                      />
                    </div>
                    <SubmitButton
                      label="Review Listing"
                      style={{ marginLeft: "auto" }}
                    />
                    <Button
                      label="Save as Draft"
                      color="transparent"
                      textColor="primary"
                      style={{ marginLeft: ".1em" }}
                      onClick={() =>
                        validateForm().then(() => handleSaveDraft(values))
                      }
                    />
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

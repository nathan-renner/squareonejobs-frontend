import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import FormField from "../../../components/forms/FormField";
import * as Yup from "yup";
import Card from "../../../components/Card";
import FormDatePicker from "../../../components/forms/FormDatePicker";
import SubmitButton from "../../../components/forms/SubmitButton";
import { MdCheck } from "react-icons/md";
import FormDropdown from "../../../components/forms/FormDropdown";
import { useHistory, useParams } from "react-router-dom";
import { getLocations } from "./../../../api/companies";
import ActivityIndicator from "./../../../components/ActivityIndicator";
import useApi from "./../../../hooks/useApi";
import { getListing, updateListing } from "./../../../api/listings";
import ResponseModal from "./../../../components/ResponseModal";
import { useResponseModal } from "./../../../hooks/useResponseModal";

// const initialVals = {
//   category: "",
//   position: "",
//   location: {
//     street: "",
//     city: "",
//     state: "",
//     zip: "",
//     coordinates: undefined,
//   },
//   startDateTime: null,
//   endDateTime: null,
//   salary: "",
//   wage: undefined,
//   remote: "",
//   description: "",
//   benefits: "",
//   otherQualifications: "",
//   tags: [],
// };
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

function UpdateListing(props) {
  const history = useHistory();
  const { id } = useParams();

  const getLocationsApi = useApi(getLocations);
  const getListingApi = useApi(getListing);
  const updateListingApi = useApi(updateListing);

  const [type, setType] = useState(false);
  const [initialVals, setInitialVals] = useState(false);
  const [prevLoc, setPrevLoc] = useState(false);
  const [savedLocs, setSavedLocs] = useState(false);
  const [location, setLocation] = useState(false);
  const [dl, setDl] = useState(false);
  const { setModal } = useResponseModal();

  const fetchListing = async () => {
    const res = await getListingApi.request(id);
    if (res.ok) {
      setType(res.data.type);
      setDl(
        res.data.details.qualifications &&
          res.data.details.qualifications.driversLicense
      );
      handlePrevLoc();
      setLocation(res.data.details.location);
      setInitialVals({
        category: res.data.category,
        otherQualifications: res.data.details.qualifications
          ? res.data.details.qualifications.other
          : "",
        ...res.data.details,
      });
    } else setModal({ type: "error", body: res.data });
  };

  useEffect(() => {
    if (!initialVals && !getListingApi.error) fetchListing();
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

  const handleSubmit = async (i) => {
    const data = {
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

    const response = await updateListingApi.request(data, id);
    if (response.ok) {
      history.push(`/listing/${id}`);
    } else {
      setModal({
        type: "error",
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
      <h1>Update Listing</h1>
      <Card>
        {initialVals && (
          <>
            <div className={`section ${!type ? "nopadding" : ""}`}>
              <h2>Job Type</h2>
              <p>{type.charAt(0).toUpperCase() + type.slice(1)}</p>
            </div>
            <Formik
              validationSchema={schema}
              initialValues={initialVals}
              onSubmit={handleSubmit}
            >
              {() => (
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
                  <SubmitButton label="Update Listing" style={{ margin: 0 }} />
                </>
              )}
            </Formik>
          </>
        )}
      </Card>
    </div>
  );
}

export default UpdateListing;

import React, { useEffect, useRef, useState } from "react";
import useApi from "../../hooks/useApi";
import { getCompanies } from "../../api/companies";

import { TextInput } from "../common";

import ErrorMessage from "./../forms/ErrorMessage";

function CompanySearch({
  companyName,
  setCompanyName,
  setCompanyId,
  error,
  setError,
}) {
  const wrapperRef = useRef(null);
  const [opened, setOpened] = useState(false);
  const getCompaniesApi = useApi(getCompanies);
  const [companyResults, setCompanyResults] = useState(false);

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpened(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };
  useOutsideAlerter(wrapperRef);

  const fetchCompanies = async () => {
    const response = await getCompaniesApi.request(companyName);
    if (response.ok) {
      setCompanyResults(response.data);
    }
  };

  useEffect(() => {
    if (companyName.length > 2 && opened) {
      fetchCompanies();
    }
    // eslint-disable-next-line
  }, [companyName]);

  return (
    <div className="company-search" ref={wrapperRef}>
      <TextInput
        size="sm"
        value={companyName}
        label="Company Name"
        onChange={(e) => {
          if (e.target.value === "")
            setError({ name: "name", message: "Company Name is required" });
          else setError(false);
          setCompanyId(false);
          setCompanyName(e.target.value);
        }}
        onFocus={() => setOpened(true)}
      />
      <ErrorMessage
        error={error && error.message}
        visible={error && error.name === "name"}
      />
      <div
        className={`options ${
          opened && companyName.length > 2 ? "active" : null
        }`}
      >
        {(!companyResults || getCompaniesApi.loading) && (
          <div className="option disabled">Loading companies...</div>
        )}
        {companyResults && companyResults.length === 0 && (
          <div className="option disabled">No existing companies found.</div>
        )}
        {companyResults &&
          companyResults.map((c) => (
            <div
              className="option"
              key={c._id}
              onClick={() => {
                setCompanyId(c._id);
                setCompanyName(c.name);
                setOpened(false);
              }}
            >
              <img src={c.logo} alt={`${c.name}'s logo`} />
              <p>{c.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CompanySearch;

import React, { useEffect, useState } from "react";
import useApi from "./../../../hooks/useApi";
import { getMyReferences, getUserReferences } from "./../../../api/users";
import ReferencesList from "./ReferencesList";
import ActivityIndicator from "./../../ActivityIndicator";

function ReferencesModal({ isOpen, employer = false, id }) {
  const refApi = useApi(employer ? getUserReferences : getMyReferences);
  const [references, setReferences] = useState(false);

  const fetchRefs = async () => {
    const response = await refApi.request(employer ? id : null);
    if (response.ok) setReferences(response.data);
  };

  useEffect(() => {
    if (isOpen && !references && !refApi.loading) fetchRefs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <>
      <ActivityIndicator visible={refApi.loading} />
      <div className="references">
        {references && references.length > 0 ? (
          <ReferencesList references={references} />
        ) : (
          <p>No references</p>
        )}
      </div>
    </>
  );
}

export default ReferencesModal;

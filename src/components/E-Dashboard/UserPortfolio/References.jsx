import React, { useState } from "react";

import ReferencesList from "./../../Dashboard/Portfolio/ReferencesList";
import ReferencesModal from "./../../Dashboard/Portfolio/ReferencesModal";

import { Card, Modal } from "../../common";

function References({ portfolio, setLoading, id, ...props }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Modal
        visible={isOpen}
        title="All References"
        Content={ReferencesModal}
        onCancel={() => setIsOpen(false)}
        componentProps={{ isOpen, employer: true, id }}
      />
      <Card className="references" {...props}>
        <div className="ref-header">
          <h2>
            References ({portfolio.references && portfolio.references.length})
          </h2>
          <p onClick={() => setIsOpen(true)}>See more</p>
        </div>
        {portfolio.references && portfolio.references.length > 0 ? (
          <ReferencesList small references={portfolio.references} />
        ) : (
          <p>No references</p>
        )}
      </Card>
    </>
  );
}

export default References;

import React, { useState } from "react";

import ReferencesList from "./ReferencesList";
import ReferencesModal from "./ReferencesModal";

import { Card, Modal } from "../../common";

function References({ portfolio, setLoading, ...props }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Modal
        visible={isOpen}
        title="All References"
        Content={ReferencesModal}
        onCancel={() => setIsOpen(false)}
        componentProps={{ isOpen }}
      />
      <Card className="references" {...props}>
        <div className="ref-header">
          <h2>References ({portfolio.referencesLength})</h2>
          <p onClick={() => setIsOpen(true)}>See more</p>
        </div>
        {portfolio.referencesLength !== undefined ? (
          <ReferencesList small references={portfolio.references} />
        ) : (
          <p>No references</p>
        )}
      </Card>
    </>
  );
}

export default References;

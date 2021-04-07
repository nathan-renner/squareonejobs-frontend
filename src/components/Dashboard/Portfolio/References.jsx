import React, { useState } from "react";
import Card from "./../../Card";
import Modal from "./../../Modal";
import ReferencesList from "./ReferencesList";
import ReferencesModal from "./ReferencesModal";

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
          <h2>References ({portfolio.references.length})</h2>
          <p onClick={() => setIsOpen(true)}>See more</p>
        </div>
        {portfolio.references.length > 0 ? (
          <ReferencesList small references={portfolio.references} />
        ) : (
          <p>No references</p>
        )}
      </Card>
    </>
  );
}

export default References;

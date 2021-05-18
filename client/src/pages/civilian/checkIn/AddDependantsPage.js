import React, { useState } from "react";
import AddDependants from "./AddDependants";
import AcceptDependants from "./AcceptDependants";

export default function AddDependantsPage({ setProperty }) {
  const [showDeps, setShowDeps] = useState(false);

  if (showDeps) {
    return <AddDependants showDeps={setShowDeps} />;
  }
  return <AcceptDependants setProperty={setProperty} showDeps={setShowDeps} />;
}

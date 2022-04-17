import React, { useState } from "react";

// eslint-disable-next-line react/prop-types
const Editable = ({ text, type, placeholder, children, ...props }) => {
  const [isEditing, setEditing] = useState(false);
  return (
    <section {...props}>
      {isEditing ? (
        <div onBlur={() => setEditing(false)}>{children}</div>
      ) : (
        <div onClick={() => setEditing(true)}>
          <span>{text || placeholder || "Editable content"}</span>
        </div>
      )}
    </section>
  );
};

export default Editable;

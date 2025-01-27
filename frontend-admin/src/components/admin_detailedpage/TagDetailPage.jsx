import React from "react";

function TagDetailPage({ name }) {
  return (
    <span className="bg-gray-600 text-white inline-block text-sm rounded-sm p-1 font-medium">
      {name}
    </span>
  );
}

export default TagDetailPage;

import React from "react";

function EventFilter({ onSortAscending, onSortDescending }) {
  return (
    <div className="filters">

      <button onClick={onSortAscending} className="sort-asc-btn">
        Sort by Date Ascending
      </button>
      
      <button onClick={onSortDescending} className="sort-desc-btn">
        Sort by Date Descending
      </button>
    </div>
  );
}

export default EventFilter;

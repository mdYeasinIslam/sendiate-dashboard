import React from 'react';

// Skeleton Table Loader
const SkeletonTable = () => {
  return (
    <div className="skeleton-table">
      <div className="skeleton-table-header">
        <div className="skeleton-header-cell"></div>
        <div className="skeleton-header-cell"></div>
        <div className="skeleton-header-cell"></div>
        <div className="skeleton-header-cell"></div>
      </div>
      <div className="skeleton-table-body">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="skeleton-table-row">
            <div className="skeleton-cell"></div>
            <div className="skeleton-cell"></div>
            <div className="skeleton-cell"></div>
            <div className="skeleton-cell"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonTable;

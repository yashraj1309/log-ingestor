import React from 'react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';

const ErrorList = ({ errorData }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
  const pageCount = Math.ceil(errorData.length / pageSize);

  const handlePageChange = (event) => {
    setCurrentPage(event.selected);
  };

  const errorList = errorData.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  return (
    <div className='container'>
      {errorList.map((error) => (
        <div key={error._id}>
          <h3>Error Message: {error.message}</h3>
          <p>Resource ID: {error.resourceId}</p>
          <p>Timestamp: {error.timestamp}</p>
          <p>Trace ID: {error.traceId}</p>
          <p>Span ID: {error.spanId}</p>
          <p>Commit: {error.commit}</p>
          <p>Metadata: {JSON.stringify(error.metadata)}</p>
        </div>
      ))}
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
      />
    </div>
  );
};

export default ErrorList;

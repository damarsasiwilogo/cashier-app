import React, { useState } from 'react';

function ProductTable({ products }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = products.slice(firstItemIndex, lastItemIndex);

  return (
    <div>
      <table>
        {/* Your table headers and rows here */}
      </table>
      {/* Your pagination controls here */}
    </div>
  );
}

export default ProductTable;
import React from 'react';
import Link from 'next/link';
import PaginationStyles from './styles/PaginationStyles';

function Pagination({ count, pageCount, page }) {
  const pages = Math.ceil(count / pageCount);
  return (
    <PaginationStyles>
      <Link
        href={{
          pathname: 'items',
          query: { page: page - 1 },
        }}>
        <a className="prev" aria-disabled={page <= 1}>
          ← Prev
        </a>
      </Link>
      <p>
        Page {page} from {pages}
      </p>
      <p>{count} items total</p>
      <Link
        href={{
          pathname: 'items',
          query: { page: page + 1 },
        }}>
        <a className="prev" aria-disabled={page >= pages}>
          Next →
        </a>
      </Link>
    </PaginationStyles>
  );
}

export default Pagination;

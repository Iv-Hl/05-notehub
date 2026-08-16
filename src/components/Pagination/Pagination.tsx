import ReactPaginate from 'react-paginate'
import type { ReactPaginateProps } from 'react-paginate'
import css from './Pagination.module.css'

interface PaginationProps {
  pageCount: number
  currentPage: number
  onPageChange: (page: number) => void
}

// react-paginate ships a double-wrapped CJS default export; this dev
// toolchain's pre-bundler doesn't unwrap it, so fall back to `.default`.
const PaginationList = (
  (ReactPaginate as unknown as { default?: typeof ReactPaginate }).default ?? ReactPaginate
)

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const handlePageChange: ReactPaginateProps['onPageChange'] = ({ selected }) => {
    onPageChange(selected + 1)
  }

  return (
    <PaginationList
      pageCount={pageCount}
      forcePage={currentPage - 1}
      onPageChange={handlePageChange}
      previousLabel="←"
      nextLabel="→"
      breakLabel="..."
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  )
}

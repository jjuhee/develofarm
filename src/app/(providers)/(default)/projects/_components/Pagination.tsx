import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi"

interface Props {
  pageCount: number
  currentPage: number
  onPageChange: (e: React.ChangeEvent<unknown>, value: number) => void
}

const Pagination = ({ pageCount, currentPage, onPageChange }: Props) => {
  const MAX_VISIBLE_PAGES = 5

  const startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2))
  const endPage = Math.min(pageCount, startPage + MAX_VISIBLE_PAGES - 1)

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  )

  /** 페이지가 없을 경우 return; */
  if (pageCount === 0) return

  return (
    <nav className="flex justify-center mt-10">
      <ul className="flex gap-2 items-center">
        {/* 맨앞 버튼 */}
        <li
          key="front"
          className={`${
            currentPage === 1
              ? "cursor-not-allowed"
              : "hover:bg-blue-200 cursor-pointer"
          } px-2 py-2 rounded`}
          onClick={(e) => currentPage > 1 && onPageChange(e, 1)}
        >
          <FiChevronsLeft className="text-xl text-[#777777]" />
        </li>
        {/* 이전 버튼 */}
        <li
          key="prev"
          className={`${
            currentPage === 1
              ? "cursor-not-allowed"
              : "hover:bg-blue-200 cursor-pointer"
          } px-2 py-2 rounded`}
          onClick={(e) => currentPage > 1 && onPageChange(e, currentPage - 1)}
        >
          <FiChevronLeft className="text-xl text-[#777777]" />
        </li>

        {/* 페이지 버튼 */}
        {startPage > 1 && (
          <li className="px-4 py-2 rounded cursor-not-allowed">...</li>
        )}
        {pages.map((page) => (
          <li
            key={page}
            className={`${
              currentPage === page ? " text-black" : " text-[#777777]"
            } cursor-pointer px-3 py-2 rounded hover:text-main-lime`}
            onClick={(e) => onPageChange(e, page)}
          >
            {page}
          </li>
        ))}
        {endPage < pageCount && (
          <li className="px-4 py-2 rounded cursor-not-allowed">...</li>
        )}

        {/* 다음 버튼 */}
        <li
          key="next"
          className={`${
            currentPage === pageCount
              ? "cursor-not-allowed"
              : "hover:bg-blue-200 cursor-pointer"
          } px-2 py-2 rounded`}
          onClick={(e) =>
            currentPage < pageCount && onPageChange(e, currentPage + 1)
          }
        >
          <FiChevronRight className="text-xl text-[#777777]" />
        </li>
        {/* 맨뒤 버튼 */}
        <li
          key="end"
          className={`${
            currentPage === pageCount
              ? "cursor-not-allowed"
              : "hover:bg-blue-200 cursor-pointer"
          } px-2 py-2 rounded`}
          onClick={(e) => currentPage < pageCount && onPageChange(e, pageCount)}
        >
          <FiChevronsRight className="text-xl text-[#777777]" />
        </li>
      </ul>
    </nav>
  )
}

export default Pagination

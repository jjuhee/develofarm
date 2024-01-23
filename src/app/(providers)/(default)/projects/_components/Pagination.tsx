import { FiChevronLeft, FiChevronRight } from "react-icons/fi" // Import icons from your preferred icon library

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

  return (
    <nav className="flex justify-center mt-8">
      <ul className="flex gap-2">
        {/* 이전 버튼 */}
        <li
          key="prev"
          className={`${
            currentPage === 1 ? "cursor-not-allowed" : "hover:bg-blue-200"
          } px-4 py-2 rounded`}
          onClick={(e) => currentPage > 1 && onPageChange(e, currentPage - 1)}
        >
          <FiChevronLeft className="text-xl" />
        </li>

        {/* 페이지 버튼 */}
        {startPage > 1 && (
          <li className="px-4 py-2 rounded cursor-not-allowed">...</li>
        )}
        {pages.map((page) => (
          <li
            key={page}
            className={`${
              currentPage === page
                ? "bg-main-lime text-black"
                : "hover:bg-blue-200"
            } cursor-pointer px-4 py-2 rounded`}
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
              : "hover:bg-blue-200"
          } px-4 py-2 rounded`}
          onClick={(e) =>
            currentPage < pageCount && onPageChange(e, currentPage + 1)
          }
        >
          <FiChevronRight className="text-xl" />
        </li>

        {/* TODO: 맨앞, 맨뒤 이동 버튼 추가 */}
      </ul>
    </nav>
  )
}

export default Pagination

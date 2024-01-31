// import React, { useRef } from "react"

// interface Props {
//   onChangeRecruitHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
//   setIsOpenOrder: (value: React.SetStateAction<boolean>) => void
//   onChangeOrder: (order: number) => void
// }

// const SortButton = ({onChangeRecruitHandler, setIsOpenOrder, onChangeOrder}: Props) => {
//   const sortRef = useRef(null)

//   return (
//     <div
//     className="relative w-[120px] text-[14px] font-[400]"
//     ref={sortRef}
//   >
//     <button
//       onClick={() => setIsOpenOrder((prev) => !prev)}
//       className="flex justify-between items-center pl-5 pr-2 w-full h-[30px] rounded-2xl bg-[#D2D2D2] "
//     >
//       {order === 1 ? "최신순" : order === 2 ? "오래된순" : "찜한순"}
//       {isOpenOrder ? <IoIosArrowUp /> : <IoIosArrowDown />}
//     </button>
//     {isOpenOrder && (
//       <ul className="absolute z-10 bg-white shadow-md w-full cursor-pointer rounded-lg">
//         <li
//           className="pl-5 py-1 hover:bg-[#D2D2D2]"
//           onClick={() => onChangeOrder(1)}
//         >
//           최신순
//         </li>
//         <li
//           className="pl-5 py-1 hover:bg-[#D2D2D2]"
//           onClick={() => onChangeOrder(2)}
//         >
//           오래된순
//         </li>
//         <li
//           className="pl-5 py-1 hover:bg-[#D2D2D2]"
//           onClick={() => onChangeOrder(3)}
//         >
//           찜한순
//         </li>
//       </ul>
//     )}
//   </div>
//   )
// }

// export default SortButton

import dayjs from "dayjs"

function formatDate(date: string) {
  return dayjs(date).format("YYYY-MM-DD")
}

export default formatDate

import sanitizeHtml from "sanitize-html"

const useHtmlParser = (content: string) => {
  /** span 태그만 허용 지정 */
  const cleaned = sanitizeHtml(content, {
    allowedTags: ["span"],
  })

  return {
    __html: cleaned,
  }
}

export default useHtmlParser

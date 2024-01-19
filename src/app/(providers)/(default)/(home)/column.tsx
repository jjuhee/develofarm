import React from "react"
const puppeteer = require("puppeteer")

const Column = () => {
  const getData = async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    // 해당 URL을 엽니다 (서핏 홈페이지)
    await page.goto("https://www.surfit.io/")

    // #app 안의 HTML을 가져오는 JavaScript 코드를 실행합니다
    const result = await page.evaluate(() => {
      const appElement: any = document.getElementById("app")
      const fNXhRgElements = appElement.querySelectorAll(".fNXhRg")
      const data: any = []

      // 각 fNXhRg 요소에 대해 데이터를 추출합니다
      fNXhRgElements.forEach((fNXhRgElement: any) => {
        const articleElement = fNXhRgElement.querySelector(".ct-item.kEUFAj")

        if (articleElement) {
          // cZLSKk 클래스를 가진 요소 가져오기
          const cZLSKkElement = articleElement.querySelector(".cZLSKk")

          if (cZLSKkElement) {
            // 링크 가져오기
            const linkElement = cZLSKkElement.querySelector("a")
            const linkHref = linkElement ? linkElement.href : ""

            // 섹션 및 썸네일 요소 가져오기
            const section = articleElement.querySelector("section")
            const thumbnail = section
              ? section.querySelector(".article-thumbnail-box")
              : null

            // 이미지 속성 가져오기
            const image = thumbnail ? thumbnail.querySelector("img") : null
            const src = image ? image.getAttribute("src") : ""

            // 타이틀 및 내용 가져오기
            const header = cZLSKkElement.querySelector("header")
            const h2 = header ? header.querySelector("h2") : null
            const title = h2 ? h2.querySelector(".ellipsis.title") : ""
            const titleText = title ? title.innerText : ""
            const content = header
              ? header.querySelector(".content-desc.ellipsis")
              : ""
            const contentText = content ? content.innerText : ""

            // 데이터를 객체로 만들어 배열에 추가합니다
            data.push({ src, titleText, contentText, linkHref })
          }
        }
      })

      return data
    })

    // 브라우저를 닫습니다
    await browser.close()

    return result
  }
  const crawlingData = getData()
    .then((data) => console.log(data))
    .catch((error) => console.error(error))

  return (
    <>
      {/* <div>칼럼컴포넌트 입니다.</div>
      {crawlingData?.map((item: any, index: any) => (
        <div key={index}>
          <h2>{item.titleText}</h2>
          <p>{item.contentText}</p>
          <p>{item.linkHref}</p>
          <p>{item.src}이미지 유알엘</p>
        </div>
      ))} */}
    </>
  )
}

export default Column

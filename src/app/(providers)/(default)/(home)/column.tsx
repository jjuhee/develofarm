import React from "react"
import cheerio, { Cheerio } from "cheerio"

const getData = async () => {
  let dataArray: any = []
  console.log("123")
  const geekNewsUrl = "https://news.hada.io/"
  // const serfitUrl = "https://www.surfit.io/"
  const response = await fetch(geekNewsUrl)
  const html = await response.text()
  console.log("HTML", html)
  const $ = cheerio.load(html)

  $(".topictitle").each((_, element) => {
    const title = $(element).find("h1").text().trim()
    const content = $(element).next(".topicdesc").find("a").text().trim()
    const link = $(element).find("a").attr("href")

    dataArray.push({ title, content, link })
  })
  return dataArray
}
const Column = async () => {
  const data = await getData()

  return (
    <>
      <div>칼럼컴포넌트 입니다.</div>
      {data?.map((item: any, index: any) => (
        <div key={index}>
          <h2>{item.title}</h2>
          <p>{item.content}</p>
          <p>{item.link}</p>
        </div>
      ))}
    </>
  )
}

export default Column

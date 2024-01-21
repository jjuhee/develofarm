import React from "react"
import puppeteer, { ElementHandle, Browser, Page } from "puppeteer"
import Columns from "./Columns"
import Image from "next/image"

let browser: Browser
let page: Page

const GetSurfitArticles = async () => {
  if (!browser) {
    browser = await puppeteer.launch({ headless: "new" })
  }
  if (!page) {
    page = await browser.newPage()
  }

  await page.goto("https://www.surfit.io/")

  const articleNodes = (await page.$$(
    ".ct-item > div",
  )) as ElementHandle<HTMLDivElement>[]

  const surfitArticles = await Promise.all(
    articleNodes.map(async (articleNode) => {
      const linkNode = await articleNode.$("a")
      const linkHref = await linkNode?.evaluate((linkEl) =>
        linkEl.getAttribute("href"),
      )

      const imgNode = await articleNode.$(".article-thumbnail-inner > img")
      const imgSrc = await imgNode?.evaluate((imgEl) =>
        imgEl.getAttribute("src"),
      )

      const titleNode = await articleNode.$(".title")
      const title = await titleNode?.evaluate((titleEl) => titleEl.textContent)

      const descriptionNode = await articleNode.$(".content-desc")
      const description = await descriptionNode?.evaluate(
        (descriptionEl) => descriptionEl.textContent,
      )

      const result = {
        href: linkHref,
        imgSrc: imgSrc,
        title,
        description,
      }

      return result
    }),
  )

  return surfitArticles
}

const Column = async () => {
  const surfitArticles = await GetSurfitArticles()

  return (
    <>
      <div>칼럼컴포넌트 입니다.</div>
      {/* {surfitArticles.map((surfitArticle) => (
        <div key={surfitArticle.href}>
          <div className="relative w-[300px] aspect-square">
            <Image alt={surfitArticle.title} src={surfitArticle.imgSrc} fill />
          </div>
          <h4>{surfitArticle.title}</h4>
        </div>
      ))} */}
      <Columns surfitArticles={surfitArticles} />
    </>
  )
}

export default Column

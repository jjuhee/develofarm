import React from "react"
import puppeteer, { ElementHandle, Browser, Page } from "puppeteer"
import Columns from "./Columns"
let browser: Browser
let page: Page

interface TSurfitArticles {
  description: string
  href: string
  imgSrc: string
  title: string
}

export const revalidate = 60

const GetSurfitArticles = async () => {
  if (!browser) {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disabled-setupid-sandbox"],
    })
  }
  if (!page) {
    page = await browser.newPage()
  }

  await page.goto("https://www.surfit.io/")

  await page.waitForSelector(".ct-item > div")
  const articleNodes = (await page.$$(
    ".ct-item > div",
  )) as ElementHandle<HTMLDivElement>[]
  const surfitArticles = await Promise.all(
    articleNodes.map(async (articleNode) => {
      const linkNode = await articleNode.$("a")
      const href = linkNode
        ? await linkNode.evaluate((linkEl) => linkEl.getAttribute("href"))
        : "링크가 존재하지 않습니다."
      const imgNode = await articleNode.$(".article-thumbnail-inner > img")
      const imgSrc = imgNode
        ? await imgNode.evaluate((imgEl) => imgEl.getAttribute("src"))
        : "/images/firework.jpg"
      const titleNode = await articleNode.$(".title")
      const title = titleNode
        ? await titleNode.evaluate((titleEl) => titleEl.textContent)
        : "더 자세한 내용은 직접 확인하세요!"
      const descriptionNode = await articleNode.$(".content-desc")
      const description = descriptionNode
        ? await descriptionNode?.evaluate(
            (descriptionEl) => descriptionEl.textContent,
          )
        : "해당기사를 직접 확인하세요!"
      const result = {
        href,
        imgSrc,
        title,
        description,
      }
      return result
    }),
  )
  console.log("어디있나 언디파인", surfitArticles)
  return surfitArticles
}

const Column = async () => {
  const surfitArticles = await GetSurfitArticles()
  return (
    <>
      <Columns surfitArticles={surfitArticles as TSurfitArticles[]} />
    </>
  )
}

export default Column

import React from "react"
import puppeteer, { ElementHandle, Browser, Page } from "puppeteer"
// import Columns from "./Columns"
let browser: Browser
let page: Page

interface TSurfitArticles {
  description: string
  href: string
  imgSrc: string
  title: string
}

const GetSurfitArticles = async () => {
  //   if (!browser) {
  //     browser = await puppeteer.launch({
  //       headless: true,
  //       args: ["--no-sandbox", "--disabled-setupid-sandbox"],
  //     })
  //   }
  //   if (!page) {
  //     page = await browser.newPage()
  //   }
  //   await page.goto("https://www.surfit.io/")
  //   const articleNodes = (await page.$$(
  //     ".ct-item > div",
  //   )) as ElementHandle<HTMLDivElement>[]
  //   const surfitArticles = await Promise.all(
  //     articleNodes.map(async (articleNode) => {
  //       const linkNode = await articleNode.$("a")
  //       const linkHref = await linkNode?.evaluate((linkEl) =>
  //         linkEl.getAttribute("href") ? linkEl.getAttribute("href") : "",
  //       )
  //       const imgNode = await articleNode.$(".article-thumbnail-inner > img")
  //       const imgSrc = await imgNode?.evaluate((imgEl) =>
  //         imgEl.getAttribute("src") !== undefined
  //           ? imgEl.getAttribute("src")
  //           : "/images/Frame1.png",
  //       )
  //       const titleNode = await articleNode.$(".title")
  //       const title = await titleNode?.evaluate((titleEl) =>
  //         titleEl.textContent !== undefined
  //           ? titleEl.textContent
  //           : "더 자세한 내용은 직접 확인하세요!",
  //       )
  //       const descriptionNode = await articleNode.$(".content-desc")
  //       const description = await descriptionNode?.evaluate((descriptionEl) =>
  //         descriptionEl.textContent !== undefined
  //           ? descriptionEl.textContent
  //           : "해당 기사를 직접 확인하세요!",
  //       )
  //       const result = {
  //         href: linkHref,
  //         imgSrc: imgSrc,
  //         title,
  //         description,
  //       }
  //       return result
  //     }),
  //   )
  //   console.log("어디있나 언디파인", surfitArticles)
  //   return surfitArticles
}

const Column = async () => {
  // const surfitArticles = await GetSurfitArticles()
  return (
    <>
      {/* <Columns surfitArticles={surfitArticles as TSurfitArticles[]} /> */}
    </>
  )
}

export default Column

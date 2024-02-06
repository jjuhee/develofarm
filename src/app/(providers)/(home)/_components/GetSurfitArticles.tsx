import React from "react"
import puppeteer, { ElementHandle, Browser, Page } from "puppeteer"
import Columns from "./Columns"
import { setSurfitCrawlingData } from "../api"
let browser: Browser
let page: Page

interface TSurfitArticles {
  description: string
  href: string
  imgSrc: string
  title: string
  now: string
}

const current = new Date()
const now = current.toLocaleString()
const GetSurfitArticles = async () => {
  if (!browser) {
    browser = await puppeteer.launch({
      headless: "new",
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
        now,
      }
      return result
    }),
  )
  return surfitArticles
}

const Column = async () => {
  //1.처음 로드되었을때 데이터를 크롤링한다.
  //2. 가져온 첫번째 데이터의 값을 확인하여 제대로 undefined 한 값이 있는지 확인
  //3. undefined 한 값이면 다시 크롤링, 아니면 supabase에 insert
  let surfitArticles
  let refreshedSurfitArticles
  for (let i = 0; i < 20; i++) {
    surfitArticles = await GetSurfitArticles()

    const checkoutData =
      surfitArticles[0].title === "더 자세한 내용은 직접 확인하세요!"
    if (!checkoutData) {
      break
    }
    console.log("크롤링 데이터", surfitArticles)
    setSurfitCrawlingData({ surfitArticles })
  }

  //4. supabase에 데이터가 들어가있는지 확인하고 데이터 가져오기
  //5 데이터 뿌려주기
  //6.supabase에 값이 들어있으면 더이상 크롤링 할 필요 X

  //추가작업, stale data는 삭제해주기

  return (
    <>
      <Columns surfitArticles={surfitArticles as TSurfitArticles[]} />
    </>
  )
}
export default Column

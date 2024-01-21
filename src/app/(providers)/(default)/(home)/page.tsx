import Main from "./_components/Main"
import GetSurfitArticles from "./_components/GetSurfitArticles"
import puppeteer, { ElementHandle } from "puppeteer"

export default function Home() {
  return (
    <>
      <Main>
        <GetSurfitArticles />
      </Main>
    </>
  )
}

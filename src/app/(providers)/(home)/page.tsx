import Main from "./_components/Main"
import GetSurfitArticles from "./_components/GetSurfitArticles"

export const revalidate = 3600
export default function Home() {
  return (
    <>
      <Main>
        <GetSurfitArticles />
      </Main>
    </>
  )
}

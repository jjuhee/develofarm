import Main from "./_components/Main"
import GetSurfitArticles from "./_components/GetSurfitArticles"

export default function Home() {
  return (
    <>
      {/* TODO: 굳이 children으로 두는 이유? */}
      {/* Main 컴포넌트 내부 혹은 아래에 둬도 되지 않을까? */}
      {/* children을 사용하는 이유: 부모 컴포넌트가 재사용되면서 내부에 꼭 들어가야 할 내용이 있을 때 */}
      <Main>
        <GetSurfitArticles />
      </Main>
    </>
  )
}

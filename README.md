## 프로젝트 목차
[1. 프로젝트 소개](#프로젝트-소개)  
[2. 사용 기술](#사용-기술)  
[3. Code Convention](#code-convention)    
[4. Git Convention](#git-convention)    
[5. 파일 구조](#파일-구조)    
[6. 최종 디자인 시안](#최종-디자인-시안-및-와이어프레임)    
[7. 배포-주소](#배포-주소)  
[8. 팀 소개](#팀-소개)  
[9. 깃허브 조회 수](#깃허브-조회-수)

## 프로젝트 소개
- 프로젝트 이름: <img src="https://github.com/jjuhee/nbcamp_final/assets/57513472/18ec3e42-b239-4d9c-a4d1-153e54bf7202" width="20" height="20"/> **Developfarm**  
- 프로젝트 기간: 2024.01.05~2024.02.07
- 프로젝트 소개: 주니어 개발자들의 성장을 위해 손쉽게 아이디어 좋은 프로젝트에 참여하거나 프로젝트에 필요한 팀원을 찾을 수 있게 만들고, 개발 능력을 향상시키기 위한 튜터링 및 자료 공유를 할 수 있는 플랫폼  
- 기획의도:
    - 주니어 개발자의 성장을 도와 막연한 개발자가 아닌 프로페셔널한 개발자로 거듭나기 위한 플랫폼을 만들고자 하는 의지가 담겨 있습니다.  
    - 개발자들 사이에 좀 더 효율적이고 가독성 좋은 코드를 개발하기 위해 포트폴리오를 함께 할 수 있는 협업 프로젝트에 필요성을 느꼈습니다.  
    - 라이브러리나, 기술등의 공식문서가 한글화가 되어 있으면서 공식문서의 중요성과 사용법을 익히자는 취지가 담겨있습니다.
- 배포 주소: [develofarm](https://www.develofarm.site/)

## 사용 기술

### Enviroment

<img src="https://img.shields.io/badge/GIT-F05032?style=for-the-badge&logo=Git&logoColor=white"/></a>
<img src="https://img.shields.io/badge/GITHUB-181717?style=for-the-badge&logo=GitHub&logoColor=white"/></a>
<img src="https://img.shields.io/badge/VISUAL STUDIO CODE-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"/></a>

### Config

<img src="https://img.shields.io/badge/YARN-2C8EBB?style=for-the-badge&logo=Yarn&logoColor=white"/></a>

### Development Language
<img src="https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"/></a>
<img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"/></a>
<img src="https://img.shields.io/badge/TYPESCRIPT-3178C6?style=for-the-badge&logo=typescript&logoColor=black"/></a> 

### Framework
<img src="https://img.shields.io/badge/NEXT.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/></a> 

#### State Management

- Server Side State
<img src="https://img.shields.io/badge/React Query-61DAFB?style=for-the-badge&logo=reactquery&logoColor=white"/></a>

- Client Side State
<img src="https://img.shields.io/badge/ZUSTAND-F3DF49?style=for-the-badge&logo=standardjs&logoColor=black"/></a>

### Database

<img src="https://img.shields.io/badge/SUPABASE-3FCF8E?style=for-the-badge&logo=supabase&logoColor=black"/></a>  

### style 
<img src="https://img.shields.io/badge/TAILWIND-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/></a>  

### Communication

<img src="https://img.shields.io/badge/SLACK-4A154B?style=for-the-badge&logo=Slack&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white"/></a>
<img src="https://img.shields.io/badge/FIGMA-F24E1E?style=for-the-badge&logo=Figma&logoColor=white"/></a>

## Code Convention
[Code Convention Link](https://spiced-manx-85c.notion.site/Code-Convention-1699b23f6a6f4dcaaeac5e3f738dc4f9)

## Git Convention
[Git Convention Link](https://spiced-manx-85c.notion.site/Github-Rules-94c6a0fa69d541f2bf4c03d1929f5151)

## 파일 구조
```
📦src
 ┣ 📂app
 ┃ ┣ 📂(providers)
 ┃ ┃ ┣ 📂(default)
 ┃ ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┃ ┃ ┣ 📜HeaderFrontNav.tsx
 ┃ ┃ ┃ ┃ ┣ 📜HeaderNav.tsx
 ┃ ┃ ┃ ┃ ┣ 📜Notifications.tsx
 ┃ ┃ ┃ ┃ ┗ 📜TabNav.tsx
 ┃ ┃ ┃ ┣ 📂members
 ┃ ┃ ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┃ ┃ ┣ 📜MemberCard.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜MemberCategory.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜MemberComponent.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜MemberInvitationCard.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜MemberList.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜MemberProfileModal.tsx
 ┃ ┃ ┃ ┃ ┣ 📜api.ts
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂profile
 ┃ ┃ ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┃ ┃ ┣ 📂notification
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📂profileProject
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📂update
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┃ ┃ ┣ 📂NotificationPage
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜NotificationList.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📂ProfilePage
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂projectLists
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ProfileProjectCard.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ProfileProjectList.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂resumes
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ProfileAcademy.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ProfileCareer.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ProfileEducation.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ProfileResume.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ProfileSpec.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ProfileActions.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ProfileSocialLinks.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ProfileUserData.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📂UpdatePage
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ProfileAcademyForm.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ProfileCareerForm.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ProfileEducationForm.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ProfileSocialForm.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ProfileSpecForm.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ProfileUpdateButton.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ProfileUserDataForm.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜ProfileCategory.tsx
 ┃ ┃ ┃ ┃ ┣ 📜api.ts
 ┃ ┃ ┃ ┃ ┗ 📜layout.tsx
 ┃ ┃ ┃ ┣ 📂projects
 ┃ ┃ ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂_applicants
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ApplyingMembers.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜AuthorizeActionButtons.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ParticipatingMembers.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜RemoveParticipatingMemberButton.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂_comments
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Comment.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CommentEditForm.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CommentForm.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Comments.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ReComment.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ReComments.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂_footer
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FooterAuthButton.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FooterList.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FooterMenus.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FooterPublicIcon.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜PublicShareButton.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂_header
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ProjectMetaInfo.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ProjectWriterInfo.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜TechStackTag.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜TeckStackMenuBar.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜WriterEditRemoveButtons.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜api.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Pagination.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ProjectCard.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ProjectCardTechs.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ProjectList.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Projects.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ProjectsComponent.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜SortButton.tsx
 ┃ ┃ ┃ ┃ ┣ 📜api.ts
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂write
 ┃ ┃ ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Attatchment.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜BubbleMenuButtons.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Category.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Editor.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜EditorMenu.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜SelectStackButton.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜Tiptap.tsx
 ┃ ┃ ┃ ┃ ┣ 📜api.tsx
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┗ 📜layout.tsx
 ┃ ┃ ┣ 📂(feature)
 ┃ ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┃ ┃ ┗ 📜SignIn.tsx
 ┃ ┃ ┃ ┣ 📂search
 ┃ ┃ ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┃ ┃ ┣ 📜SearchInput.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜SearchedHistory.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜SearchedProjectLists.tsx
 ┃ ┃ ┃ ┃ ┣ 📜api.ts
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂signin
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┗ 📜layout.tsx
 ┃ ┃ ┣ 📂(home)
 ┃ ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┃ ┣ 📜Columns.tsx
 ┃ ┃ ┃ ┃ ┣ 📜FourRightColumns.tsx
 ┃ ┃ ┃ ┃ ┣ 📜GetSurfitArticles.tsx
 ┃ ┃ ┃ ┃ ┣ 📜InitialLeftColumn.tsx
 ┃ ┃ ┃ ┃ ┣ 📜Main.tsx
 ┃ ┃ ┃ ┃ ┣ 📜Mainbanner.tsx
 ┃ ┃ ┃ ┃ ┣ 📜MostBookmarked.tsx
 ┃ ┃ ┃ ┃ ┣ 📜SelectedLeftColumn.tsx
 ┃ ┃ ┃ ┃ ┣ 📜TypingNetbookImage.tsx
 ┃ ┃ ┃ ┃ ┗ 📜WatchingScreenImage.tsx
 ┃ ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📜api.ts
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜globals.css
 ┃ ┣ 📜layout.tsx
 ┃ ┣ 📜not-found.tsx
 ┃ ┗ 📜provider.tsx
 ┣ 📂components
 ┃ ┣ 📂ui
 ┃ ┃ ┣ 📜Button.tsx
 ┃ ┃ ┣ 📜Checkbox.tsx
 ┃ ┃ ┣ 📜FloatingButton.tsx
 ┃ ┃ ┗ 📜Spacer.tsx
 ┃ ┣ 📜BookmarkButton.tsx
 ┃ ┣ 📜CustomModal.tsx
 ┃ ┣ 📜EmptyState.tsx
 ┃ ┣ 📜NotFoundButtons.tsx
 ┃ ┗ 📜ScrollToTop.tsx
 ┣ 📂hooks
 ┃ ┣ 📜useAddNotiMutate.ts
 ┃ ┣ 📜useBookmarks.ts
 ┃ ┣ 📜useCustomModal.ts
 ┃ ┣ 📜useDebounce.ts
 ┃ ┣ 📜useLoginConfirmModal.ts
 ┃ ┣ 📜useOnClickOutSide.ts
 ┃ ┣ 📜useResizeDebounce.ts
 ┃ ┣ 📜useScrollEvent.ts
 ┃ ┣ 📜useScrollLock.ts
 ┃ ┣ 📜useSearchHooks.ts
 ┃ ┗ 📜useSignInAndSignOut.ts
 ┣ 📂store
 ┃ ┣ 📜category.ts
 ┃ ┣ 📜customModal.ts
 ┃ ┣ 📜members.ts
 ┃ ┣ 📜profile.ts
 ┃ ┣ 📜projects.ts
 ┃ ┣ 📜url.ts
 ┃ ┗ 📜user.ts
 ┣ 📂supabase
 ┃ ┣ 📜supabase.client.ts
 ┃ ┗ 📜supabase.server.ts
 ┣ 📂types
 ┃ ┣ 📜extendedType.ts
 ┃ ┣ 📜projects.ts
 ┃ ┣ 📜supabase.ts
 ┃ ┣ 📜users.ts
 ┃ ┗ 📜window.d.ts
 ┗ 📂utils
 ┃ ┣ 📜formatDate.ts
 ┃ ┗ 📜scrollTop.ts
```


## 최종 디자인 시안 및 와이어프레임
[프로젝트 디자인](https://www.figma.com/file/dfclDcs68BCz7nXq5XmpJm/B%EB%B0%98-3%EC%A1%B0?type=design&node-id=609-2418&mode=design&t=Ji2Yq5inryiucybq-0)

## 배포 주소
https://www.develofarm.site

## 팀 소개
- 팀이름: **行くぞ！！！(이쿠조!!!)**

|팀원|역할|맡은 페이지|MBTI|깃허브 주소|블로그 주소|
|------|---|---|---|---|---|
|김은비|**리더**|프로젝트&인재풀 페이지, 헤더&푸터 레이아웃|ISTP|https://github.com/eunbime|https://velog.io/@eunbi/posts|
|김주희|**부리더**|프로젝트 작성&수정 페이지|ISFP|https://github.com/jjuhee|https://developer.happymunzi.com|
|진민용|팀원|로그인&메인 페이지, 검색 페이지, 헤더 레이아웃|ENFJ|https://github.com/boyaneck|https://velog.io/@boyaneck/posts|
|정효창|팀원|마이 페이지|E같은 ISFP|https://github.com/HyoChang5147|https://velog.io/@jhc729/posts|
|강지향|팀원|상세 페이지|ISFJ|https://github.com/KANG0417|https://velog.io/@kanjang96/posts|
|이승연|디자이너|전체 페이지 UI/UX 디자인|ISFJ|||

## 깃허브 조회 수
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fjjuhee%2Fnbcamp_final.git&count_bg=%23000000&title_bg=%23555555&icon=next-dot-js.svg&icon_color=%2360ECA5&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)


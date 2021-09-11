# MyiApp-FrontEnd
명지대학교 Myiweb의 일부 기능을 제공하는 WebView를 활용한 App.

---

[MYIAPP-2] 로그인 진행 후 발급받은 키를 통해 기본정보 출력하기.

**App.tsx**: Default Page  
**pages/login**: 학번, 비번을 입력 받는 페이지, App.tsx에서 학번, 비번 각Set을 모두 props로 받아서 사용
**pages/main.tsx**: 로그인 성공 후, 크롤링을 통해 얻게 된 데이터를 랜더링 하는 메인 페이지    
**crawling/main.ts**: 발급받은 키를 통해 성적조회 페이지를 크롤링 하는 역할 (crawling 디렉토리에 tsconfig.json 넣어야 함, ts는 "module": "CommonJS" 리액트 ts는 "module": "esnext"라서)  
  
흐름  
onLoginClick(Login 페이지에서) -> 키 발급 -> getMain -> getMainData(main.ts) -> 성적 조회 페이지 html 받아서 크롤링 진행 후 데이터 반환 -> isLogin: true, basicData 받은 값으로 변경 -> main.tsx 렌더

---

[MYIAPP-4] 메인 페이지 ant design 사용하여 구색 갖추기

---

[MYIAPP-5] 교내일정 크롤링 하여 메인 페이지에 제공하기 

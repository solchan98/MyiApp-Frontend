# MyiApp-FrontEnd

명지대학교 Myiweb의 일부 기능을 제공하는 Web(ToyProject)

09/21 현재  
- favicon 없음  

---

[MYIAPP-13]O 전체적인 컴포넌트 수정 및 설정 수정

09/17 03:00
전체적인 컴포넌트 수정 및 로그인 input, button 수정

09/17 18:50
자유학점 추가

09/17 19:50

09/19 17:40
Axios http -> https

---

[MYIAPP-12]O 학기 성적 데이터 제공하기

09/16 16:05  
(안전교육 이수) 학기 성적 크롤링 완료
```js
[
  [ '0803', '알고리즘', '3', '', '비공개', '미입력' ],
  [ '0806', '시스템프로그래밍', '3', '', '비공개', '미입력' ],
  [ '0810', '데이터베이스설계', '3', '', '비공개', '미입력' ],
  [ '0813', '인공지능', '3', '', '비공개', '미입력' ],
  [ '0818', '모바일프로그래밍', '3', '', '비공개', '미입력' ],
  [ '0819', '컴퓨터 보안', '3', '', '비공개', '미입력' ],
  [ '0823', '클라우드컴퓨팅', '3', '', '비공개', '미입력' ]
]
```
09/16 18:40
(안전교육 미이수) -> 배열의 크기가 5 이하일 경우 해당.
수강 성적 데이터 각 경우(안전교육 미이수, 비공개, 미입력)의 따라 데이터 제공 및 컴포넌트 구현 완료.


---

[MYIAPP-11]O 졸업학점 데이터 제공하기

09/16 03:30  
졸업학점 페이지 데이터 크롤링 구현
09/16 05:35  
학점 데이터 랜더 컴포넌트 구현

---

[MYIAPP-9]ing 서버에서 로그인 에러 응답에 대한 정상 응답 오류 수정

09/13 08:30
현재 서버에서 로그인 에러에 대한 응답이 2xx의 정상으로 응답되어, 임시로 응답 메세지로 에러 처리.

---

[MYIAPP-2]O 로그인 진행 후 발급받은 키를 통해 기본정보 출력하기.

**App.tsx**: Default Page  
**pages/login**: 학번, 비번을 입력 받는 페이지, App.tsx에서 학번, 비번 각Set을 모두 props로 받아서 사용
**pages/main.tsx**: 로그인 성공 후, 크롤링을 통해 얻게 된 데이터를 랜더링 하는 메인 페이지    
**crawling/main.ts**: 발급받은 키를 통해 성적조회 페이지를 크롤링 하는 역할 (crawling 디렉토리에 tsconfig.json 넣어야 함, ts는 "module": "CommonJS" 리액트 ts는 "module": "esnext"라서)  
  
흐름  
onLoginClick(Login 페이지에서) -> 키 발급 -> getMain -> getMainData(main.ts) -> 성적 조회 페이지 html 받아서 크롤링 진행 후 데이터 반환 -> isLogin: true, basicData 받은 값으로 변경 -> main.tsx 렌더

---

[MYIAPP-4]O 메인 페이지 ant design 사용하여 구색 갖추기

---

[MYIAPP-5]O 교내일정 크롤링 하여 메인 페이지에 제공하기 

---

[MYIAPP-6]O 아이디, 비밀번호 Crypto 양방향 암호화 진행 후 쿠키를 통해 기억하기

---

[MYIAPP-7]O 상단 NavBar 아래에 Grid(Menu), 각 Menu 선택에 따라 해당 컴포넌트 랜더하기

---

[MYIAPP-8]O 통합성적 데이터 제공하기

App.tsx를 메인으로 단일 페이지에 여러 컴포넌트로 구성하였다.
App하위로 Main, TotalScore, SemesterScore, Schedule(시간표), Graduration의 컴포넌트가 존재한다.
현재 Main은 1차 완성하였고, TotalScore 1차 완성이 이번 MYIAPP-8의 EndPoint이다.

09/13 17:00
TotalScore 데이터 크롤링 .ts 파일 작성 완료.
TotalScore 랜더하는 total.score.tsx 컴포넌트 일부, 년도와 학기별 Modal 방식으로 입력받기 구현 완료.

09/13 17:35
ToTalScore 데이터 ListView를 통해 년도 학기별 랜더 완료.

09/14 01:10
통합 성적 컴포넌트 년도 선택 유무에 따라 리스트뷰 랜더, 년도 학기 설정 메세지 위치 수정

---

[MYIAPP-10]O 시간표 데이터 제공하기

09/14 15:20
시간표 HTML응답받아 데이터 크롤링 완료.

09/14 22:30
시간표 요일 두 개로 나눠지는 시간을 한 객체 데이터로 수정.

09/15 00:40
시간표 컴포넌트 구현 완료.



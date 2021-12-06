> +09/21 서비스: ~~https://myiapp.shop~~  
> MYIAPP Backend Ropository: https://github.com/solchan98/MyiApp-BackEnd

명지대학교 학사정보시스템인 myiweb은 반응형을 지원하지 않는다. 
추가로 자주 가는 메뉴는 정해져 있지만, 그 메뉴를 가기까지 귀찮은 과정이 진행된다.
**그래서 자주 가는 메뉴를 보기쉽게, 반응형으로 모바일로도 편하게 정보를 얻을 수 있도록** 토이프로젝트를 진행하였다.

이름이 MYIAPP인 이유는 처음에는 RN을 통해 APP으로 만들려 했으나..
- 크롤링기능을 포함한 어플은 앱스토어 출시가 힘들다는 점.. 
- 출시 비용이 애플은 감당하기 힘들다는 점..

> 필요한 기능만 **빠르게!, 모바일에서 편하게!** 볼 수 있도록 직접 만들어보자!🤨

제공되는 모든 기능은 Myiweb의 정보를 크롤링하여 제공하는 방식으로 진행된다.

- 메인메뉴(나의 기본 정보 + 학사 일정)
- 학기 성적
- 통합 성적(학기별 성적)
- 시간표
- 졸업학점

서비스는 백엔드와 프론트 모두 구성되었다.
**백엔드는 NestJS(TypeScript) 프론트는 React(TypeScript)** 를 사용하였다.

참고로 본인은 프론트를 전문적으로 배우지 않아서 디자인 적인 부분은 매우 매우 심플하게 구성하였다.
페이지도 단일 페이지의 여러 컴포넌트를 스위칭해주는 방식으로 매우 매우 심플하게 구성하였다.

프로젝트를 진행하기에 앞서 몇 가지 기준을 정하고 시작하였다.

- 모바일 환경에서 접근하는 것을 기준으로 진행한다.
- 사용자의 정보를 서버에 절대 저장하지 않는다.
- 로그인 후 키 발급은 명지대학교 인증 시스템이기 때문에, 로그인 유지는 불가능하다. (다른 곳에서 로그인 하는 경우, 발급받은 키가 무효해진다.) 
- 따라서, 이를 방지하기 위해 모든 요청시마다 로그인을 통한 키 발급 과정이 포함된다.(성능이슈를 생각할 수 있으나, 대부분 2초 이내에 처리된다.)


## 로그인
![](https://images.velog.io/images/solchan/post/dc19d9e0-b44b-4970-bf57-65e313cf81c6/%E1%84%85%E1%85%A9%E1%84%80%E1%85%B3%E1%84%8B%E1%85%B5%E1%86%AB.png)

로그인 화면의 구성은 매우 간단하다.
서버에 절대 사용자 정보를 저장하지 않는다는 알림 문구와 로그인을 위한 입력창, 그리고 아이디 비밀번호 기억하기 및 로그인 버튼으로 구성되었다.

### 로그인 기억하기

이 부분은 좀 고민을 하였다.
현재 정한 방식은 로그인 버튼 클릭 시, 쿠키를 저장하는 방식이다.
하지만 쿠키에 아이디, 비밀번호를 그대로 저장하면 노출의 위험이 존재하기 때문에 **crypto-js 라이브러리를 통해 양방향 암호화**를 진행하였다. 

![](https://images.velog.io/images/solchan/post/0d944b32-18c6-44bc-81eb-2346e2f1ebe8/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-17%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%206.07.54.png)
다음과 같이 쿠키에 암호화된 값으로 들어간다.
이후 페이지에 접속했을 때, 쿠키가 존재하면 암호화된 쿠키 값을 복호화하여 Id, Password 입력창에 넣어주는 방식으로 진행된다.

로그인 기억하기 체크해제를 하는 순간, Id, Password 쿠키가 삭제된다.

## 메인화면

![](https://images.velog.io/images/solchan/post/8b72731a-868a-4e60-92fc-cef676960260/%E1%84%86%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB.png)
메인화면에는 나의 정보와 학사일정을 보여준다.
사진에서는 나의 정보를 일부 수정하여 스크린샷을 찍었다.
나의 정보는 소중하니까..?🤫
### 나의 정보
메인화면에 어떤 정보로 구성을 해야할지 고민을 했지만, 메인화면에 성적이나 졸업 학점 등의 정보를 제공하기에는 맞지 않는 것 같아서 기본적인 사용자의 정보를 제공하기로 결정하였다.

그래서 다음의 정보를 제공한다.

- 이름
- 학번
- 학년
- 학과
- 이수학기
- 학적상태
- 이수학점
- 평균 평점


### 학사 일정
사실 이 부분은 특별히 학사 일정을 넣으려고 했던 것은 아니었다.
나의 정보를 넣고 화면을 보니, 아래 부분이 매우 비어있었고 때울만 한? 
무언가를 찾다가 가장 만만한 학사 일정을 넣기로 결정하였다.

학사 일정도 당연히 학교 홈페이지의 정보를 크롤링하여 제공하는 것이며, 매 번 접속할 때 마다 크롤링을 진행하기 때문에 학교 홈페이지의 업데이트 상태와 거의 동기화된다고 볼 수 있다.

## 학기 성적

학기 성적 카테고리는 사실, 시즌이 되면 아마 많은 학생들이 제일 많이 접속하는 카테로리라고 생각한다.
사실 이것 때문에 이 토이 프로젝트를 계획한 이유이기도 하다.

제공 방식은 매우 심플하다.
과목이름과 학점, 그리고 과목번호를 왼편에 제공하고, 오른쪽에는 성적을 보여준다.


그리고, 학사 성적은 **(공대 +안전교육 미이수자), 성적 미입력, 성적 비공개** 이 모든게 다 활성화되어야 성적이 올라온다. 즉, (공대 +안전교육도 들어야 하고), 교수님이 성적을 입력해야하며 공개를 하셔야 최종적으로 성적이 보인다.

### 안전교육 미이수
연구실 안전교육을 이수하지 않으면, 성적을 보여주는 **가장 오른쪽에 연구실 교육 미이수**라고 보여준다.
![](https://images.velog.io/images/solchan/post/808a54bd-0684-4c7f-8318-70b560e3ca9d/%E1%84%92%E1%85%A1%E1%86%A8%E1%84%80%E1%85%B5%E1%84%89%E1%85%A5%E1%86%BC%E1%84%8C%E1%85%A5%E1%86%A8(%E1%84%8B%E1%85%A1%E1%86%AB%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%80%E1%85%AD%E1%84%8B%E1%85%B2%E1%86%A8%20%E1%84%86%E1%85%B5%E1%84%8B%E1%85%B5%E1%84%89%E1%85%AE).png)

### 안전교육 이수
공대가 아니거나 안전교육을 이수하였으면, 다음 처럼 교수님의 성적 공개 여부와 입력 여부를 알려준다.

여기서 **성적 공개여부가 공개, 입력 상태면 성적이 보여진다**.
![](https://images.velog.io/images/solchan/post/ff579de6-0d3c-4f64-8a10-c8e842e40fdc/%E1%84%92%E1%85%A1%E1%86%A8%E1%84%80%E1%85%B5%E1%84%89%E1%85%A5%E1%86%BC%E1%84%8C%E1%85%A5%E1%86%A8(%E1%84%8B%E1%85%A1%E1%86%AB%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%80%E1%85%AD%E1%84%8B%E1%85%B2%E1%86%A8%20%E1%84%8B%E1%85%B5%E1%84%89%E1%85%AE).png)

## 통합 성적
통합 성적 카테고리는 지금까지 이수한 학기별로 나의 성적을 확인할 수 있다.

다음처럼, 년도 학기 선택을 누르면 내가 이수한 학기와 현재 학기가 리스트로 보여진다.
당연히 현재 학기는 성적이 없기 때문에 누르면 뭐가 나올까? 안나온다.

![](https://images.velog.io/images/solchan/post/7b4159d9-7947-488b-9a58-0138fc33524c/%E1%84%90%E1%85%A9%E1%86%BC%E1%84%92%E1%85%A1%E1%86%B8%E1%84%89%E1%85%A5%E1%86%BC%E1%84%8C%E1%85%A5%E1%86%A81.png)

성적이 보고싶은 학기를 선택하면, 다음과 같이 성적이 리스트로 보여진다.

순서대로,
- 성적
- 학점
- 교양, 전공
- 한글코드
- 영문코드
이다.

현재는 데이터만 심플하게 제공되나, 좀 더 이쁘게? 만들 의향은 조금 있다.
![](https://images.velog.io/images/solchan/post/2f0451da-9c40-4684-8926-c04852c4206f/%E1%84%90%E1%85%A9%E1%86%BC%E1%84%92%E1%85%A1%E1%86%B8%E1%84%89%E1%85%A5%E1%86%BC%E1%84%8C%E1%85%A5%E1%86%A82.png)

## 시간표
시간표 카테고리는 다들 에브리타임을 사용하기 때문에 자주 사용될 것 이라고 생각하지는 않는다.

그래서 시간표의 의미보다는, 내가 수강신청한 과목의 리스트를 보고싶거나 혹은 이 서비스를 이용하자 중간에 강의실, 시간 등을 알고싶을 수 있기 때문에 추가하였다.
스크롤을 통해 리스트로 제공된다.

사실, 이 기능을 위해 크롤링 코드를 작성하는게 제일 별루긴 했다.. 힘들었어..😮‍💨

![](https://images.velog.io/images/solchan/post/9ffbd565-03b5-46f8-9783-3e34a65a2d1b/%E1%84%89%E1%85%B5%E1%84%80%E1%85%A1%E1%86%AB%E1%84%91%E1%85%AD.png)

## 졸업학점
마지막으로 졸업학점 기능이다.
아마 성적조회와 비슷하게 자주 사용되는 카테고리라 생각하여 기능으로 추가하였다.

학교 마이아이웹을 보면 졸업학점조회와 이수교과목조회 두 카테고리를 통해 나의 수강학점 상태를 조회할 수 있다.

하지만, 생각보다 한눈에 들어오지 않아서 자유학점의 개념만 알고 있으면 바로 이해할 수 있도록 구성하였다.

![](https://images.velog.io/images/solchan/post/844a3f9a-a35a-4dd6-9ab9-926906216b92/%E1%84%8C%E1%85%A9%E1%86%AF%E1%84%8B%E1%85%A5%E1%86%B8%E1%84%92%E1%85%A1%E1%86%A8%E1%84%8C%E1%85%A5%E1%86%B7.png)

채플은 이수회수를 보여주도록 하였다.
위에서부터 **자유선택을 제외한**, 내가 이수한 학점을 모두 더하면 졸업 부분의 나의 이수 학점과 같은 것을 알 수 있다.
**즉, 졸업 부분에서 이수부분은 자유선택을 제외한 모든 이수 학점의 합이고 졸업기준 부분은 자유선택 포함 모든 졸업기준 학점의 합이다.**

이렇게 현재 제공하는 기능에 대한 설명을 마친다!

---

## 진행하면서 발견한 이슈
작년 TimeTree라는 LMS에 대한 서비스를 제공하는 웹 서비스를 알게되었는데 이 개발자가 명지대학교 로그인에 대한 큰 이슈를 발견했다. [학번만으로 조회되는 문제](https://timte.tistory.com/15)

해당 부분은 학교측에서 조치하였다는 응답을 받았지만, ~~아직까지도 학번만으로 조회가 가능하다고 한다..~~  

나 또한 마이아이웹에 대해 비슷한 취약점을 발견하여 학교에 보고하였지만, 연락처를 받아간 것 말고는 아직까지도 연락이 없다..

이에 대한 방안으로는 TimeTree의 서비스에서 적용한 방안 그대로 키 발급을 위한 로그인 전에 학번과 비밀번호로 인증을 하는 과정을 앞단에 두어 인증 실패시 더 이상의 과정이 진행되지 않도록 작성하였다.

취약점에 대한 부분은 학교와 연락이 된 후, 조취가 제대로 취해지면 그때 공개할 예정이고, 나머지 소소코드는 Github에 public으로 공개할 예정이다.

---
회고아닌 회고..
프론트는 리액트로 개발하였지만, 정말 나는 웹 프론트와는 맞지 않는다는 것을 또 느꼈다..
난 섬세하지 못해..
대신 응답받은 HTML을 크롤링하기 위해 문자열을 다루는 여러가지 방법을 얻은 것 같아 다행이다.

백엔드는 사실 큰 개발요소가 없었다. 
키 발급을 위한 명지대학교 서버와 통신 그리고 마이아이웹 HTML을 받아와 프론트에 전달해주는 역활 뿐이다.
만약 서비스가 확대된다면, 강의 시간표 등의 공동 데이터가 필요할 수 있어서 이에 대한 진행은 백엔드에서 집중적으로 진행되지 않을까 생각하고있다.

---
# +09/21추가(반응 및 나의 의견)
ssl인증과정까지 진행하여 https까지 마무리 하였지만 지속적인 관리가 힘들 것으로 생각되어 개인적으로 사용하기로 결정하였다 ㅠㅠ

아래는 에브리타임에서 서비스 소개 및 반응이다.
<!-- ![](https://images.velog.io/images/solchan/post/db2dc8f4-8d6c-41ca-a7ee-6a5f13f58fae/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-21%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%205.35.40.png) -->
![image](https://user-images.githubusercontent.com/64524916/135065399-c05ea734-c5c2-4b80-97e9-08a67735bddd.png)
![](https://images.velog.io/images/solchan/post/29b9788b-c5fb-496d-9cde-ca361cf08f38/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-21%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%205.35.56.png)
![](https://images.velog.io/images/solchan/post/6ff29013-b35c-443d-8a5a-e23e709287de/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-21%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%205.36.12.png)

생각보다 반응이 좋았고, 당시 이 게시글의 조회수가 500이상 정도로 확인되어 사용자 또한 많을 것으로 예상했다. 
현재는 서비스 배포 단계도 마무리한 상태이다.
하지만,
- 지속적인 관리에 대한 확신을 줄 수 없는 점(서버 비용 및 지속적인 업데이트)
- 현재 시간표 조회시 수강철회와 폐강과목에 대한 정보가 같이 포함되는 점
	- 이 부분은 철회, 폐강에 대한 html예시를 확인하면 처리 가능 	

위 사항 포함 지속적인 관리와 피드백에 대한 응답에 확신을 주기 어려워 서비스 주소는 공개하지만 공식적인 서비스는 하지 않기로 하였다.

> 서비스 ~~https://myiapp.shop~~

---
# Link
- [Blog](https://solchan98.tistory.com/17)
- [MYIAPP Backend Ropository](https://github.com/solchan98/MyiApp-BackEnd)

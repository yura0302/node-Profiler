## Node **Profiler** Visualization과제

![스크린샷 2024-06-10 오전 2 02 40](https://github.com/yura0302/node-Profiler/assets/97827316/45ff46fe-179c-4218-826b-c18e5a083bb7)
![스크린샷 2024-06-10 오전 2 02 51](https://github.com/yura0302/node-Profiler/assets/97827316/67228dd8-8f9a-4595-9b93-6d6d3c4c7821)
![스크린샷 2024-06-10 오전 2 03 06](https://github.com/yura0302/node-Profiler/assets/97827316/b536a6d0-c4e6-4e8c-940c-3d8132e70f32)

웹응용기술 과제 입니다.

### commit message

```markdown
# feat : 기능 (새로운 기능)

# fix : 버그 (버그 수정)

# refactor: 리팩토링

# style : 스타일 (코드 형식, 세미콜론 추가: 비즈니스 로직에 변경 없음)

# docs : 문서 (문서 추가, 수정, 삭제)

# test : 테스트 (테스트 코드 추가, 수정, 삭제: 비즈니스 로직에 변경 없음)

# chore : 기타 변경사항, 셋팅 관련 (빌드 스크립트 수정 등)

# design : css 등 ui 수정

# hotfix : 급한 버그 수정
```

## 실행방법

### 개발 환경 실행

```c
node app.js
```

위 명령어 터미널에서 실행 후 http://localhost:3000 으로 접속

## 디렉토리 구조

```markdown
node-Profiler
├─ .git─ .gitignore
├─ README.md
├─ app.js
├─ package-lock.json
├─ package.json
├─ public
│ ├─ index.html
│ ├─ script.js
│ └─ style.css
└─ uploads
```

## 구현내용

### 핵심 기능

### Chart.js 라이브러리를 사용

HTML파일은 웹 페이지 구조를 정의하고 `index.html`에서는 `Chart.js` 라이브러리를 사용하여 차트를 시각화하고, 사용자로부터 파일을 업로드 받기 위한 폼을 제공합니다. (현재 프로젝트에서는 **막대 그래프, 꺾은선 그래프, 산점도를 지원**합니다.)

### 파일 업로드와 차트 렌더링

`fetch API로 파일 업로드와 서버와의 통신`을 위해 사용하였고, 데이터에 서버를 전송, 응답받아 차트를 렌더링합니다.

`FormData API`를 파일 업로드를 위해 사용하였고, 사용자가 선택한 파일을 서버로 전송할 수 있도록 도와줍니다. 또한 `Event Listener`로 파일 업로드 폼과 차트 유형 선택에 대한 이벤트를 처리합니다. 이를 통해 사용자 입력에 따라 동작하게 됩니다.

### DB 연결

`Express.js`를 사용하여 `Multer`, `CSV 파서`를 사용하여 파일을 처리하고, 데이터를 Mysql DB에 저장합니다.

다양한 HTTP 요청을 처리하기 위해 Express.js를 사용하였고, 파일 업로드를 위해 Multer를 사용하여 업로드된 파일을 서버의 임시 디렉토리에 저장합니다.

`Mysql`은 데이터를 저장하고 쿼리를 다루기 위해 사용했습니다. 그리고 파일 시스템으로 fs 모듈을 사용하여 파일을 읽고 삭제하여 upload 폴더에 쌓이지 않게 하여 그래프가 변형되지 않게 하였습니다. 업로드된 파일을 처리한 후 삭제하여 서버의 저장공간을 관리하는 기능을 합니다.

# Vite + React + TS Boilerplate

| 리엑트 프로젝트 보일러플레이트 코드입니다.

## Package

- React 18
- react router dom v6 / [Link](https://reactrouter.com/6.29.0/start/overview)
- typescript
- emotion
- eslint + prettier
- husky + lint-staged
- tanstack-query 5.65.1 / [Link](https://tanstack.com/query/v5/docs/framework/react/quick-start)
- zustand
- storybook
- vitest + react-testing

## 프로젝트 폴더 구조

```
📦 vite-react-ts
├── src/
│   ├── assets/              # 이미지, 폰트, 아이콘 등 정적 파일
│   ├── components/          # UI 컴포넌트
│   │   ├── common/          # 공통으로 사용하는 기본 UI 컴포넌트
│   │   └── layout/          # 레이아웃을 가지는 UI 컴포넌트
│   ├── hooks/               # 공통으로 사용되는 커스텀 훅
│   ├── pages/               # 각 페이지 단위의 컴포넌트
│   │   └─ [Page]/           # 공통으로 사용하는 기본 UI 컴포넌트
│   │      ├── components/   # 해당 도메인 페이지에서만 사용하는 UI 컴포넌트
│   │      └── hooks/        # 해당 도메인 페이지에서만 사용하는 커스텀 훅
│   ├── router/              # 라우터 컴포넌트 정의 (react-router-dom)
│   ├── stores/              # 상태 관리 (zustand)
│   ├── styles/              # 글로벌 스타일 및 테마 설정 (reset, global, theme)
│   ├── types/               # 타입 정의
│   ├── utils/               # 유틸리티 함수들
│   ├── App.tsx              # 최상위 컴포넌트
│   └── main.tsx             # 애플리케이션의 진입점
├── public/
├── index.html               # HTML 템플릿
├── .eslintrc.cjs            # ESLint 설정
├── .prettierrc              # Prettier 설정
├── package.json             # 프로젝트 의존성 및 스크립트
├── tsconfig.json            # TypeScript 설정 파일
├── vite.config.ts           # Vite 설정 파일
└── README.md                # 프로젝트 설명서
```

## 개발 및 실행 방법

```
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 코드 포맷팅
npm run lint
- husky로 commit시 lint 동작
```

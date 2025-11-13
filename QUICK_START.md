# 빠른 시작 가이드

환경 변수 설정을 빠르게 시작하는 가이드입니다.

## 1단계: .env.local 파일 생성

### Windows

```cmd
copy env.template .env.local
```

### Mac/Linux

```bash
cp env.template .env.local
```

## 2단계: 환경 변수 입력

`.env.local` 파일을 열고 다음 정보를 입력하세요:

### 필수 항목

1. **Google Sheets 설정**

   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`: 서비스 계정 이메일
   - `GOOGLE_PRIVATE_KEY`: JSON 키 파일의 private_key (큰따옴표 포함)
   - `GOOGLE_SPREADSHEET_ID`: 스프레드시트 ID

2. **Clerk 설정**
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk 공개 키
   - `CLERK_SECRET_KEY`: Clerk 비밀 키

### 선택 항목

- 결제 API 키 (나중에 설정 가능)
- Google Maps API 키 (지도 기능 사용 시)

## 상세 가이드

- **환경 변수 설정**: `docs/ENV_SETUP_GUIDE.md`
- **Google Sheets 설정**: `scripts/01-create-google-sheets.md`
- **Clerk 설정**: `docs/SETUP_GUIDE.md`

## 다음 단계

환경 변수 설정이 완료되면:

1. 개발 서버 재시작: `pnpm run dev`
2. Google Spreadsheet 설정 진행
3. 테스트 시작

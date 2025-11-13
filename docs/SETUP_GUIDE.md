# 프로젝트 설정 가이드

이 가이드는 프로젝트를 처음 시작할 때 필요한 설정을 단계별로 안내합니다.

## 📋 사전 준비사항

1. **Node.js 설치 확인**
   ```bash
   node --version  # v18 이상 권장
   ```

2. **pnpm 설치 확인**
   ```bash
   pnpm --version
   ```
   설치되어 있지 않다면:
   ```bash
   npm install -g pnpm
   ```

---

## 1단계: 필요한 패키지 설치

프로젝트 루트 디렉토리에서 다음 명령어를 실행하세요:

```bash
pnpm add googleapis @clerk/nextjs
```

이 명령어는 다음 패키지를 설치합니다:
- `googleapis`: Google Sheets API 클라이언트
- `@clerk/nextjs`: Clerk 인증 라이브러리

---

## 2단계: Google Spreadsheet 설정

### 2.1 Google Spreadsheet 생성

자세한 내용은 `scripts/01-create-google-sheets.md` 파일을 참고하세요.

**간단 요약:**
1. [Google Sheets](https://sheets.google.com)에서 새 스프레드시트 생성
2. 스프레드시트 ID 확인 (URL에서 `/d/`와 `/edit` 사이)
3. 다음 시트 생성:
   - Packages
   - Bookings
   - Guests
   - Rooms
   - Payments
   - Itineraries (선택사항)

### 2.2 Google Cloud 프로젝트 설정

1. [Google Cloud Console](https://console.cloud.google.com) 접속
2. 새 프로젝트 생성
3. Google Sheets API 활성화
4. 서비스 계정 생성 및 키(JSON) 다운로드
5. 스프레드시트에 서비스 계정 이메일 공유 (편집자 권한)

자세한 내용은 `scripts/01-create-google-sheets.md`를 참고하세요.

---

## 3단계: Clerk 프로젝트 생성

### 3.1 Clerk 계정 생성

1. [Clerk](https://clerk.com)에 접속
2. "Get Started" 클릭
3. GitHub 계정으로 로그인 (또는 이메일로 가입)

### 3.2 새 애플리케이션 생성

1. "Create Application" 클릭
2. 애플리케이션 정보 입력:
   - **Name**: `Taiwan Mintour` (원하는 이름)
   - **Authentication**: Email, Password 선택 (또는 소셜 로그인 추가)
3. "Create Application" 클릭

### 3.3 API 키 확인

1. 대시보드에서 **API Keys** 메뉴 클릭
2. 다음 정보를 복사해두세요:
   - **Publishable key** → `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - **Secret key** → `CLERK_SECRET_KEY` (⚠️ 비밀!)

### 3.4 인증 설정 (선택사항)

1. **User & Authentication** → **Email, Phone, Username** 메뉴에서
2. 원하는 인증 방법 선택:
   - Email (기본)
   - Password (기본)
   - 소셜 로그인 (Google, GitHub 등)

---

## 4단계: 환경 변수 파일 생성

### 4.1 .env.local 파일 생성

프로젝트 루트 디렉토리에 `.env.local` 파일을 생성하세요.

### 4.2 환경 변수 입력

`ENV_EXAMPLE.md` 파일을 참고하여 실제 값으로 채워넣으세요:

```env
# Google Sheets 설정
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SPREADSHEET_ID=your_spreadsheet_id_here

# Clerk 인증 설정
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key
CLERK_SECRET_KEY=sk_test_your_key

# 기타 설정
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**중요:**
- `GOOGLE_PRIVATE_KEY`는 JSON 키 파일의 `private_key` 값을 그대로 복사하세요
- 줄바꿈 문자(`\n`)가 포함되어 있어야 합니다
- 큰따옴표로 감싸야 합니다

### 4.3 파일 저장

`.env.local` 파일을 저장하세요. 이 파일은 Git에 커밋되지 않습니다 (`.gitignore`에 포함됨).

---

## 5단계: Google Spreadsheet 초기 데이터 입력

### 5.1 Packages 시트에 데이터 입력

1. Google Spreadsheet에서 "Packages" 시트 열기
2. 두 번째 행에 다음 데이터 입력:

| id | name | description | duration_days | departure_date | return_date | base_price | single_room_price | max_guests | current_guests | status | created_at | updated_at |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 글로벌트리브 로타리 세계대회 특별 투어 | 세계 4대 박물관과 타이베이의 정취를 느끼는 특별한 여행 | 4 | 2026-06-13 | 2026-06-16 | 1290000 | 330000 | 150 | 0 | active | 2025-01-01T00:00:00Z | 2025-01-01T00:00:00Z |

### 5.2 헤더 행 확인

모든 시트의 첫 번째 행에 헤더가 올바르게 입력되어 있는지 확인하세요.

---

## 6단계: 개발 서버 실행

### 6.1 의존성 설치 (처음 한 번만)

```bash
pnpm install
```

### 6.2 개발 서버 시작

```bash
pnpm run dev
```

### 6.3 브라우저에서 확인

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

---

## ✅ 설정 완료 체크리스트

- [ ] Google Spreadsheet 생성 완료
- [ ] 스프레드시트 ID 확인 및 `.env.local`에 입력
- [ ] 모든 시트 생성 완료 (Packages, Bookings, Guests, Rooms, Payments)
- [ ] 각 시트에 헤더 행 입력 완료
- [ ] Google Cloud 프로젝트 생성 완료
- [ ] Google Sheets API 활성화 완료
- [ ] 서비스 계정 생성 및 키(JSON) 다운로드 완료
- [ ] 스프레드시트에 서비스 계정 공유 완료 (편집자 권한)
- [ ] `.env.local` 파일에 Google Sheets 환경 변수 입력 완료
- [ ] Clerk 프로젝트 생성 완료
- [ ] Clerk API 키 확인 및 `.env.local`에 입력
- [ ] 개발 서버 실행 성공
- [ ] 브라우저에서 사이트 접속 확인

---

## 🚨 문제 해결

### 환경 변수를 찾을 수 없다는 에러

- `.env.local` 파일이 프로젝트 루트에 있는지 확인
- 파일 이름이 정확한지 확인 (`.env.local` - 점으로 시작)
- 개발 서버를 재시작해보세요 (`Ctrl+C`로 중지 후 다시 `pnpm run dev`)

### Google Sheets 연결 실패

- Google Cloud 프로젝트가 활성화되어 있는지 확인
- Google Sheets API가 활성화되어 있는지 확인
- 서비스 계정 이메일이 스프레드시트에 공유되어 있는지 확인
- 스프레드시트 ID가 올바른지 확인
- `GOOGLE_PRIVATE_KEY`에 줄바꿈 문자(`\n`)가 포함되어 있는지 확인

### Clerk 인증 실패

- Clerk 프로젝트가 활성화되어 있는지 확인
- API 키가 올바른지 확인
- Clerk 대시보드에서 애플리케이션 설정 확인

---

## 다음 단계

설정이 완료되면 다음 작업을 진행하세요:

1. **패키지 데이터 입력** - Packages 시트에 여행 패키지 정보 입력
2. **데이터베이스 함수 테스트** - 예약 생성 테스트
3. **API 라우트 구현** - 실제 데이터 연동

자세한 내용은 `docs/IMPLEMENTATION_PLAN.md`를 참고하세요.

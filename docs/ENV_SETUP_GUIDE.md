# 환경 변수 설정 가이드

이 가이드는 프로젝트에 필요한 환경 변수를 설정하는 방법을 안내합니다.

## 📋 사전 준비사항

다음 정보를 준비해야 합니다:

1. **Google Sheets 설정 정보**
   - 서비스 계정 이메일
   - 서비스 계정 개인 키 (JSON 파일에서)
   - 스프레드시트 ID

2. **Clerk 설정 정보**
   - Publishable Key
   - Secret Key

---

## 1단계: .env.local 파일 생성

### 방법 1: 파일 복사 (권장)

1. 프로젝트 루트 디렉토리에서 `.env.local.example` 파일을 찾습니다
2. 이 파일을 복사하여 `.env.local`로 이름을 변경합니다
   - Windows: 파일 탐색기에서 복사 후 이름 변경
   - 또는 명령어: `copy .env.local.example .env.local`

### 방법 2: 새 파일 생성

1. 프로젝트 루트 디렉토리에 `.env.local` 파일을 새로 생성합니다
2. 아래 내용을 복사하여 붙여넣습니다

---

## 2단계: Google Sheets 환경 변수 설정

### 2.1 서비스 계정 이메일 확인

1. Google Cloud Console에서 서비스 계정을 생성했는지 확인
2. 다운로드한 JSON 키 파일을 엽니다
3. `client_email` 값을 복사합니다
   ```json
   {
     "client_email": "sheets-service-account@your-project.iam.gserviceaccount.com"
   }
   ```
4. `.env.local` 파일에서 `GOOGLE_SERVICE_ACCOUNT_EMAIL`에 붙여넣습니다

### 2.2 개인 키 설정

1. JSON 키 파일에서 `private_key` 값을 찾습니다
2. **전체 키를 그대로 복사**합니다 (줄바꿈 문자 포함)
   ```json
   {
     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
   }
   ```
3. `.env.local` 파일에서 `GOOGLE_PRIVATE_KEY`에 붙여넣습니다
4. **중요**: 큰따옴표(`"`)로 감싸야 합니다
   ```env
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```

### 2.3 스프레드시트 ID 확인

1. Google Spreadsheet를 엽니다
2. URL을 확인합니다
   ```
   https://docs.google.com/spreadsheets/d/1ABC123...XYZ789/edit
   ```
3. `/d/`와 `/edit` 사이의 긴 문자열을 복사합니다
   - 예: `1ABC123...XYZ789`
4. `.env.local` 파일에서 `GOOGLE_SPREADSHEET_ID`에 붙여넣습니다

**예시:**
```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=sheets-service-account@taiwan-mintour.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
GOOGLE_SPREADSHEET_ID=1ABC123XYZ789DEF456GHI012JKL345MNO678
```

---

## 3단계: Clerk 환경 변수 설정

### 3.1 Clerk 대시보드 접속

1. [Clerk 대시보드](https://dashboard.clerk.com)에 로그인
2. 프로젝트 선택

### 3.2 API 키 확인

1. 왼쪽 메뉴에서 **"API Keys"** 클릭
2. 다음 정보를 복사합니다:
   - **Publishable key** (pk_test_... 또는 pk_live_...)
   - **Secret key** (sk_test_... 또는 sk_live_...)

### 3.3 환경 변수에 입력

`.env.local` 파일에 다음을 입력합니다:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_51AbC123...
CLERK_SECRET_KEY=sk_test_51XyZ789...
```

**중요:**
- `NEXT_PUBLIC_` 접두사가 붙은 키는 브라우저에서도 사용됩니다
- Secret Key는 절대 공유하거나 GitHub에 올리지 마세요!

---

## 4단계: 선택사항 환경 변수

### 4.1 결제 API (나중에 설정 가능)

결제 기능을 구현할 때 설정합니다:

**Toss Payments 사용 시:**
```env
TOSS_PAYMENTS_CLIENT_KEY=your_toss_client_key
TOSS_PAYMENTS_SECRET_KEY=your_toss_secret_key
```

**Stripe 사용 시:**
```env
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
STRIPE_SECRET_KEY=sk_test_your_stripe_key
```

### 4.2 Google Maps API (선택사항)

지도 기능을 사용할 때 설정합니다:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

---

## 5단계: 파일 저장 및 확인

1. `.env.local` 파일을 저장합니다
2. 파일이 프로젝트 루트 디렉토리에 있는지 확인합니다
3. 파일 이름이 정확한지 확인합니다 (`.env.local` - 점으로 시작)

---

## ✅ 설정 완료 체크리스트

- [ ] `.env.local` 파일 생성 완료
- [ ] `GOOGLE_SERVICE_ACCOUNT_EMAIL` 입력 완료
- [ ] `GOOGLE_PRIVATE_KEY` 입력 완료 (큰따옴표 포함)
- [ ] `GOOGLE_SPREADSHEET_ID` 입력 완료
- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` 입력 완료
- [ ] `CLERK_SECRET_KEY` 입력 완료
- [ ] `NEXT_PUBLIC_APP_URL` 입력 완료

---

## 🚨 문제 해결

### 환경 변수를 찾을 수 없다는 에러

- `.env.local` 파일이 프로젝트 루트에 있는지 확인
- 파일 이름이 정확한지 확인 (`.env.local` - 점으로 시작)
- 개발 서버를 재시작해보세요 (`Ctrl+C`로 중지 후 다시 `pnpm run dev`)

### Google Sheets 연결 실패

- `GOOGLE_PRIVATE_KEY`에 큰따옴표가 있는지 확인
- 줄바꿈 문자(`\n`)가 포함되어 있는지 확인
- 스프레드시트에 서비스 계정이 공유되어 있는지 확인

### Clerk 인증 실패

- API 키가 올바른지 확인 (공백이나 줄바꿈이 없는지)
- `NEXT_PUBLIC_` 접두사가 올바른지 확인

---

## 📝 완성된 .env.local 파일 예시

```env
# Google Sheets 설정
GOOGLE_SERVICE_ACCOUNT_EMAIL=sheets-service-account@taiwan-mintour.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
GOOGLE_SPREADSHEET_ID=1ABC123XYZ789DEF456GHI012JKL345MNO678

# Clerk 인증 설정
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_51AbC123XyZ789...
CLERK_SECRET_KEY=sk_test_51XyZ789AbC123...

# 기타 설정
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 다음 단계

환경 변수 설정이 완료되면:

1. **개발 서버 재시작** - 환경 변수 변경사항 적용
2. **Google Spreadsheet 설정** - `scripts/01-create-google-sheets.md` 참고
3. **테스트** - 예약 생성 기능 테스트


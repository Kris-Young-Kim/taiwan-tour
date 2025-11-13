# 배포 및 CI/CD 가이드

## 배포 준비 사항

### 1. 환경 변수 확인

배포 전에 다음 환경 변수들이 모두 설정되어 있는지 확인하세요:

#### 필수 환경 변수
- `NEXT_PUBLIC_SITE_URL` - 프로덕션 사이트 URL (예: https://mintour.com)
- `GOOGLE_SERVICE_ACCOUNT_EMAIL` - Google 서비스 계정 이메일
- `GOOGLE_PRIVATE_KEY` - Google 서비스 계정 개인 키
- `GOOGLE_SPREADSHEET_ID` - Google Spreadsheet ID

#### 선택적 환경 변수 (Clerk 사용 시)
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk Publishable Key
- `CLERK_SECRET_KEY` - Clerk Secret Key

### 2. 빌드 테스트

로컬에서 빌드가 성공하는지 확인:

```bash
pnpm build
```

빌드가 성공하면 `.next` 폴더가 생성됩니다.

---

## Vercel 배포

### 방법 1: Vercel CLI 사용

1. Vercel CLI 설치:
```bash
npm i -g vercel
```

2. 로그인:
```bash
vercel login
```

3. 프로젝트 배포:
```bash
vercel
```

4. 프로덕션 배포:
```bash
vercel --prod
```

### 방법 2: Vercel 웹 대시보드 사용 (권장)

1. [Vercel](https://vercel.com)에 로그인
2. "Add New Project" 클릭
3. GitHub 저장소 연결
4. 프로젝트 설정:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (기본값)
   - **Build Command**: `pnpm build`
   - **Output Directory**: `.next` (자동 감지)
   - **Install Command**: `pnpm install`

5. 환경 변수 설정:
   - Settings → Environment Variables
   - 모든 환경 변수 추가 (아래 참고)

6. "Deploy" 클릭

### 환경 변수 설정

**중요**: Vercel 대시보드에서 다음 환경 변수를 **직접 설정**해야 합니다.

1. Vercel 프로젝트 → Settings → Environment Variables
2. 각 환경 변수를 추가:

#### 필수 환경 변수

```
NEXT_PUBLIC_SITE_URL
```
- **Value**: 프로덕션 사이트 URL
  - 예: `https://your-project.vercel.app` (Vercel 기본 도메인)
  - 또는: `https://mintour.com` (커스텀 도메인 사용 시)
- **Environment**: Production, Preview, Development 모두 선택

```
GOOGLE_SERVICE_ACCOUNT_EMAIL
```
- **Value**: Google 서비스 계정 이메일
- **Environment**: Production, Preview, Development 모두 선택

```
GOOGLE_PRIVATE_KEY
```
- **Value**: Google 서비스 계정 개인 키 (전체 키 포함)
  - `-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n` 형식
  - 여러 줄이므로 따옴표로 감싸고 `\n`을 포함해야 합니다
- **Environment**: Production, Preview, Development 모두 선택

```
GOOGLE_SPREADSHEET_ID
```
- **Value**: Google Spreadsheet ID
- **Environment**: Production, Preview, Development 모두 선택

#### 선택적 환경 변수 (Clerk 사용 시)

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
```
- **Value**: Clerk Publishable Key (예: `pk_test_...`)
- **Environment**: Production, Preview, Development 모두 선택

```
CLERK_SECRET_KEY
```
- **Value**: Clerk Secret Key (예: `sk_test_...`)
- **Environment**: Production, Preview, Development 모두 선택

**주의사항:**
- `GOOGLE_PRIVATE_KEY`는 여러 줄이므로 따옴표로 감싸고 `\n`을 포함해야 합니다
- 환경 변수 추가 후 **반드시 재배포**해야 적용됩니다
- `NEXT_PUBLIC_` 접두사가 붙은 변수는 클라이언트에서도 접근 가능합니다

---

## 도메인 연결

### Vercel에서 도메인 추가

1. Vercel 프로젝트 → Settings → Domains
2. "Add Domain" 클릭
3. 도메인 입력 (예: `mintour.com`)
4. DNS 설정 안내에 따라 DNS 레코드 추가:
   - A 레코드 또는 CNAME 레코드
   - Vercel이 제공하는 값 사용

### DNS 설정 예시

#### A 레코드 사용 시
```
Type: A
Name: @
Value: 76.76.21.21
```

#### CNAME 레코드 사용 시
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

### SSL 인증서

Vercel이 자동으로 SSL 인증서를 발급하고 관리합니다. 별도 설정 불필요.

---

## CI/CD 파이프라인

### GitHub Actions

프로젝트에 `.github/workflows/deploy.yml` 파일이 포함되어 있습니다.

이 워크플로우는:
- ✅ 코드 체크아웃
- ✅ 의존성 설치
- ✅ 린터 실행
- ✅ 빌드 테스트

### Vercel GitHub Integration (권장)

Vercel과 GitHub를 연결하면:
- ✅ 자동 배포 (main 브랜치 push 시)
- ✅ Preview 배포 (Pull Request 시)
- ✅ 자동 롤백 (배포 실패 시)

**설정 방법:**
1. Vercel 프로젝트 → Settings → Git
2. GitHub 저장소 연결
3. "Auto-deploy" 활성화

---

## 배포 후 확인 사항

### 1. 사이트 접속 확인
- [ ] 메인 페이지 로드 확인
- [ ] 모든 페이지 정상 작동 확인
- [ ] 이미지 및 스타일 정상 표시 확인

### 2. 기능 테스트
- [ ] Google Sheets 연결 테스트
- [ ] 예약 폼 작동 확인
- [ ] API 엔드포인트 테스트

### 3. 성능 확인
- [ ] Lighthouse 점수 확인
- [ ] Core Web Vitals 확인
- [ ] 페이지 로딩 속도 확인

### 4. SEO 확인
- [ ] 사이트맵 접근 가능 (`/sitemap.xml`)
- [ ] robots.txt 접근 가능 (`/robots.txt`)
- [ ] 메타 태그 확인 (브라우저 개발자 도구)

---

## 문제 해결

### 배포 오류 (DEPLOYMENT_NOT_FOUND)

**오류 메시지:**
```
404: NOT_FOUND
Code: DEPLOYMENT_NOT_FOUND
```

**해결 방법:**

1. **Vercel 대시보드에서 리전 설정 확인 및 변경** (가장 중요!)
   - Vercel 대시보드 → 프로젝트 → Settings → Functions
   - "Function Region" 또는 "Edge Network" 설정 확인
   - `icn1` (서울) 리전이 설정되어 있다면:
     - "Default Region"을 "Auto" 또는 다른 리전으로 변경
     - 또는 리전 설정을 완전히 제거하여 Vercel이 자동 선택하도록 설정
   - 변경 후 저장

2. **vercel.json 확인**
   - `vercel.json`에서 `regions` 설정이 있는지 확인
   - 잘못된 리전 코드(`icn1` 등)가 있다면 제거
   - Next.js는 Vercel이 자동으로 최적의 리전을 선택합니다

3. **배포 상태 확인**
   - Vercel 대시보드 → Deployments에서 배포 상태 확인
   - 배포가 실패했거나 삭제되었는지 확인
   - 실패한 배포가 있다면 삭제

4. **재배포**
   - Vercel 대시보드에서 "Redeploy" 클릭
   - 또는 GitHub에 push하여 자동 재배포 트리거
   - 새로운 배포가 성공적으로 완료되는지 확인

**참고:**
- `icn1` (서울) 리전은 일부 Vercel 플랜에서 사용 불가능할 수 있습니다
- 리전 설정을 제거하면 Vercel이 자동으로 최적의 리전을 선택합니다
- 대부분의 경우 자동 선택이 더 안정적입니다

### 빌드 실패

1. **환경 변수 누락**
   - Vercel 대시보드에서 모든 환경 변수 확인
   - `.env.local`과 동일한 변수들이 설정되어 있는지 확인

2. **의존성 문제**
   - `pnpm-lock.yaml` 파일이 최신인지 확인
   - 로컬에서 `pnpm install` 후 `pnpm build` 테스트

3. **TypeScript 오류**
   - `next.config.mjs`에서 `ignoreBuildErrors: true` 설정 확인
   - 로컬에서 타입 체크: `pnpm tsc --noEmit`

### 런타임 오류

1. **환경 변수 문제**
   - Vercel Functions 로그 확인
   - 환경 변수 값이 올바른지 확인

2. **Google Sheets 연결 실패**
   - 서비스 계정 키 형식 확인
   - Spreadsheet 공유 권한 확인

---

## 모니터링

### Vercel Analytics

이미 `@vercel/analytics`가 설치되어 있습니다. Vercel에 배포하면 자동으로 활성화됩니다.

### 로그 확인

Vercel 대시보드 → 프로젝트 → Functions 탭에서 API 로그 확인 가능

---

## 롤백

### Vercel에서 롤백

1. Vercel 대시보드 → Deployments
2. 이전 배포 버전 선택
3. "Promote to Production" 클릭

---

## 참고 자료

- [Vercel 공식 문서](https://vercel.com/docs)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)
- [GitHub Actions 문서](https://docs.github.com/en/actions)


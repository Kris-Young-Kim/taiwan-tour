# 민투어 - 대만 타이베이 특별 여행 웹사이트

로타리 세계대회 참석 및 대만 문화 체험 3박 4일 특별 투어 예약 웹사이트

## 🚀 빠른 시작

### 필수 요구사항

- Node.js 20 이상
- pnpm 8 이상

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build

# 프로덕션 실행
pnpm start
```

## 📋 프로젝트 구조

```
taiwan_mintour/
├── app/                    # Next.js App Router
│   ├── api/               # API 라우트
│   ├── booking/           # 예약 페이지
│   ├── itinerary/         # 상세 일정 페이지
│   └── admin/             # 관리자 대시보드
├── components/            # React 컴포넌트
│   ├── ui/               # 공통 UI 컴포넌트
│   ├── booking/          # 예약 관련 컴포넌트
│   └── itinerary/        # 일정 관련 컴포넌트
├── lib/                   # 유틸리티 및 라이브러리
│   ├── db.ts             # 데이터베이스 함수
│   └── google-sheets.ts  # Google Sheets API
├── docs/                  # 문서
└── scripts/               # 스크립트
```

## 🔧 환경 변수 설정

`.env.local` 파일을 생성하고 다음 변수들을 설정하세요:

```env
# 사이트 URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Google Sheets
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SPREADSHEET_ID=your-spreadsheet-id

# Clerk (선택사항)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

자세한 설정 방법은 `docs/SETUP_GUIDE.md`를 참고하세요.

## 📚 주요 기능

- ✅ 랜딩 페이지 (히어로, 가격, 일정 미리보기)
- ✅ 상세 일정 페이지 (타임라인 형식)
- ✅ 예약 시스템 (Google Sheets 연동)
- ✅ 관리자 대시보드
- ✅ SEO 최적화
- ✅ 반응형 디자인

## 🛠 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Animation**: Framer Motion
- **Database**: Google Sheets API
- **Authentication**: Clerk (선택사항)
- **Deployment**: Vercel

## 📖 문서

- [설정 가이드](docs/SETUP_GUIDE.md)
- [배포 가이드](docs/DEPLOYMENT_GUIDE.md)
- [SEO 가이드](docs/SEO_GUIDE.md)
- [테스트 가이드](docs/TESTING_GUIDE.md)
- [TODO 리스트](docs/TODO.md)

## 🚢 배포

Vercel에 배포하는 방법은 [배포 가이드](docs/DEPLOYMENT_GUIDE.md)를 참고하세요.

## 📝 라이선스

Private

## 👥 개발팀

민투어

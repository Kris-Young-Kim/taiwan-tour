# 다음 단계 가이드

현재까지 완료된 작업과 다음에 해야 할 작업을 정리한 문서입니다.

## ✅ 완료된 작업

### 1. 프로젝트 초기 설정
- [x] Next.js 프로젝트 초기화
- [x] 프로젝트 폴더 구조 생성
- [x] Tailwind CSS 설정
- [x] TypeScript 설정
- [x] 필요한 패키지 설치 (googleapis, @clerk/nextjs, framer-motion)

### 2. 환경 변수 설정
- [x] `.env.local` 파일 생성
- [x] Google Sheets 환경 변수 설정
- [x] Clerk 환경 변수 설정

### 3. 백엔드 연동
- [x] Google Sheets API 클라이언트 구현 (`lib/google-sheets.ts`)
- [x] 데이터베이스 함수 구현 (`lib/db.ts`)
- [x] API 라우트 실제 데이터베이스 연동
  - [x] 예약 생성/조회 API
  - [x] 예약 상세/수정/삭제 API
  - [x] 관리자 통계 API
  - [x] 관리자 예약 목록 API
  - [x] Google Sheets 연결 테스트 API

### 4. 인증 시스템
- [x] Clerk 미들웨어 설정
- [x] ClerkProvider 레이아웃 통합
- [x] Header에 인증 버튼 추가

---

## ⏳ 다음에 해야 할 작업

### 1. Google Spreadsheet 시트 설정 (우선순위: 최우선)

**해야 할 일:**
1. Google Spreadsheet에서 다음 시트 생성:
   - Packages
   - Bookings
   - Guests
   - Rooms
   - Payments
   - Itineraries (선택사항)

2. 각 시트에 헤더 행 입력
   - 가이드: `scripts/setup-sheets-headers.md` 참고

3. Packages 시트에 샘플 데이터 입력
   - 패키지 정보 입력

**상세 가이드:**
- `scripts/01-create-google-sheets.md` - Google Spreadsheet 전체 설정 가이드
- `scripts/setup-sheets-headers.md` - 시트 헤더 설정 가이드

### 2. Google Sheets 연결 테스트

**테스트 방법:**
1. 개발 서버 실행: `pnpm run dev`
2. 브라우저에서 다음 URL 접속:
   ```
   http://localhost:3000/api/test/google-sheets
   ```
3. 연결 성공 여부 확인

**예상 결과:**
```json
{
  "success": true,
  "message": "Google Sheets 연결 성공",
  "data": {
    "sheetName": "Packages",
    "headerRow": ["id", "name", "description", ...],
    "rowCount": 1
  }
}
```

### 3. 초기 데이터 입력

**Packages 시트에 입력할 데이터:**
- id: 1
- name: 글로벌트리브 로타리 세계대회 특별 투어
- description: 세계 4대 박물관과 타이베이의 정취를 느끼는 특별한 여행
- duration_days: 4
- departure_date: 2026-06-13
- return_date: 2026-06-16
- base_price: 1290000
- single_room_price: 330000
- max_guests: 150
- current_guests: 0
- status: active

### 4. 기능 테스트

**테스트할 기능:**
- [ ] Google Sheets 연결 테스트
- [ ] 패키지 목록 조회
- [ ] 예약 생성
- [ ] 예약 조회
- [ ] 관리자 통계 조회
- [ ] 관리자 예약 목록 조회

---

## 🚀 빠른 시작

### 1. Google Spreadsheet 설정

```bash
# 가이드 파일 확인
cat scripts/setup-sheets-headers.md
```

### 2. 개발 서버 실행

```bash
pnpm run dev
```

### 3. 연결 테스트

브라우저에서:
- http://localhost:3000/api/test/google-sheets

### 4. 기능 테스트

- 랜딩 페이지: http://localhost:3000
- 예약 페이지: http://localhost:3000/booking
- 관리자 대시보드: http://localhost:3000/admin

---

## 📝 참고 문서

- `scripts/01-create-google-sheets.md` - Google Spreadsheet 전체 설정
- `scripts/setup-sheets-headers.md` - 시트 헤더 설정
- `docs/ENV_SETUP_GUIDE.md` - 환경 변수 설정 가이드
- `docs/SETUP_GUIDE.md` - 전체 설정 가이드
- `docs/IMPLEMENTATION_PLAN.md` - 구현 계획

---

## ⚠️ 주의사항

1. **Google Spreadsheet 시트 설정이 완료되어야 API가 정상 작동합니다**
   - 시트가 없으면 오류가 발생할 수 있습니다
   - 헤더 행이 올바르게 입력되어야 합니다

2. **서비스 계정 권한 확인**
   - 스프레드시트에 서비스 계정이 공유되어 있는지 확인
   - 편집자 권한이 부여되어 있는지 확인

3. **환경 변수 확인**
   - `.env.local` 파일이 올바르게 설정되어 있는지 확인
   - 개발 서버 재시작 필요


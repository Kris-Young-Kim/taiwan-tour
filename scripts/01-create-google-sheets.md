# Google Spreadsheet 초기 설정 가이드

이 가이드는 Google Spreadsheet를 데이터베이스로 사용하기 위한 초기 설정을 안내합니다.

## 📋 사전 준비사항

1. Google 계정 (Gmail 계정)
2. Google Drive 접근 권한

---

## 1단계: Google Spreadsheet 생성

### 1.1 새 스프레드시트 만들기

1. [Google Sheets](https://sheets.google.com)에 접속
2. "빈 스프레드시트" 클릭하여 새 스프레드시트 생성
3. 스프레드시트 이름을 "대만 여행 예약 관리"로 변경 (원하는 이름으로 변경 가능)

### 1.2 스프레드시트 ID 확인

1. 스프레드시트 URL을 확인하세요
   - 예: `https://docs.google.com/spreadsheets/d/1ABC123...XYZ789/edit`
2. URL에서 `/d/`와 `/edit` 사이의 긴 문자열이 **스프레드시트 ID**입니다
   - 예: `1ABC123...XYZ789`
3. 이 ID를 복사해두세요 (나중에 `.env.local`에 입력합니다)

---

## 2단계: 시트(Sheet) 생성

스프레드시트 내에 다음 시트들을 생성하세요:

### 2.1 Packages 시트

1. 하단의 "+" 버튼을 클릭하여 새 시트 추가
2. 시트 이름을 "Packages"로 변경
3. 첫 번째 행에 다음 헤더 입력:

| id  | name                                   | description                                            | duration_days | departure_date | return_date | base_price | single_room_price | max_guests | current_guests | status | created_at | updated_at |
| --- | -------------------------------------- | ------------------------------------------------------ | ------------- | -------------- | ----------- | ---------- | ----------------- | ---------- | -------------- | ------ | ---------- | ---------- |
|     | 글로벌트리브 로타리 세계대회 특별 투어 | 세계 4대 박물관과 타이베이의 정취를 느끼는 특별한 여행 | 4             | 2026-06-13     | 2026-06-16  | 1290000    | 330000            | 150        | 0              | active |            |            |

4. 두 번째 행에 샘플 데이터 입력 (위 표 참고)

### 2.2 Bookings 시트

1. 새 시트 추가, 이름을 "Bookings"로 변경
2. 첫 번째 행에 다음 헤더 입력:

| booking_number | package_id | user_email | total_guests | single_rooms | total_amount | payment_status | payment_method | booking_date | created_at | updated_at |
| -------------- | ---------- | ---------- | ------------ | ------------ | ------------ | -------------- | -------------- | ------------ | ---------- | ---------- |

### 2.3 Guests 시트

1. 새 시트 추가, 이름을 "Guests"로 변경
2. 첫 번째 행에 다음 헤더 입력:

| booking_number | name_ko | name_en | birth_date | gender | passport_number | passport_expiry | phone | email | dietary_restrictions | medical_info | special_requests | is_primary | created_at |
| -------------- | ------- | ------- | ---------- | ------ | --------------- | --------------- | ----- | ----- | -------------------- | ------------ | ---------------- | ---------- | ---------- |

### 2.4 Rooms 시트

1. 새 시트 추가, 이름을 "Rooms"로 변경
2. 첫 번째 행에 다음 헤더 입력:

| booking_number | room_type | room_number | guest_ids | check_in_date | check_out_date | created_at |
| -------------- | --------- | ----------- | --------- | ------------- | -------------- | ---------- |

### 2.5 Payments 시트

1. 새 시트 추가, 이름을 "Payments"로 변경
2. 첫 번째 행에 다음 헤더 입력:

| booking_number | amount | payment_method | payment_status | transaction_id | installments | paid_at | refunded_at | created_at | updated_at |
| -------------- | ------ | -------------- | -------------- | -------------- | ------------ | ------- | ----------- | ---------- | ---------- |

### 2.6 Itineraries 시트 (선택사항)

1. 새 시트 추가, 이름을 "Itineraries"로 변경
2. 첫 번째 행에 다음 헤더 입력:

| package_id | day_number | title | description | activities | breakfast | lunch | dinner | hotel | created_at |
| ---------- | ---------- | ----- | ----------- | ---------- | --------- | ----- | ------ | ----- | ---------- |

---

## 3단계: Google Cloud 프로젝트 설정

### 3.1 Google Cloud Console 접속

1. [Google Cloud Console](https://console.cloud.google.com)에 접속
2. Google 계정으로 로그인

### 3.2 새 프로젝트 생성

1. 상단의 프로젝트 선택 드롭다운 클릭
2. "새 프로젝트" 클릭
3. 프로젝트 이름 입력: "대만 여행 예약 시스템" (원하는 이름)
4. "만들기" 클릭
5. 프로젝트 생성 완료까지 대기 (1-2분)

### 3.3 Google Sheets API 활성화

1. 왼쪽 메뉴에서 "API 및 서비스" → "라이브러리" 클릭
2. 검색창에 "Google Sheets API" 입력
3. "Google Sheets API" 클릭
4. "사용 설정" 버튼 클릭

### 3.4 서비스 계정 생성

1. 왼쪽 메뉴에서 "API 및 서비스" → "사용자 인증 정보" 클릭
2. 상단의 "+ 사용자 인증 정보 만들기" 클릭
3. "서비스 계정" 선택
4. 서비스 계정 정보 입력:
   - **서비스 계정 이름**: "sheets-service-account" (원하는 이름)
   - **서비스 계정 ID**: 자동 생성됨
5. "만들기" 클릭
6. 역할은 건너뛰고 "완료" 클릭

### 3.5 서비스 계정 키 생성

1. 방금 생성한 서비스 계정 클릭
2. "키" 탭 클릭
3. "키 추가" → "새 키 만들기" 클릭
4. 키 유형: "JSON" 선택
5. "만들기" 클릭
6. JSON 파일이 자동으로 다운로드됩니다 (⚠️ 이 파일을 안전하게 보관하세요!)

### 3.6 서비스 계정 이메일 확인

1. 서비스 계정 페이지에서 **이메일 주소**를 복사해두세요
   - 예: `sheets-service-account@your-project.iam.gserviceaccount.com`
2. 이 이메일을 나중에 `.env.local`에 입력합니다

---

## 4단계: 스프레드시트 공유 설정

### 4.1 서비스 계정에 공유 권한 부여

1. Google Spreadsheet로 돌아가기
2. 우측 상단의 "공유" 버튼 클릭
3. 3.6에서 복사한 **서비스 계정 이메일 주소**를 입력
4. 권한: "편집자" 선택
5. "완료" 클릭

---

## 5단계: 환경 변수 설정

### 5.1 JSON 키 파일에서 정보 추출

다운로드한 JSON 파일을 열어서 다음 정보를 확인하세요:

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "sheets-service-account@your-project.iam.gserviceaccount.com",
  ...
}
```

### 5.2 .env.local 파일에 추가

프로젝트 루트의 `.env.local` 파일에 다음을 추가하세요:

```env
# Google Sheets 설정
GOOGLE_SERVICE_ACCOUNT_EMAIL=sheets-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SPREADSHEET_ID=your_spreadsheet_id_here
```

**중요 사항:**

- `GOOGLE_PRIVATE_KEY`는 JSON 파일의 `private_key` 값을 그대로 복사하세요
- 줄바꿈 문자(`\n`)가 포함되어 있어야 합니다
- 큰따옴표로 감싸야 합니다

---

## ✅ 설정 완료 체크리스트

- [ ] Google Spreadsheet 생성 완료
- [ ] 스프레드시트 ID 확인 및 복사
- [ ] 모든 시트 생성 완료 (Packages, Bookings, Guests, Rooms, Payments)
- [ ] 각 시트에 헤더 행 입력 완료
- [ ] Google Cloud 프로젝트 생성 완료
- [ ] Google Sheets API 활성화 완료
- [ ] 서비스 계정 생성 완료
- [ ] 서비스 계정 키(JSON) 다운로드 완료
- [ ] 스프레드시트에 서비스 계정 공유 완료 (편집자 권한)
- [ ] `.env.local` 파일에 모든 환경 변수 입력 완료

---

## 🚨 문제 해결

### "권한이 없습니다" 오류

- 스프레드시트에 서비스 계정 이메일을 공유했는지 확인
- 공유 권한이 "편집자"인지 확인

### "스프레드시트를 찾을 수 없습니다" 오류

- 스프레드시트 ID가 올바른지 확인
- 스프레드시트가 삭제되지 않았는지 확인

### "인증 실패" 오류

- `GOOGLE_SERVICE_ACCOUNT_EMAIL`이 올바른지 확인
- `GOOGLE_PRIVATE_KEY`에 줄바꿈 문자(`\n`)가 포함되어 있는지 확인
- JSON 키 파일이 올바른지 확인

---

## 다음 단계

설정이 완료되면 다음 작업을 진행하세요:

1. **패키지 데이터 입력** - Packages 시트에 여행 패키지 정보 입력
2. **테스트** - 개발 서버 실행 후 예약 생성 테스트

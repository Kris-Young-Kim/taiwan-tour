# 테스트 가이드

이 가이드는 시스템이 올바르게 작동하는지 테스트하는 방법을 안내합니다.

## 📋 사전 준비

- [x] 환경 변수 설정 완료
- [x] Google Spreadsheet 시트 생성 완료
- [x] 각 시트에 헤더 행 입력 완료
- [x] Packages 시트에 초기 데이터 입력 완료

---

## 1단계: 개발 서버 실행

```bash
pnpm run dev
```

서버가 정상적으로 시작되면 다음 메시지가 표시됩니다:
```
✓ Ready in Xs
○ Local: http://localhost:3000
```

---

## 2단계: 연결 테스트

### 2.1 Google Sheets 연결 테스트

브라우저에서 다음 URL을 열어보세요:
```
http://localhost:3000/api/test/google-sheets
```

**예상 결과 (성공):**
```json
{
  "success": true,
  "message": "Google Sheets 연결 성공",
  "data": {
    "sheetName": "Packages",
    "headerRow": ["id", "name", "description", ...],
    "rowCount": 2
  }
}
```

**예상 결과 (실패):**
```json
{
  "success": false,
  "message": "Google Sheets 연결 실패",
  "error": "..."
}
```

### 2.2 전체 시트 연결 테스트

브라우저에서 다음 URL을 열어보세요:
```
http://localhost:3000/api/test/connection
```

이 API는 모든 시트의 존재 여부와 헤더를 확인합니다.

**예상 결과:**
```json
{
  "success": true,
  "sheets": {
    "Packages": {
      "exists": true,
      "hasHeaders": true,
      "headerCount": 12,
      "headers": ["id", "name", ...],
      "hasData": true,
      "dataRows": 1
    },
    "Bookings": {
      "exists": true,
      "hasHeaders": true,
      "headerCount": 11
    },
    ...
  },
  "errors": []
}
```

---

## 3단계: 기능 테스트

### 3.1 패키지 목록 조회 테스트

**방법 1: API 직접 호출**
```
http://localhost:3000/api/packages
```
(이 API가 있다면)

**방법 2: 프론트엔드에서 확인**
- 랜딩 페이지에서 패키지 정보가 표시되는지 확인

### 3.2 예약 생성 테스트

**API 호출:**
```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "userEmail": "test@example.com",
    "totalGuests": 2,
    "totalAmount": 2580000,
    "guests": [
      {
        "nameKo": "홍길동",
        "nameEn": "Hong Gildong",
        "birthDate": "1990-01-01",
        "gender": "male",
        "phone": "010-1234-5678",
        "email": "test@example.com",
        "isPrimary": true
      }
    ]
  }'
```

**또는 브라우저에서:**
1. http://localhost:3000/booking 접속
2. 예약 폼 작성
3. 제출

**확인 사항:**
- Google Spreadsheet의 Bookings 시트에 데이터가 추가되었는지 확인
- Guests 시트에 게스트 정보가 추가되었는지 확인
- 예약 번호가 생성되었는지 확인

### 3.3 예약 조회 테스트

**API 호출:**
```
http://localhost:3000/api/bookings?email=test@example.com
```

**확인 사항:**
- 생성한 예약이 목록에 나타나는지 확인
- 예약 상세 정보가 올바른지 확인

### 3.4 관리자 통계 테스트

**API 호출:**
```
http://localhost:3000/api/admin/stats
```

**확인 사항:**
- 총 예약 수가 올바른지 확인
- 총 인원 수가 올바른지 확인
- 총 수익이 올바른지 확인

### 3.5 관리자 예약 목록 테스트

**API 호출:**
```
http://localhost:3000/api/admin/bookings
```

**확인 사항:**
- 예약 목록이 표시되는지 확인
- 필터링이 작동하는지 확인 (status 파라미터)
- 페이지네이션이 작동하는지 확인

---

## 4단계: 프론트엔드 테스트

### 4.1 랜딩 페이지

1. http://localhost:3000 접속
2. 다음 항목 확인:
   - [ ] 페이지가 정상적으로 로드됨
   - [ ] 헤더에 로그인/회원가입 버튼 표시
   - [ ] 히어로 섹션 표시
   - [ ] 가격 정보 표시
   - [ ] 일정 미리보기 표시

### 4.2 예약 페이지

1. http://localhost:3000/booking 접속
2. 다음 항목 확인:
   - [ ] 예약 폼이 표시됨
   - [ ] 가격 계산기가 작동함
   - [ ] 폼 제출이 작동함
   - [ ] 예약 생성 후 확인 페이지로 이동

### 4.3 관리자 대시보드

1. http://localhost:3000/admin 접속
2. 다음 항목 확인:
   - [ ] Clerk 인증 요구 (로그인 필요)
   - [ ] 로그인 후 대시보드 표시
   - [ ] 통계 데이터 표시
   - [ ] 예약 목록 표시

---

## 5단계: Clerk 인증 테스트

### 5.1 로그인 테스트

1. 헤더의 "로그인" 버튼 클릭
2. Clerk 로그인 모달 확인
3. 테스트 계정으로 로그인
4. 로그인 후 UserButton 표시 확인

### 5.2 회원가입 테스트

1. 헤더의 "회원가입" 버튼 클릭
2. Clerk 회원가입 모달 확인
3. 새 계정 생성
4. 이메일 인증 확인

---

## 🚨 문제 해결

### Google Sheets 연결 실패

**증상:** `api/test/google-sheets`에서 오류 발생

**해결 방법:**
1. `.env.local` 파일의 환경 변수 확인
2. 스프레드시트에 서비스 계정이 공유되어 있는지 확인
3. 시트 이름이 정확한지 확인 (대소문자 구분)
4. 개발 서버 재시작

### 시트를 찾을 수 없음

**증상:** 특정 시트에서 오류 발생

**해결 방법:**
1. Google Spreadsheet에서 시트 이름 확인
2. 시트 이름이 정확한지 확인 (Packages, Bookings 등)
3. 시트가 삭제되지 않았는지 확인

### 데이터가 표시되지 않음

**증상:** API는 성공하지만 데이터가 없음

**해결 방법:**
1. Packages 시트에 데이터가 있는지 확인
2. 헤더 행이 첫 번째 행에 있는지 확인
3. 데이터 행이 두 번째 행부터 시작하는지 확인

---

## ✅ 테스트 체크리스트

### 연결 테스트
- [ ] Google Sheets 연결 성공
- [ ] 모든 필수 시트 존재 확인
- [ ] 각 시트에 헤더 행 존재 확인

### 기능 테스트
- [ ] 패키지 목록 조회 성공
- [ ] 예약 생성 성공
- [ ] 예약 조회 성공
- [ ] 관리자 통계 조회 성공
- [ ] 관리자 예약 목록 조회 성공

### 프론트엔드 테스트
- [ ] 랜딩 페이지 정상 표시
- [ ] 예약 페이지 정상 작동
- [ ] 관리자 대시보드 정상 작동
- [ ] Clerk 인증 정상 작동

---

## 다음 단계

모든 테스트가 통과하면:

1. **실제 예약 플로우 테스트** - 전체 예약 프로세스 확인
2. **관리자 기능 테스트** - 예약 수정, 취소 등
3. **에러 처리 확인** - 잘못된 데이터 입력 시 처리 확인
4. **성능 테스트** - 여러 예약 동시 생성 테스트


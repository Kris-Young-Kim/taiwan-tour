# Google Spreadsheet 시트 헤더 설정 가이드

이 가이드는 Google Spreadsheet에 필요한 시트와 헤더를 설정하는 방법을 안내합니다.

## 📋 필요한 시트 목록

다음 시트들을 생성하고 각 시트의 첫 번째 행에 헤더를 입력하세요:

1. **Packages** - 여행 패키지 정보
2. **Bookings** - 예약 정보
3. **Guests** - 참가자 정보
4. **Rooms** - 객실 배정 정보
5. **Payments** - 결제 정보
6. **Itineraries** - 여행 일정 (선택사항)

---

## 1. Packages 시트

### 헤더 행 (첫 번째 행)

| id | name | description | duration_days | departure_date | return_date | base_price | single_room_price | max_guests | current_guests | status | created_at | updated_at |
|---|---|---|---|---|---|---|---|---|---|---|---|---|

### 샘플 데이터 (두 번째 행)

| 1 | 글로벌트리브 로타리 세계대회 특별 투어 | 세계 4대 박물관과 타이베이의 정취를 느끼는 특별한 여행 | 4 | 2026-06-13 | 2026-06-16 | 1290000 | 330000 | 150 | 0 | active | 2025-01-01T00:00:00Z | 2025-01-01T00:00:00Z |

---

## 2. Bookings 시트

### 헤더 행 (첫 번째 행)

| booking_number | package_id | user_email | total_guests | single_rooms | total_amount | payment_status | payment_method | booking_date | created_at | updated_at |
|---|---|---|---|---|---|---|---|---|---|---|

### 설명
- `booking_number`: 예약 번호 (자동 생성, 예: MT-20250101-0001)
- `package_id`: 패키지 ID (Packages 시트의 id와 연결)
- `user_email`: 예약자 이메일
- `total_guests`: 총 인원수
- `single_rooms`: 싱글룸 개수
- `total_amount`: 총 금액
- `payment_status`: 결제 상태 (pending, completed, cancelled, refunded)
- `payment_method`: 결제 방법
- `booking_date`: 예약 날짜
- `created_at`: 생성 일시
- `updated_at`: 수정 일시

---

## 3. Guests 시트

### 헤더 행 (첫 번째 행)

| booking_number | name_ko | name_en | birth_date | gender | passport_number | passport_expiry | phone | email | dietary_restrictions | medical_info | special_requests | is_primary | created_at |
|---|---|---|---|---|---|---|---|---|---|---|---|---|

### 설명
- `booking_number`: 예약 번호 (Bookings 시트와 연결)
- `name_ko`: 이름 (한글)
- `name_en`: 이름 (영문)
- `birth_date`: 생년월일 (YYYY-MM-DD)
- `gender`: 성별 (male, female)
- `passport_number`: 여권 번호
- `passport_expiry`: 여권 만료일
- `phone`: 연락처
- `email`: 이메일
- `dietary_restrictions`: 식이 제한 (쉼표로 구분)
- `medical_info`: 의료 정보
- `special_requests`: 특별 요청사항
- `is_primary`: 주 예약자 여부 (true, false)
- `created_at`: 생성 일시

---

## 4. Rooms 시트

### 헤더 행 (첫 번째 행)

| booking_number | room_type | room_number | guest_ids | check_in_date | check_out_date | created_at |
|---|---|---|---|---|---|---|

### 설명
- `booking_number`: 예약 번호
- `room_type`: 객실 유형 (double, single)
- `room_number`: 객실 번호 (나중에 배정)
- `guest_ids`: 참가자 ID 목록 (쉼표로 구분)
- `check_in_date`: 체크인 날짜 (YYYY-MM-DD)
- `check_out_date`: 체크아웃 날짜 (YYYY-MM-DD)
- `created_at`: 생성 일시

---

## 5. Payments 시트

### 헤더 행 (첫 번째 행)

| booking_number | amount | payment_method | payment_status | transaction_id | installments | paid_at | refunded_at | created_at | updated_at |
|---|---|---|---|---|---|---|---|---|---|

### 설명
- `booking_number`: 예약 번호
- `amount`: 결제 금액
- `payment_method`: 결제 방법 (card, transfer, etc.)
- `payment_status`: 결제 상태 (pending, completed, failed, refunded)
- `transaction_id`: 거래 ID
- `installments`: 할부 개월 수
- `paid_at`: 결제 일시
- `refunded_at`: 환불 일시
- `created_at`: 생성 일시
- `updated_at`: 수정 일시

---

## 6. Itineraries 시트 (선택사항)

### 헤더 행 (첫 번째 행)

| package_id | day_number | title | description | activities | breakfast | lunch | dinner | hotel | created_at |
|---|---|---|---|---|---|---|---|---|---|

### 설명
- `package_id`: 패키지 ID
- `day_number`: 일정 번호 (1, 2, 3, 4)
- `title`: 일정 제목
- `description`: 일정 설명
- `activities`: 활동 목록 (쉼표로 구분)
- `breakfast`: 조식 정보
- `lunch`: 중식 정보
- `dinner`: 석식 정보
- `hotel`: 숙박 정보
- `created_at`: 생성 일시

---

## 설정 방법

### 1. 시트 생성

1. Google Spreadsheet를 엽니다
2. 하단의 "+" 버튼을 클릭하여 새 시트를 추가합니다
3. 시트 이름을 변경합니다 (예: "Packages")

### 2. 헤더 입력

1. 각 시트의 첫 번째 행(A1부터)에 위의 헤더를 입력합니다
2. 각 열에 하나씩 입력하세요

### 3. 샘플 데이터 입력 (Packages 시트만)

1. Packages 시트의 두 번째 행에 샘플 데이터를 입력합니다
2. 위의 샘플 데이터를 참고하세요

---

## 빠른 복사용 텍스트

### Packages 헤더
```
id	name	description	duration_days	departure_date	return_date	base_price	single_room_price	max_guests	current_guests	status	created_at	updated_at
```

### Bookings 헤더
```
booking_number	package_id	user_email	total_guests	single_rooms	total_amount	payment_status	payment_method	booking_date	created_at	updated_at
```

### Guests 헤더
```
booking_number	name_ko	name_en	birth_date	gender	passport_number	passport_expiry	phone	email	dietary_restrictions	medical_info	special_requests	is_primary	created_at
```

### Rooms 헤더
```
booking_number	room_type	room_number	guest_ids	check_in_date	check_out_date	created_at
```

### Payments 헤더
```
booking_number	amount	payment_method	payment_status	transaction_id	installments	paid_at	refunded_at	created_at	updated_at
```

### Itineraries 헤더
```
package_id	day_number	title	description	activities	breakfast	lunch	dinner	hotel	created_at
```

---

## ✅ 설정 완료 체크리스트

- [ ] Packages 시트 생성 및 헤더 입력
- [ ] Packages 시트에 샘플 데이터 입력
- [ ] Bookings 시트 생성 및 헤더 입력
- [ ] Guests 시트 생성 및 헤더 입력
- [ ] Rooms 시트 생성 및 헤더 입력
- [ ] Payments 시트 생성 및 헤더 입력
- [ ] Itineraries 시트 생성 및 헤더 입력 (선택사항)

---

## 다음 단계

시트 설정이 완료되면:

1. **연결 테스트**: `GET /api/test/google-sheets` 호출하여 연결 확인
2. **데이터 테스트**: 예약 생성 API 호출하여 데이터 저장 확인
3. **관리자 대시보드**: 통계 데이터가 정상적으로 표시되는지 확인


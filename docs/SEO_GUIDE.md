# SEO 및 최적화 가이드

## 완료된 작업

### 1. SEO 최적화

#### 메타 태그 설정
- ✅ 기본 메타 태그 (title, description, keywords)
- ✅ Open Graph 태그 (페이스북, 카카오톡 공유)
- ✅ Twitter Card 태그
- ✅ Robots 메타 태그
- ✅ 각 페이지별 개별 메타 태그 설정

#### 사이트맵 생성
- ✅ `app/sitemap.ts` - Next.js 자동 사이트맵 생성
- ✅ 주요 페이지 포함:
  - 홈페이지 (/)
  - 상세 일정 페이지 (/itinerary)
  - 예약 페이지 (/booking)

#### robots.txt 설정
- ✅ `app/robots.ts` - Next.js 자동 robots.txt 생성
- ✅ `public/robots.txt` - 정적 파일로도 제공
- ✅ API 및 관리자 페이지 차단 설정

### 2. 성능 최적화

#### 이미지 최적화
- ✅ Next.js Image 최적화 활성화
- ✅ AVIF 및 WebP 포맷 지원
- ✅ 반응형 이미지 크기 설정
- ✅ 캐싱 전략 설정 (1년)

#### 코드 스플리팅
- ✅ 예약 페이지 컴포넌트 lazy loading
- ✅ 패키지 최적화 (lucide-react, radix-ui)
- ✅ 동적 import 활용

#### 캐싱 전략
- ✅ 정적 자산 캐싱 (1년)
- ✅ Next.js 빌드 파일 캐싱
- ✅ 이미지 파일 캐싱

## 추가 설정 필요 사항

### 1. 환경 변수 설정
`.env.local` 파일에 다음 변수 추가:
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 2. OG 이미지 생성
`public/og-image.jpg` 파일을 생성하세요:
- 크기: 1200x630px
- 형식: JPG 또는 PNG
- 내용: 민투어 로고 및 대만 여행 이미지

### 3. Google Search Console
1. Google Search Console에 사이트 등록
2. `app/layout.tsx`의 `verification.google`에 인증 코드 추가

### 4. 추가 최적화 권장 사항

#### 이미지 최적화
- 실제 이미지 파일을 `public/` 폴더에 추가
- Next.js Image 컴포넌트 사용 권장
- 이미지 크기 최적화 (WebP, AVIF 변환)

#### 성능 모니터링
- Vercel Analytics 활성화 (이미 설정됨)
- Lighthouse 성능 테스트
- Core Web Vitals 모니터링

#### 추가 SEO
- 구조화된 데이터 (JSON-LD) 추가 고려
- 각 페이지별 canonical URL 설정
- hreflang 태그 (다국어 지원 시)

## 참고 자료

- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Next.js Image Optimization](https://nextjs.org/docs/app/api-reference/components/image)
- [Google Search Console](https://search.google.com/search-console)


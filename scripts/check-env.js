/**
 * 환경 변수 설정 확인 스크립트
 * 
 * 사용법: node scripts/check-env.js
 * 
 * 이 스크립트는 .env.local 파일의 환경 변수가 올바르게 설정되었는지 확인합니다.
 */

const fs = require('fs');
const path = require('path');

// .env.local 파일 경로
const envPath = path.join(process.cwd(), '.env.local');

console.log('🔍 환경 변수 설정 확인 중...\n');

// .env.local 파일 존재 확인
if (!fs.existsSync(envPath)) {
  console.error('❌ .env.local 파일을 찾을 수 없습니다.');
  console.log('\n📝 해결 방법:');
  console.log('   1. env.template 파일을 .env.local로 복사하세요');
  console.log('   2. Windows: copy env.template .env.local');
  console.log('   3. Mac/Linux: cp env.template .env.local');
  process.exit(1);
}

console.log('✅ .env.local 파일이 존재합니다.\n');

// .env.local 파일 읽기
const envContent = fs.readFileSync(envPath, 'utf-8');

// 필수 환경 변수 목록
const requiredVars = {
  'Google Sheets': [
    'GOOGLE_SERVICE_ACCOUNT_EMAIL',
    'GOOGLE_PRIVATE_KEY',
    'GOOGLE_SPREADSHEET_ID',
  ],
  'Clerk': [
    'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
    'CLERK_SECRET_KEY',
  ],
};

// 선택적 환경 변수
const optionalVars = [
  'TOSS_PAYMENTS_CLIENT_KEY',
  'TOSS_PAYMENTS_SECRET_KEY',
  'STRIPE_PUBLISHABLE_KEY',
  'STRIPE_SECRET_KEY',
  'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY',
  'NEXT_PUBLIC_APP_URL',
];

let allValid = true;
let totalChecked = 0;
let totalValid = 0;

// 필수 환경 변수 확인
console.log('📋 필수 환경 변수 확인:\n');

Object.entries(requiredVars).forEach(([category, vars]) => {
  console.log(`\n${category}:`);
  vars.forEach((varName) => {
    totalChecked++;
    const regex = new RegExp(`^${varName}=(.+)$`, 'm');
    const match = envContent.match(regex);
    
    if (match && match[1] && !match[1].includes('your_') && match[1].trim() !== '') {
      const value = match[1].trim();
      // 값이 실제로 설정되었는지 확인 (your_xxx 같은 플레이스홀더가 아닌지)
      if (value.length > 10) { // 최소 길이 체크
        console.log(`  ✅ ${varName}: 설정됨 (${value.substring(0, 20)}...)`);
        totalValid++;
      } else {
        console.log(`  ⚠️  ${varName}: 값이 너무 짧거나 플레이스홀더일 수 있습니다`);
        allValid = false;
      }
    } else {
      console.log(`  ❌ ${varName}: 설정되지 않음`);
      allValid = false;
    }
  });
});

// 선택적 환경 변수 확인
console.log('\n\n📋 선택적 환경 변수 확인:\n');
optionalVars.forEach((varName) => {
  const regex = new RegExp(`^${varName}=(.+)$`, 'm');
  const match = envContent.match(regex);
  
  if (match && match[1] && !match[1].includes('your_') && match[1].trim() !== '') {
    console.log(`  ✅ ${varName}: 설정됨`);
  } else {
    console.log(`  ⚪ ${varName}: 설정되지 않음 (선택사항)`);
  }
});

// 결과 요약
console.log('\n' + '='.repeat(50));
console.log('📊 결과 요약:');
console.log(`   확인한 변수: ${totalChecked}개`);
console.log(`   올바르게 설정된 변수: ${totalValid}개`);
console.log(`   누락된 변수: ${totalChecked - totalValid}개`);

if (allValid) {
  console.log('\n✅ 모든 필수 환경 변수가 올바르게 설정되었습니다!');
  console.log('\n다음 단계:');
  console.log('  1. 개발 서버 실행: pnpm run dev');
  console.log('  2. Google Spreadsheet 설정 확인');
  console.log('  3. Clerk 인증 테스트');
} else {
  console.log('\n⚠️  일부 환경 변수가 설정되지 않았습니다.');
  console.log('\n📝 다음 가이드를 참고하세요:');
  console.log('  - docs/ENV_SETUP_GUIDE.md');
  console.log('  - scripts/01-create-google-sheets.md');
  console.log('  - docs/SETUP_GUIDE.md');
  process.exit(1);
}


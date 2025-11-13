/**
 * Google Sheets 연결 테스트 스크립트
 * 
 * 사용법: node scripts/test-connection.js
 * 
 * 이 스크립트는 Google Sheets 연결과 시트 설정이 올바른지 확인합니다.
 */

const { readSheet } = require('../lib/google-sheets.ts');

async function testConnection() {
  console.log('🔍 Google Sheets 연결 테스트 시작...\n');

  try {
    // Packages 시트 테스트
    console.log('1. Packages 시트 확인 중...');
    const packagesData = await readSheet('Packages!A1:Z10');
    
    if (packagesData.length === 0) {
      console.log('   ⚠️  Packages 시트가 비어있습니다.');
      console.log('   📝 헤더 행을 입력했는지 확인하세요.');
    } else {
      console.log(`   ✅ Packages 시트 발견 (${packagesData.length}행)`);
      console.log(`   📋 헤더: ${packagesData[0].join(', ')}`);
      
      if (packagesData.length > 1) {
        console.log(`   ✅ 데이터 행 ${packagesData.length - 1}개 발견`);
      } else {
        console.log('   ⚠️  데이터 행이 없습니다. 샘플 데이터를 입력하세요.');
      }
    }

    // Bookings 시트 테스트
    console.log('\n2. Bookings 시트 확인 중...');
    const bookingsData = await readSheet('Bookings!A1:Z1');
    if (bookingsData.length > 0) {
      console.log(`   ✅ Bookings 시트 발견`);
      console.log(`   📋 헤더: ${bookingsData[0].join(', ')}`);
    } else {
      console.log('   ❌ Bookings 시트를 찾을 수 없습니다.');
    }

    // Guests 시트 테스트
    console.log('\n3. Guests 시트 확인 중...');
    const guestsData = await readSheet('Guests!A1:Z1');
    if (guestsData.length > 0) {
      console.log(`   ✅ Guests 시트 발견`);
      console.log(`   📋 헤더: ${guestsData[0].join(', ')}`);
    } else {
      console.log('   ❌ Guests 시트를 찾을 수 없습니다.');
    }

    // Rooms 시트 테스트
    console.log('\n4. Rooms 시트 확인 중...');
    const roomsData = await readSheet('Rooms!A1:Z1');
    if (roomsData.length > 0) {
      console.log(`   ✅ Rooms 시트 발견`);
      console.log(`   📋 헤더: ${roomsData[0].join(', ')}`);
    } else {
      console.log('   ❌ Rooms 시트를 찾을 수 없습니다.');
    }

    // Payments 시트 테스트
    console.log('\n5. Payments 시트 확인 중...');
    const paymentsData = await readSheet('Payments!A1:Z1');
    if (paymentsData.length > 0) {
      console.log(`   ✅ Payments 시트 발견`);
      console.log(`   📋 헤더: ${paymentsData[0].join(', ')}`);
    } else {
      console.log('   ❌ Payments 시트를 찾을 수 없습니다.');
    }

    console.log('\n' + '='.repeat(50));
    console.log('✅ 연결 테스트 완료!');
    console.log('\n다음 단계:');
    console.log('  1. 개발 서버 실행: pnpm run dev');
    console.log('  2. 브라우저에서 http://localhost:3000/api/test/google-sheets 접속');
    console.log('  3. 예약 생성 테스트');

  } catch (error) {
    console.error('\n❌ 연결 테스트 실패:', error.message);
    console.log('\n📝 확인 사항:');
    console.log('  1. .env.local 파일의 환경 변수가 올바른지 확인');
    console.log('  2. 스프레드시트에 서비스 계정이 공유되어 있는지 확인');
    console.log('  3. 시트 이름이 정확한지 확인 (Packages, Bookings, Guests, Rooms, Payments)');
    process.exit(1);
  }
}

// Node.js에서 직접 실행 시
if (require.main === module) {
  testConnection().catch(console.error);
}

module.exports = { testConnection };


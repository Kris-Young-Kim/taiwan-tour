# .env.local 파일 생성 가이드

이 가이드는 `.env.local` 파일을 생성하는 방법을 안내합니다.

## 빠른 시작

### Windows

1. 명령 프롬프트(CMD) 또는 PowerShell을 엽니다
2. 프로젝트 루트 디렉토리로 이동합니다
3. 다음 명령어를 실행합니다:
   ```cmd
   copy env.template .env.local
   ```

### Mac/Linux

1. 터미널을 엽니다
2. 프로젝트 루트 디렉토리로 이동합니다
3. 다음 명령어를 실행합니다:
   ```bash
   cp env.template .env.local
   ```

## 수동 생성

1. 프로젝트 루트 디렉토리에 `.env.local` 파일을 새로 생성합니다
2. `env.template` 파일의 내용을 복사하여 붙여넣습니다
3. `your_xxx` 부분을 실제 값으로 변경합니다

## 다음 단계

`.env.local` 파일을 생성한 후:

1. `docs/ENV_SETUP_GUIDE.md` 파일을 참고하여 각 환경 변수를 설정하세요
2. Google Sheets 설정 정보 입력
3. Clerk 설정 정보 입력


#!/usr/bin/env bash
# PEACEWORKS 링크트리 홈서버 배포 스크립트 (pm2 static serve 방식)
# 사용법: ./deploy.sh   (프로젝트 루트에서 실행)
set -euo pipefail

APP_NAME="peaceworks-link"
PORT="${PORT:-3400}"           # 노출 포트 (3100은 '한자리'가 사용 중이므로 피함)
DIR="$(cd "$(dirname "$0")" && pwd)"

cd "$DIR"

echo "▶ 1/4 의존성 설치"
if [ -f package-lock.json ]; then
  npm ci
else
  npm install
fi

echo "▶ 2/4 정적 빌드 (out/ 생성)"
npm run build

echo "▶ 3/4 pm2로 정적 서빙 재기동 (포트 ${PORT})"
# 기존 인스턴스가 있으면 지우고 새로 등록 (idempotent)
pm2 delete "$APP_NAME" >/dev/null 2>&1 || true
pm2 serve "$DIR/out" "$PORT" --name "$APP_NAME" --spa

echo "▶ 4/4 pm2 상태 저장 (재부팅 후 자동 복구)"
pm2 save

echo ""
echo "✅ 배포 완료: http://localhost:${PORT}"
echo "   외부 공개는 Cloudflare Tunnel ingress에 localhost:${PORT} 를 연결하세요 (README 참고)."

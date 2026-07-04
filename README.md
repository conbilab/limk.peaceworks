# PEACEWORKS Link-in-Bio (홈서버 배포판)

PEACEWORKS / 조피스의 링크트리형 미니 랜딩페이지.
Next.js 14 + TypeScript + Tailwind CSS → **정적 export(`out/`)** → 홈서버에서 서빙.

> PRD 원안은 Vercel 배포였으나, **홈서버 배포**를 위해 정적 export + (pm2 또는 Docker) 서빙으로 대체했습니다.

---

## 1. 폴더 구조 (역할 분리)

```text
app/          # 페이지 조립 + 레이아웃(SEO/OG) + 전역 스타일  (렌더)
components/   # UI 컴포넌트 (ProfileHero, LinkButton, ImpactCard, GAScripts, PageTracker)
data/         # links.ts(링크), content.ts(카피/브랜드)         (데이터, 하드코딩 금지)
lib/          # analytics.ts (GA4 이벤트 순수 로직)             (로직, UI와 분리)
public/images # 로고/프로필/OG (현재는 플레이스홀더)
```

- **SRP**: UI는 렌더만, 데이터는 `data/`, 로직은 `lib/`로 분리.
- **DIP**: 컴포넌트는 `gtag`에 직접 의존하지 않고 `lib/analytics.ts`의 `trackEvent()` 래퍼에만 의존.

---

## 2. 로컬 실행

```bash
cp .env.example .env      # 값 채우기 (아래 3번)
npm install
npm run dev               # http://localhost:3400 (개발)
```

정적 산출물 확인:

```bash
npm run build             # out/ 생성
npm run serve:static      # http://localhost:3400 (정적 미리보기)
```

---

## 3. 환경 변수 (`.env`)

| 키 | 설명 | 예시 |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | 사이트 절대 URL (OG/메타 base) | `https://link.한자리.com` |
| `NEXT_PUBLIC_GA_ID` | GA4 측정 ID (없으면 비움 → 분석 비활성) | `G-XXXXXXXXXX` |

> `NEXT_PUBLIC_*`는 **빌드 시점에 인라인**됩니다. 값을 바꾸면 반드시 다시 빌드하세요.
> 비밀키는 이 파일에 넣지 마세요. (링크트리는 공개 값만 사용)

---

## 4. 콘텐츠 수정 (개발 지식 없이)

- 링크 URL: `data/links.ts` 의 `href` 값 (`#..._URL` 자리표시자를 실제 링크로 교체). 비워두면 버튼은 클릭돼도 이동 안 함.
- 문구/이름/헤드라인/기부카드: `data/content.ts`.
- 로고/프로필/OG 이미지: `public/images/` 의 파일 교체 (같은 파일명 권장).
  - `peaceworks-logo.png`, `jopeace-profile.webp`, `og.png` — **현재는 임시 플레이스홀더**이니 실제 이미지로 교체하세요.

---

## 5. 홈서버 배포

> ⚠️ 포트 **3100은 이미 `한자리.com` 서비스가 사용 중**이라 피했습니다. 이 앱은 **3400** 포트를 씁니다.

### 방법 A) pm2 (권장 · 기존 서버 방식과 동일)

```bash
./deploy.sh               # npm ci → build → pm2 serve out 3400 → pm2 save
pm2 status                # peaceworks-link online 확인
curl -I http://localhost:3400
```

### 방법 B) Docker (격리/재현성)

```bash
docker compose up -d --build
curl -I http://localhost:3400
```

---

## 6. 외부 공개 (Cloudflare Tunnel)

목표 공개 주소: **`https://link.peaceworks.com`**
현재 서버는 `cloudflared`(systemd, `/etc/cloudflared/config.yml`, 터널명 `hanjari`)로 터널을 운영 중입니다.

> ⚠️ **전제: `peaceworks.com`을 Cloudflare 계정에 먼저 추가해야 합니다.**
> 조회 결과 `peaceworks.com`은 현재 Namecheap 기본 DNS(`registrar-servers.com`)를 쓰고 있어 Cloudflare를 거치지 않습니다.
> Cloudflare Tunnel은 Cloudflare로 들어온 트래픽만 처리하므로, 이 상태에선 서브도메인 연결이 동작하지 않습니다.

### 6-1. peaceworks.com 을 Cloudflare로 이전 (최초 1회)

1. Cloudflare 대시보드 → **Add a site** → `peaceworks.com` 입력
2. Cloudflare가 알려주는 네임서버 2개를 **Namecheap 도메인 관리 → Nameservers → Custom DNS**에 등록
3. 네임서버 전파 완료(수분~수시간) 후, `peaceworks.com`이 Cloudflare zone으로 활성화됨

### 6-2. 터널에 서브도메인 연결

```bash
# 1) DNS 라우트 (zone이 Cloudflare에 있어야 성공)
cloudflared tunnel route dns hanjari link.peaceworks.com

# 2) /etc/cloudflared/config.yml 의 ingress에 규칙 추가 (sudo, 404는 항상 마지막)
sudo nano /etc/cloudflared/config.yml
```

```yaml
ingress:
  - hostname: link.peaceworks.com        # 링크트리
    service: http://localhost:3400
  - hostname: xn--oy2b17wzwk.com         # 기존 '한자리' (건드리지 말 것)
    service: http://localhost:3100
  - service: http_status:404             # 항상 마지막
```

```bash
# 3) 반영
sudo systemctl restart cloudflared
# 4) 확인
curl -I https://link.peaceworks.com      # 200 OK 기대
```

> `NEXT_PUBLIC_SITE_URL`은 이미 `https://link.peaceworks.com`으로 설정돼 있습니다.
> 값을 바꾸면 `bash deploy.sh`로 다시 빌드하세요.

---

## 7. 성공 판정 체크리스트

1. [ ] `npm run build`가 오류 없이 `out/` 생성
2. [ ] `curl -I http://localhost:3400` → `200 OK`
3. [ ] 첫 화면에 로고·프로필·헤드라인·메인 CTA(모임 참여하기)가 보임
4. [ ] 메인 CTA가 네이비로 가장 강조되고, 채널 버튼 4개가 아래에 정렬
5. [ ] 모바일 360px 폭에서 레이아웃이 깨지지 않음
6. [ ] 외부 링크 클릭 시 새 탭으로 열림 (`target="_blank"`)
7. [ ] `data/links.ts`의 `href`를 실제 URL로 바꾸면 정상 이동
8. [ ] `NEXT_PUBLIC_GA_ID` 설정 후 재빌드 시 GA4 이벤트(`view_linktree`, `click_*`) 발화
9. [ ] 이미지 alt / 버튼 aria-label / 키보드 포커스 링 동작
10. [ ] (공개 시) 브라우저에서 서브도메인 접속 → 페이지 정상 표시

---

## 8. GA4 이벤트 목록 (PRD 13)

`view_linktree`, `click_primary_cta`, `click_meeting`, `click_instagram`,
`click_youtube`, `click_threads`, `click_blog`, `click_impact_card`, `scroll_75`

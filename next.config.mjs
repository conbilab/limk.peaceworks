/** @type {import('next').NextConfig} */
const nextConfig = {
  // 홈서버(nginx)에서 정적 파일로 서빙하기 위해 static export 사용
  output: "export",
  // 정적 export에서는 next/image 서버 최적화를 못 쓰므로 비활성화
  images: {
    unoptimized: true,
  },
  // nginx에서 /path/ -> /path/index.html 매핑이 자연스럽도록 트레일링 슬래시 사용
  trailingSlash: true,
};

export default nextConfig;

# Public Assets

이미지와 비디오 파일을 업로드할 수 있는 폴더 구조입니다.

## 폴더 구조

```
public/
├── images/
│   ├── hero/         # 메인 히어로 섹션 이미지
│   ├── about/        # 회사소개 섹션 이미지
│   ├── services/     # 서비스 섹션 이미지
│   └── portfolio/    # 포트폴리오 갤러리 이미지
└── videos/           # 비디오 파일
```

## 사용 방법

1. 각 폴더에 이미지/비디오 파일을 업로드하세요
2. 컴포넌트에서 다음과 같이 사용:

```tsx
import Image from 'next/image';

<Image 
  src="/images/hero/main.jpg" 
  alt="Hero Image"
  width={1920}
  height={1080}
/>
```

## 권장 사항

- 이미지 포맷: WebP, JPEG, PNG
- 비디오 포맷: MP4, WebM
- 이미지 최적화를 위해 적절한 크기로 리사이즈 후 업로드

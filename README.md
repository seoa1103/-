# HYPERLINK ARCHIVE

서로 독립된 여러 시리즈를 하이퍼링크로 탐색하는 흑백 미니멀 정적 사이트입니다.

## 핵심 구조

- 각 시리즈는 `series-data.js` 안에서 별도의 `id`, 시작점, 조각 목록을 가집니다.
- 조각 안의 링크는 자기 시리즈 내부의 조각만 가리킵니다.
- 현재 위치, 방문 기록, 뒤로 가기 기록은 시리즈마다 별도의 `localStorage` 키에 저장됩니다.
- 다른 시리즈 탭으로 이동했다 돌아오면 해당 시리즈의 마지막 위치가 그대로 복원됩니다.
- 모든 조각은 고유 URL을 가지므로 링크를 복사해 특정 장면을 바로 공유할 수 있습니다.

## 실행

정적 파일이므로 간단한 로컬 서버만 있으면 됩니다.

```bash
python3 -m http.server 4173
```

브라우저에서 `http://localhost:4173`을 엽니다.

## 콘텐츠 수정

`series-data.js`의 `seriesCatalog` 배열만 수정하면 됩니다.

```js
{
  id: "고유한-영문-id",
  label: "SERIES 04",
  title: "시리즈 제목",
  description: "시리즈 소개",
  start: "첫-조각-id",
  nodes: {
    "첫-조각-id": {
      kicker: "FRAGMENT 01",
      title: "조각 제목",
      body: ["첫 문단", "둘째 문단"],
      links: [
        { label: "독자에게 보일 링크 문장", to: "다음-조각-id" }
      ]
    }
  }
}
```

`to`에는 반드시 같은 시리즈 안에 실제로 존재하는 조각 ID를 입력합니다.

## GitHub Pages 배포

1. 이 폴더의 파일을 저장소 기본 브랜치에 올립니다.
2. GitHub 저장소의 **Settings → Pages**로 이동합니다.
3. **Deploy from a branch**를 선택합니다.
4. 기본 브랜치와 `/ (root)` 폴더를 지정해 저장합니다.

별도 빌드 과정이나 외부 라이브러리는 필요하지 않습니다.

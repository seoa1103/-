export const seriesCatalog = [
  {
    id: "room",
    label: "SERIES 01",
    title: "불투명한 방",
    description: "같은 방을 서로 다르게 기억하는 세 개의 목소리. 링크를 고를 때마다 증언의 순서가 달라집니다.",
    start: "entrance",
    nodes: {
      entrance: {
        kicker: "FRAGMENT 01 / ENTRANCE",
        title: "문은 안에서 잠겨 있었다",
        body: [
          "복도 끝의 방은 늘 비어 있다고 들었다. 그런데 오늘 새벽, 문 안쪽에서 의자가 끌리는 소리가 났다.",
          "손잡이 아래에는 흰 종이가 끼워져 있었다. 종이에는 문장 대신 두 개의 밑줄만 그어져 있었다."
        ],
        links: [
          { label: "문틈으로 방 안을 확인한다", to: "keyhole" },
          { label: "종이를 뒤집어 본다", to: "paper" }
        ]
      },
      keyhole: {
        kicker: "FRAGMENT 02 / KEYHOLE",
        title: "방 안에는 내가 서 있었다",
        body: [
          "좁은 구멍 너머로 보인 것은 낡은 탁자와 등을 돌린 사람이었다. 그 사람은 내가 입은 것과 같은 옷을 입고 있었다.",
          "그가 천천히 고개를 돌리기 전에, 복도 반대편에서 내 이름을 부르는 소리가 났다."
        ],
        links: [
          { label: "방 안의 나를 계속 바라본다", to: "mirror" },
          { label: "목소리가 난 쪽으로 간다", to: "hallway" }
        ]
      },
      paper: {
        kicker: "FRAGMENT 03 / PAPER",
        title: "뒤집은 종이에도 앞면이 있었다",
        body: [
          "종이를 뒤집자 방금까지 없던 문장이 나타났다. ‘먼저 읽은 쪽을 믿지 말 것.’",
          "아래의 두 밑줄은 이제 서로 다른 방향을 가리키는 화살표가 되어 있었다."
        ],
        links: [
          { label: "왼쪽 화살표를 따라간다", to: "hallway" },
          { label: "오른쪽 화살표를 따라간다", to: "mirror" }
        ]
      },
      hallway: {
        kicker: "FRAGMENT 04 / HALLWAY",
        title: "복도는 방의 안쪽으로 이어졌다",
        body: [
          "열 걸음을 걸었는데도 문은 등 뒤에서 멀어지지 않았다. 창문 밖에는 복도가 있었고, 그 복도에도 내가 서 있었다.",
          "나는 이제 어느 쪽이 방 안인지 설명할 수 없었다."
        ],
        links: [
          { label: "처음의 문으로 돌아간다", to: "entrance" },
          { label: "창문 속 복도로 넘어간다", to: "mirror" }
        ]
      },
      mirror: {
        kicker: "FRAGMENT 05 / MIRROR",
        title: "그가 먼저 눈을 감았다",
        body: [
          "방 안의 내가 눈을 감자 복도의 불이 꺼졌다. 잠깐의 어둠 뒤, 나는 탁자 앞에 앉아 있었다.",
          "문밖에서 누군가 숨을 참고 있었다. 이제 문은 내 쪽에서 잠겨 있었다."
        ],
        links: [
          { label: "문밖의 사람에게 종이를 건넨다", to: "paper" },
          { label: "아무 소리도 내지 않는다", to: "entrance" }
        ]
      }
    }
  },
  {
    id: "signal",
    label: "SERIES 02",
    title: "남겨진 신호",
    description: "방송이 끝난 뒤에도 도착하는 짧은 전파 기록. 어느 주파수를 선택하느냐에 따라 발신자가 바뀝니다.",
    start: "broadcast",
    nodes: {
      broadcast: {
        kicker: "LOG 00:13 / BROADCAST",
        title: "종료 방송 이후의 목소리",
        body: [
          "방송국은 자정에 폐쇄됐다. 그러나 00시 13분, 꺼진 수신기에서 또렷한 호출 부호가 흘러나왔다.",
          "발신지는 지도에서 삭제된 중계소였다. 음성은 두 개의 주파수를 번갈아 읽었다."
        ],
        links: [
          { label: "88.1 MHz에 맞춘다", to: "weather" },
          { label: "104.7 MHz에 맞춘다", to: "name" }
        ]
      },
      weather: {
        kicker: "LOG 00:18 / WEATHER",
        title: "내일의 날씨는 어제와 같겠습니다",
        body: [
          "기상 안내는 이미 지나간 날짜를 반복했다. 강수 확률과 풍향은 그날 사고 기록과 정확히 일치했다.",
          "마지막 문장만 매번 달라졌다. 이번에는 ‘한 명이 아직 돌아오지 않았습니다’였다."
        ],
        links: [
          { label: "사고 기록을 재생한다", to: "archive" },
          { label: "마지막 문장에 응답한다", to: "reply" }
        ]
      },
      name: {
        kicker: "LOG 00:21 / NAME",
        title: "수신기가 내 이름을 발음했다",
        body: [
          "잡음 사이로 내 이름이 세 번 들렸다. 첫 번째는 낯선 목소리, 두 번째는 동료의 목소리, 세 번째는 내 목소리였다.",
          "녹음 버튼은 이미 눌려 있었다. 재생 시간은 아직 오지 않은 시각을 가리켰다."
        ],
        links: [
          { label: "미래 시각의 녹음을 듣는다", to: "reply" },
          { label: "수신기를 기록 보관실로 가져간다", to: "archive" }
        ]
      },
      archive: {
        kicker: "LOG 00:34 / ARCHIVE",
        title: "보관함에는 같은 밤이 열두 개 있었다",
        body: [
          "날짜가 다른 테이프마다 동일한 17분이 녹음되어 있었다. 차이는 끝부분에 기록된 청취자의 이름뿐이었다.",
          "마지막 테이프의 라벨은 비어 있었다. 수신기에서는 녹음이 끝나는 신호음이 울렸다."
        ],
        links: [
          { label: "빈 라벨에 이름을 적는다", to: "broadcast" },
          { label: "모든 테이프를 동시에 재생한다", to: "reply" }
        ]
      },
      reply: {
        kicker: "LOG 00:42 / REPLY",
        title: "응답은 과거로 송신되었다",
        body: [
          "송신 버튼을 누르자 시계의 초침이 뒤로 움직였다. 내가 말한 문장은 조금 전 수신한 목소리와 겹쳐졌다.",
          "발신자를 찾았다는 생각이 들었다. 처음부터 이 신호를 남긴 사람은 청취자였다."
        ],
        links: [
          { label: "자정의 첫 방송으로 돌아간다", to: "broadcast" },
          { label: "내 이름이 나온 주파수를 다시 듣는다", to: "name" }
        ]
      }
    }
  },
  {
    id: "exit-zero",
    label: "SERIES 03",
    title: "0번 출구",
    description: "존재하지 않는 지하철 출구를 둘러싼 목격 기록. 출구를 찾는 길과 피하는 길이 동시에 이어집니다.",
    start: "platform",
    nodes: {
      platform: {
        kicker: "ROUTE 00 / PLATFORM",
        title: "막차는 승강장을 지나치지 않았다",
        body: [
          "전광판의 도착 시각이 00:00에서 멈췄다. 터널에서는 바람만 불어왔고, 맞은편 벽에 처음 보는 출구 표시가 켜졌다.",
          "표지판의 숫자는 0이었다. 역무원은 그런 출구는 없다고 말했다."
        ],
        links: [
          { label: "맞은편 벽으로 내려간다", to: "stairs" },
          { label: "역무실로 돌아간다", to: "office" }
        ]
      },
      stairs: {
        kicker: "ROUTE 01 / STAIRS",
        title: "계단은 올라갈수록 깊어졌다",
        body: [
          "스무 계단을 올랐지만 승강장은 머리 위가 아니라 발밑에서 보였다. 안내 방송은 반대 방향으로 걸으라고 반복했다.",
          "벽면의 노선도에는 내가 서 있는 점만 표시되어 있었다."
        ],
        links: [
          { label: "안내 방송과 반대로 걷는다", to: "gate" },
          { label: "노선도의 점을 누른다", to: "map" }
        ]
      },
      office: {
        kicker: "ROUTE 02 / OFFICE",
        title: "역무원은 한 사람 더 있었다",
        body: [
          "유리창 안에는 조금 전 대화한 역무원이 앉아 있었다. 그 뒤에도 같은 얼굴의 사람이 서 있었다.",
          "두 사람은 서로 다른 방향을 가리켰다. 어느 쪽에도 출입문은 없었다."
        ],
        links: [
          { label: "앉아 있는 역무원의 말을 따른다", to: "map" },
          { label: "서 있는 역무원의 손끝을 본다", to: "gate" }
        ]
      },
      map: {
        kicker: "ROUTE 03 / MAP",
        title: "노선은 내가 걸은 뒤에 생겼다",
        body: [
          "손가락으로 점을 누르자 얇은 선이 뒤따라 그어졌다. 선의 끝에는 지금까지 지나온 장소가 역명으로 적혔다.",
          "마지막 빈칸은 아직 선택하지 않은 장소였다."
        ],
        links: [
          { label: "빈칸을 0번 출구로 정한다", to: "gate" },
          { label: "처음 승강장으로 선을 되돌린다", to: "platform" }
        ]
      },
      gate: {
        kicker: "ROUTE 04 / GATE",
        title: "출구 밖에는 같은 역이 있었다",
        body: [
          "개찰구를 통과하자 밝은 낮의 승강장이 나타났다. 사람들은 모두 막차를 기다리는 자세로 멈춰 있었다.",
          "맞은편 벽에서 0번 출구 표시가 다시 켜졌다. 이번에는 그 아래에 내 이름이 적혀 있었다."
        ],
        links: [
          { label: "이름 아래의 계단을 오른다", to: "stairs" },
          { label: "아직 움직이는 사람을 찾는다", to: "office" }
        ]
      }
    }
  }
];

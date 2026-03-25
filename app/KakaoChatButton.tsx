'use client';

export default function KakaoChatButton() {
  // 🔗 선생님의 진짜 오픈채팅방 링크가 이미 들어가 있을 것입니다.
  // 예시: const chatUrl = "https://open.kakao.com/o/s1234abc";
  const chatUrl = "http://pf.kakao.com/_klxmlX/chat"; // 여기에 실제 링크가 들어있어야 합니다.

  return (
    <a
      href={chatUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '25px',
        right: '25px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // --- 🛠️ 수정된 부분 시작 (동그라미 -> 타원형) ---
        // width: '60px' (기존 동그라미 크기 제거)
        height: '60px',        // 높이는 유지
        backgroundColor: '#FEE500', // 카카오 노란색
        borderRadius: '30px',   // 높이의 절반을 주어 타원형으로 만듦
        padding: '0 20px',      // 좌우 여백을 주어 글자 공간 확보
        gap: '10px',            // 아이콘과 글자 사이 간격
        // ------------------------------------------
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        cursor: 'pointer',
        textDecoration: 'none', // 링크 밑줄 제거
        transition: 'transform 0.2s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
    >
      {/* 1. 카카오톡 말풍선 아이콘 */}
      <svg width="28" height="28" viewBox="0 0 24 24" fill="#3A1D1D">
        <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.707 4.8 4.315 6.091l-.81 2.962a.225.225 0 0 0 .333.243l3.486-2.31c.224.02.45.03.676.03 4.97 0 9-3.185 9-7.115S16.97 3 12 3z" />
      </svg>

      {/* 2. ✅ 추가된 글자 부분 */}
      <span style={{
        color: '#3A1D1D',       // 아이콘과 같은 진한 갈색
        fontSize: '17px',       // 읽기 좋은 크기
        fontWeight: 'bold',     // 굵게
        whiteSpace: 'nowrap'    // 글자가 한 줄로 유지되도록
      }}>
        문의 상담
      </span>
    </a>
  );
}
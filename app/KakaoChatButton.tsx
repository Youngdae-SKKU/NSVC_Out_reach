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
        bottom: '20px',         // 화면 하단 여백도 살짝 줄였습니다 (25px -> 20px)
        right: '20px',          // 우측 여백도 살짝 줄였습니다 (25px -> 20px)
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
        // --- 🚀 컴팩트 수정 포인트 ---
        height: '46px',         // 버튼 높이를 대폭 줄였습니다 (60px -> 46px)
        backgroundColor: '#FEE500', 
        borderRadius: '23px',   // 높이의 절반으로 설정 (완전한 타원형 유지)
        padding: '0 16px',      // 좌우 여백을 줄였습니다 (20px -> 16px)
        gap: '6px',             // 아이콘과 글자 사이 간격을 좁혔습니다 (10px -> 6px)
        // ------------------------------------------
        
        boxShadow: '0 4px 15px rgba(0,0,0,0.15)', // 그림자도 살짝 더 가볍게 조정
        cursor: 'pointer',
        textDecoration: 'none', 
        transition: 'transform 0.2s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
    >
      {/* 1. 카카오톡 말풍선 아이콘 (크기 축소: 28 -> 22) */}
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#3A1D1D">
        <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.707 4.8 4.315 6.091l-.81 2.962a.225.225 0 0 0 .333.243l3.486-2.31c.224.02.45.03.676.03 4.97 0 9-3.185 9-7.115S16.97 3 12 3z" />
      </svg>

      {/* 2. ✅ 글자 부분 (크기 축소: 17px -> 14px) */}
      <span style={{
        color: '#3A1D1D',       
        fontSize: '14px',       // 글씨 크기를 컴팩트하게 줄였습니다
        fontWeight: 'bold',     
        whiteSpace: 'nowrap'    
      }}>
        문의 상담
      </span>
    </a>
  );
}
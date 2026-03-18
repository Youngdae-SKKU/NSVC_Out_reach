'use client';

export default function KakaoChatButton() {
  // 🔗 여기에 선생님의 오픈채팅방 링크를 넣어주세요!
  const chatUrl = "https://open.kakao.com/o/sdQeW2li"; 

  return (
    <a
      href={chatUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '60px',
        height: '60px',
        backgroundColor: '#FEE500', // 카카오 노란색
        borderRadius: '50%',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        cursor: 'pointer',
        transition: 'transform 0.2s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
    >
      {/* 카카오톡 아이콘 (SVG) */}
      <svg width="30" height="30" viewBox="0 0 24 24" fill="#3A1D1D">
        <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.707 4.8 4.315 6.091l-.81 2.962a.225.225 0 0 0 .333.243l3.486-2.31c.224.02.45.03.676.03 4.97 0 9-3.185 9-7.115S16.97 3 12 3z" />
      </svg>
    </a>
  );
}
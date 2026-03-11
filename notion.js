"use server";

const token = process.env.NOTION_TOKEN;

// 1. 등록 및 납부 현황 진단
export async function getPaymentStatus() {
  console.log("\n[디버그] --- 회비 데이터 가져오기 시작 ---");
  try {
    const dbId = process.env.NOTION_DATABASE_ID;
    console.log("[디버그] 1. 1번 표 DB 주소:", dbId ? "존재함" : "비어있음(에러)");

    const res = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    const data = await res.json();
    console.log("[디버그] 2. 노션 서버 응답 타입:", data.object);

    if (data.object === 'error') {
      console.log("[디버그] 🚨 노션 거절 사유:", data.message);
      return { total: 0, paidCount: 0, students: [] };
    }

    if (!data.results) {
      console.log("[디버그] 🚨 데이터(results)가 아예 없습니다.");
      return { total: 0, paidCount: 0, students: [] };
    }

    console.log(`[디버그] 3. 노션에서 읽어온 총 데이터 줄 수: ${data.results.length}줄`);

    const students = [];
    for (let i = 0; i < data.results.length; i++) {
      const page = data.results[i];
      const p = page.properties;
      
      // 극단적으로 안전한 데이터 추출 (에러 절대 안 남)
      let name = "이름없음";
      if (p["이름"] && p["이름"].rich_text && p["이름"].rich_text.length > 0) name = p["이름"].rich_text[0].plain_text;
      else if (p["이름"] && p["이름"].title && p["이름"].title.length > 0) name = p["이름"].title[0].plain_text;

      let isPaid = false;
      if (p["완납여부"] && typeof p["완납여부"].checkbox === 'boolean') isPaid = p["완납여부"].checkbox;

      let applyDate = "날짜없음";
      if (p["신청날짜"] && p["신청날짜"].date) applyDate = p["신청날짜"].date.start;

      let amount = 0;
      if (p["납부 금액"] && typeof p["납부 금액"].number === 'number') amount = p["납부 금액"].number;

      students.push({ id: page.id, name, isPaid, applyDate, amount });
    }

    console.log("[디버그] 4. 화면으로 보낼 최종 학생 수:", students.length);
    if (students.length > 0) {
      console.log("[디버그] 5. 첫 번째 학생 데이터 샘플:", students[0]);
    }

    const paidCount = students.filter(s => s.isPaid).length;
    return { total: students.length, paidCount, students };

  } catch (e) {
    console.log("[디버그] 🚨 코드 실행 중 치명적 에러 발생:", e.message);
    return { total: 0, paidCount: 0, students: [] };
  }
}

// 2. 공지사항 진단
export async function getNotices() {
  console.log("\n[디버그] --- 공지사항 데이터 가져오기 시작 ---");
  try {
    const dbId = process.env.NOTION_NOTICE_DATABASE_ID;
    const res = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    const data = await res.json();
    if (!data.results) return [];

    const notices = [];
    for (let i = 0; i < data.results.length; i++) {
      const p = data.results[i].properties;
      
      let title = "제목없음";
      if (p["제목"] && p["제목"].rich_text && p["제목"].rich_text.length > 0) title = p["제목"].rich_text[0].plain_text;
      else if (p["제목"] && p["제목"].title && p["제목"].title.length > 0) title = p["제목"].title[0].plain_text;

      let date = "";
      if (p["게시 날짜"] && p["게시 날짜"].date) date = p["게시 날짜"].date.start;

      let note = "";
      if (p["비고"] && p["비고"].rich_text && p["비고"].rich_text.length > 0) note = p["비고"].rich_text[0].plain_text;

      let isVisible = true;
      if (p["노출여부"] && typeof p["노출여부"].checkbox === 'boolean') isVisible = p["노출여부"].checkbox;

      notices.push({ id: data.results[i].id, title, date, note, isVisible });
    }
    return notices;
  } catch (e) {
    return [];
  }
}
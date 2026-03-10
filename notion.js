"use server"; // 이 한 줄이 마법의 지팡이입니다!
export async function getPaymentStatus() {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DATABASE_ID;

  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      next: { revalidate: 0 } // 실시간 데이터 갱신을 위해 캐시 방지
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`노션 API 응답 에러: ${errorData.message}`);
    }

    const data = await response.json();
    const results = data.results;
    
    const total = results.length;
    const paidCount = results.filter(
      (page) => page.properties["납부여부"]?.checkbox === true
    ).length;

    return { total, paidCount };
  } catch (error) {
    console.error("❌ 노션 연동 실패:", error.message);
    return { total: 0, paidCount: 0 };
  }
}
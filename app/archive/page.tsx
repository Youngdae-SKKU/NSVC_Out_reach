import fs from 'fs';
import path from 'path';
import Gallery from './Gallery';

// 🚀 서버에서 사진 폴더를 읽어오는 로봇 함수
function getImagesFromDir(subDir: string) {
  const dirPath = path.join(process.cwd(), 'public/images/archive', subDir);
  
  // 폴더가 없으면 빈 목록 반환
  if (!fs.existsSync(dirPath)) return [];

  // 폴더를 읽어서 이미지 파일만 걸러내고, 화면에 띄울 수 있는 주소로 변환
  return fs.readdirSync(dirPath)
    .filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
    .map(file => `/images/archive/${subDir}/${file}`);
}

export default function ArchivePage() {
  // 서버가 알아서 vol1, vol2 폴더 안의 모든 사진을 읽어옵니다.
  const firstOutreach = getImagesFromDir('vol1');
  const secondOutreach = getImagesFromDir('vol2');

  // 🎨 실제 화려한 디자인과 애니메이션은 Gallery.tsx 파일로 넘겨서 그립니다!
  return <Gallery firstOutreach={firstOutreach} secondOutreach={secondOutreach} />;
}
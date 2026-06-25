const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  "src/components/site/DevelopmentWorks.tsx",
  "src/components/site/News.tsx",
  "src/components/site/Hero.tsx",
  "src/components/site/Gallery.tsx",
  "src/app/news/page.tsx",
  "src/app/news/[id]/page.tsx",
  "src/app/gallery/page.tsx",
  "src/app/blog/page.tsx",
  "src/app/blog/[slug]/page.tsx"
];

filesToUpdate.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (!fs.existsSync(fullPath)) return;
  let content = fs.readFileSync(fullPath, 'utf8');

  const regex = /^(import { getMediaUrl } from "@\/lib\/utils";\r?\n)(["']use client["'];?\r?\n)/;
  const match = content.match(regex);
  
  if (match) {
    content = content.replace(match[0], match[2] + match[1]);
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Fixed ${file}`);
  }
});
console.log('Done.');

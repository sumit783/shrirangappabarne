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
  if (!fs.existsSync(fullPath)) {
    console.log(`File not found: ${fullPath}`);
    return;
  }
  let content = fs.readFileSync(fullPath, 'utf8');

  // Add import if not exists
  if (!content.includes('getMediaUrl')) {
    content = 'import { getMediaUrl } from "@/lib/utils";\n' + content;
  }

  // Replace `${API_BASE}${variable}` with getMediaUrl(variable)
  content = content.replace(/`\$\{API_BASE\}\$\{([^}]+)\}`/g, 'getMediaUrl($1)');
  
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Updated ${file}`);
});

console.log('Refactoring complete.');

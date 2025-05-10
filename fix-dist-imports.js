const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'packages/ui/dist/components');

try {
  // Get all .js files in the dist/components directory
  const distFiles = fs.readdirSync(distDir).filter(file => file.endsWith('.js'));

  let updatedCount = 0;

  distFiles.forEach(file => {
    const filePath = path.join(distDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace @/lib/utils with ../lib/utils
    const updatedContent = content.replace(/from\s+["']@\/lib\/utils["']/g, 'from "../lib/utils"');
    
    // Replace @/components/ with ./
    const finalContent = updatedContent.replace(/from\s+["']@\/components\/([^"']+)["']/g, 'from "./$1"');
    
    // Write back to file if changed
    if (content !== finalContent) {
      fs.writeFileSync(filePath, finalContent, 'utf8');
      updatedCount++;
      console.log(`Updated imports in ${file}`);
    }
  });

  console.log(`Updated ${updatedCount} compiled files.`);
} catch (error) {
  console.error('Error updating files:', error);
} 
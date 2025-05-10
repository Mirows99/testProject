const fs = require('fs');
const path = require('path');

// Update source files
const componentsDir = path.join(__dirname, 'packages/ui/src/components');

// Get all .tsx files in the components directory
const srcFiles = fs.readdirSync(componentsDir).filter(file => file.endsWith('.tsx'));

srcFiles.forEach(file => {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace import statements
  const updatedContent = content.replace(/import\s*{\s*cn\s*}\s*from\s*["']@\/lib\/utils["']/g, 'import { cn } from "../lib/utils"');
  
  // Write back to file if changed
  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Updated import in ${file}`);
  }
});

console.log('All source files processed.');

// Update compiled files
const distDir = path.join(__dirname, 'packages/ui/dist/components');

// Get all .js files in the dist/components directory
const distFiles = fs.readdirSync(distDir).filter(file => file.endsWith('.js'));

distFiles.forEach(file => {
  const filePath = path.join(distDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace import statements in compiled JS files
  const updatedContent = content.replace(/import\s*{\s*cn\s*}\s*from\s*["']@\/lib\/utils["']/g, 'import { cn } from "../lib/utils"');
  
  // Write back to file if changed
  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Updated import in compiled ${file}`);
  }
});

console.log('All compiled files processed.'); 
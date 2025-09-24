// Simple test to check if DataTable component compiles
const fs = require('fs');
const path = require('path');

  con
  const dataTablePath = path.join(__dirname, 'src', 'components', 'DataTable.tsx');
  const content = fs.readFileSync(dataTablePath, 'utf8');
  
  // Basic syntax checks
  const openTags = (content.match(/<[^/][^>]*>/g) || []).length;
  console.log(`Close tags: ${closeTags}`);
  const selfClosingTags = (content.match(/<[^>]*\/>/g) || []).length;
  
  console.log('Basic JSX syntax check:');
  console.log(`Open tags: ${openTags}`);
  console.log(`Close tags: ${closeTags}`);
  console.log(`Self-closing tags: ${selfClosingTags}`);
  console.log('Total effective open tags:', openTags - selfClosingTags);
} 
  if (openTags - selfClosingTags === closeTags) {

  } else {

  }

} catch (error) {
  console.error('Error checking file:', error.message);
}
#!/usr/bin/env node

/**
 * Dual Publishing Script
 *
 * Syncs blog posts from ./blog/blog to ../elroy/docs/blog/posts
 * and diagrams from ./static/diagrams to ../elroy/docs/blog/diagrams
 */

const fs = require('fs');
const path = require('path');

// Configuration
const SOURCE_BLOG_DIR = path.join(__dirname, 'blog');
const SOURCE_DIAGRAMS_DIR = path.join(__dirname, 'static', 'diagrams');
const TARGET_BLOG_DIR = path.join(__dirname, '..', 'elroy', 'docs', 'blog', 'posts');
const TARGET_DIAGRAMS_DIR = path.join(__dirname, '..', 'elroy', 'docs', 'blog', 'diagrams');

/**
 * Ensure a directory exists, creating it if necessary
 */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created directory: ${dir}`);
  }
}

/**
 * Copy a file from source to destination
 */
function copyFile(source, dest) {
  fs.copyFileSync(source, dest);
  console.log(`✅ Copied: ${path.basename(source)}`);
}

/**
 * Get all markdown files from a directory
 */
function getMarkdownFiles(dir) {
  if (!fs.existsSync(dir)) {
    console.warn(`⚠️  Directory not found: ${dir}`);
    return [];
  }

  return fs.readdirSync(dir)
    .filter(file => file.endsWith('.md'))
    .map(file => path.join(dir, file));
}

/**
 * Recursively copy directory contents
 */
function copyDirectory(source, dest) {
  if (!fs.existsSync(source)) {
    console.warn(`⚠️  Source directory not found: ${source}`);
    return;
  }

  ensureDir(dest);

  const entries = fs.readdirSync(source, { withFileTypes: true });
  let copiedCount = 0;

  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(sourcePath, destPath);
    } else {
      fs.copyFileSync(sourcePath, destPath);
      copiedCount++;
    }
  }

  if (copiedCount > 0) {
    console.log(`✅ Copied ${copiedCount} files from ${path.basename(source)}`);
  }
}

/**
 * Main dual publishing function
 */
function dualPublish() {
  console.log('🚀 Starting dual publish process...\n');

  // Ensure target directories exist
  ensureDir(TARGET_BLOG_DIR);
  ensureDir(TARGET_DIAGRAMS_DIR);

  // Copy blog posts
  console.log('📝 Publishing blog posts...');
  const blogPosts = getMarkdownFiles(SOURCE_BLOG_DIR);

  if (blogPosts.length === 0) {
    console.log('⚠️  No blog posts found to publish');
  } else {
    for (const postPath of blogPosts) {
      const fileName = path.basename(postPath);
      const destPath = path.join(TARGET_BLOG_DIR, fileName);
      copyFile(postPath, destPath);
    }
  }

  // Copy diagrams
  console.log('\n📊 Publishing diagrams...');
  copyDirectory(SOURCE_DIAGRAMS_DIR, TARGET_DIAGRAMS_DIR);

  console.log('\n✨ Dual publish complete!\n');
  console.log('📍 Published to:');
  console.log(`   Blog: ${TARGET_BLOG_DIR}`);
  console.log(`   Diagrams: ${TARGET_DIAGRAMS_DIR}`);
}

// Run the script
try {
  dualPublish();
} catch (error) {
  console.error('❌ Error during dual publish:', error.message);
  process.exit(1);
}

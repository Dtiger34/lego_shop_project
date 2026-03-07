#!/usr/bin/env node

/**
 * GLB Compression Script for Azure Deployment
 *
 * Install gltf-pipeline globally:
 * npm install -g gltf-pipeline
 *
 * Then run this script to compress all GLB files:
 * node scripts/compress-glb.js
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const publicDir = path.join(__dirname, "../public");
const glbFiles = fs.readdirSync(publicDir).filter((f) => f.endsWith(".glb"));

console.log(`\n🔧 GLB Compression Script`);
console.log(`📁 Found ${glbFiles.length} GLB files in ${publicDir}\n`);

if (glbFiles.length === 0) {
  console.log("No GLB files found. Skipping compression.");
  process.exit(0);
}

try {
  // Check if gltf-pipeline is installed
  execSync("gltf-pipeline --version", { stdio: "ignore" });
} catch (error) {
  console.error("❌ gltf-pipeline not installed.\n");
  console.log("Install it globally with:");
  console.log("  npm install -g gltf-pipeline\n");
  process.exit(1);
}

glbFiles.forEach((file) => {
  const inputPath = path.join(publicDir, file);
  const outputPath = path.join(
    publicDir,
    file.replace(".glb", "-compressed.glb"),
  );

  const inputSize = fs.statSync(inputPath).size;

  console.log(`📦 Compressing ${file}...`);

  try {
    execSync(`gltf-pipeline -i "${inputPath}" -o "${outputPath}" -d`, {
      stdio: "pipe",
    });

    const outputSize = fs.statSync(outputPath).size;
    const reduction = (((inputSize - outputSize) / inputSize) * 100).toFixed(1);

    console.log(`   ✅ Original: ${(inputSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(
      `   ✅ Compressed: ${(outputSize / 1024 / 1024).toFixed(2)} MB`,
    );
    console.log(`   ✅ Reduction: ${reduction}%\n`);

    // Update filename in code to use compressed version
    console.log(
      `   📝 Update your code to use "${file.replace(".glb", "-compressed.glb")}"`,
    );
  } catch (error) {
    console.error(`   ❌ Failed to compress ${file}:`, error.message);
  }
});

console.log("\n✨ Compression complete!");
console.log("Update your 3D view files to load the compressed versions:");
console.log('  loader.load("/khue_van_cac-compressed.glb", ...)');

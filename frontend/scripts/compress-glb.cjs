#!/usr/bin/env node

/**
 * GLB Compression Script for Azure Deployment
 * Uses Draco compression to reduce file sizes by 50-80%
 *
 * Run this script to compress all GLB files:
 * node scripts/compress-glb.cjs
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const publicDir = path.join(__dirname, "../public");
const glbFiles = fs.readdirSync(publicDir).filter((f) => f.endsWith(".glb"));

console.log(`\n🔧 GLB Compression with Draco`);
console.log(`📁 Found ${glbFiles.length} GLB files in ${publicDir}\n`);

if (glbFiles.length === 0) {
  console.log("No GLB files found. Skipping compression.");
  process.exit(0);
}

try {
  // Check if gltf-pipeline is installed
  execSync("gltf-pipeline --version", { stdio: "ignore" });
} catch (error) {
  console.error("❌ gltf-pipeline not installed.");
  console.log("Install it globally with:");
  console.log("  npm install -g gltf-pipeline\n");
  process.exit(1);
}

let successCount = 0;
let totalBefore = 0;
let totalAfter = 0;

glbFiles.forEach((file) => {
  const inputPath = path.join(publicDir, file);
  const outputPath = path.join(
    publicDir,
    file.replace(".glb", "-compressed.glb"),
  );

  const inputSize = fs.statSync(inputPath).size;
  totalBefore += inputSize;

  console.log(`📦 Compressing ${file}...`);

  try {
    execSync(`gltf-pipeline -i "${inputPath}" -o "${outputPath}" -d`, {
      stdio: "pipe",
    });

    const outputSize = fs.statSync(outputPath).size;
    totalAfter += outputSize;
    const reduction = (((inputSize - outputSize) / inputSize) * 100).toFixed(1);

    console.log(`   ✅ Original: ${(inputSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(
      `   ✅ Compressed: ${(outputSize / 1024 / 1024).toFixed(2)} MB`,
    );
    console.log(`   ✅ Reduction: ${reduction}%\n`);

    successCount++;
  } catch (error) {
    console.error(`   ❌ Failed to compress ${file}:`, error.message);
    console.log();
  }
});

console.log("\n✨ Compression complete!");
console.log(`\n📊 Summary:`);
console.log(`   Files compressed: ${successCount}/${glbFiles.length}`);
console.log(`   Total before: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
console.log(`   Total after: ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
const totalReduction = (
  ((totalBefore - totalAfter) / totalBefore) *
  100
).toFixed(1);
console.log(`   Total reduction: ${totalReduction}%`);

console.log(`\n💡 Next steps:`);
console.log(`1. Verify the -compressed.glb files were created successfully`);
console.log(`2. Update your 3D viewer code to load the compressed versions`);
console.log(`3. The loaderOptimizer will auto-detect and use Draco decoder`);
console.log(`4. Deploy to Azure for up to 80% network size reduction\n`);

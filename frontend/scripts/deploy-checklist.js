#!/usr/bin/env node

/**
 * Pre-Deployment Optimization Checklist for Azure
 * Run this before deploying to make sure all optimizations are in place
 */

const fs = require("fs");
const path = require("path");

const checks = [];

function check(name, condition, details = "") {
  checks.push({ name, passed: condition, details });
}

console.log(
  "\n╔════════════════════════════════════════════════════════════════╗",
);
console.log(
  "║  🚀 Azure Deployment Pre-Flight Checklist                       ║",
);
console.log(
  "╚════════════════════════════════════════════════════════════════╝\n",
);

// 1. Check for loaderOptimizer utility
const loaderPath = path.join(__dirname, "../src/utils/loaderOptimizer.js");
check(
  "loaderOptimizer.js utility exists",
  fs.existsSync(loaderPath),
  loaderPath,
);

// 2. Check for web.config
const webConfigPath = path.join(__dirname, "../../frontend/web.config");
check(
  "web.config (Azure IIS config) exists",
  fs.existsSync(webConfigPath),
  webConfigPath,
);

// 3. Check package.json for dependencies
const packagePath = path.join(__dirname, "../package.json");
const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf-8"));
check(
  "three.js dependency installed",
  !!packageJson.dependencies.three,
  `Version: ${packageJson.dependencies.three}`,
);

check(
  "react-router-dom dependency installed",
  !!packageJson.dependencies["react-router-dom"],
  `Version: ${packageJson.dependencies["react-router-dom"]}`,
);

// 4. Check for 3D model files
const publicDir = path.join(__dirname, "../public");
const glbFiles = fs
  .readdirSync(publicDir)
  .filter((f) => f.endsWith(".glb"))
  .slice(0, 10);
check(
  "3D model files (.glb) exist",
  glbFiles.length > 0,
  `Found ${glbFiles.length} GLB files`,
);

// 5. Check 3D viewer components are updated
const viewersToCheck = [
  "KhueVanCac3DView.jsx",
  "NgoMonHue3DView.jsx",
  "DenNgocSon3DView.jsx",
  "CauTheHuc3DView.jsx",
];

const componentsDir = path.join(__dirname, "../src/pages/view3d");
viewersToCheck.forEach((viewer) => {
  const viewerPath = path.join(componentsDir, viewer);
  if (fs.existsSync(viewerPath)) {
    const content = fs.readFileSync(viewerPath, "utf-8");
    const isOptimized =
      content.includes("loaderOptimizer") || content.includes("loadGLTFModel");
    check(
      `${viewer} uses optimized loader`,
      isOptimized,
      isOptimized ? "✓ Optimized" : "✗ Needs update",
    );
  }
});

// 6. Check build script
check(
  "Build script defined in package.json",
  !!packageJson.scripts.build,
  `Command: ${packageJson.scripts.build}`,
);

// 7. Check for vite.config.js
const viteConfigPath = path.join(__dirname, "../vite.config.js");
check("vite.config.js exists", fs.existsSync(viteConfigPath), viteConfigPath);

// 8. Check AZURE_DEPLOYMENT.md exists
const deploymentDocPath = path.join(__dirname, "../../AZURE_DEPLOYMENT.md");
check(
  "AZURE_DEPLOYMENT.md documentation exists",
  fs.existsSync(deploymentDocPath),
  "Reference guide for deployment",
);

// 9. Check for .env or environment config
const envPath = path.join(__dirname, "../.env");
const envExamplePath = path.join(__dirname, "../.env.example");
check(
  ".env file configured (or .env.example present)",
  fs.existsSync(envPath) || fs.existsSync(envExamplePath),
  fs.existsSync(envPath) ? ".env found" : ".env.example found (configure .env)",
);

// 10. Check public folder structure
const hasCss = fs.readdirSync(publicDir).some((f) => f.endsWith(".css"));
const hasImages = fs
  .readdirSync(publicDir)
  .some((f) => f.match(/\.(jpg|jpeg|png|webp|svg)$/i));
check(
  "Static assets in public folder",
  hasImages || hasCss,
  `Assets: CSS=${hasCss}, Images=${hasImages}`,
);

// Print results
console.log("📋 Results:\n");
let passCount = 0;
checks.forEach(({ name, passed, details }) => {
  const icon = passed ? "✅" : "❌";
  console.log(`${icon} ${name}`);
  if (details) console.log(`   ${details}`);
  if (passed) passCount++;
});

console.log(`\n📊 Score: ${passCount}/${checks.length} checks passed\n`);

if (passCount === checks.length) {
  console.log("✨ Ready for deployment!\n");
  console.log("📝 Next steps:");
  console.log("  1. Run: npm run build");
  console.log("  2. Deploy dist/ folder to Azure App Service");
  console.log("  3. Start with: npm run dev (for local testing)");
  console.log("  4. Deploy: Use Azure CLI or GitHub Actions\n");
} else {
  console.log("⚠️  Please address the failed checks before deploying.\n");
  console.log("📖 Read AZURE_DEPLOYMENT.md for optimization guide.\n");
  process.exit(1);
}

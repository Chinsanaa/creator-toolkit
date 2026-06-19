#!/usr/bin/env bash
# Generate EarnioNative.xcodeproj from project.yml (requires XcodeGen).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT/EarnioNative"

if ! command -v xcodegen >/dev/null 2>&1; then
  echo "XcodeGen not found. Install: brew install xcodegen"
  echo ""
  echo "Manual setup:"
  echo "  1. Xcode → File → New → Project → iOS App"
  echo "  2. Name: EarnioNative, Interface: SwiftUI"
  echo "  3. File → Add Package Dependencies → Add Local → select ios/ folder"
  echo "  4. Replace app entry with EarnioNative/EarnioNativeApp.swift"
  exit 1
fi

xcodegen generate
echo "Done. Open: open EarnioNative/EarnioNative.xcodeproj"

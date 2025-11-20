#!/bin/bash
set -e
cd "/Users/zeeshan/Desktop/FOUNDATIONAL API UI - 1"

echo "=== Checking git status ==="
git status

echo ""
echo "=== Adding all changes ==="
git add -A

echo ""
echo "=== Committing changes ==="
git commit -m "Complete update: Remove Pricing & Utility API, add Bitcoin API, update README, fix navigation" || echo "No changes to commit"

echo ""
echo "=== Pushing to GitHub ==="
git push origin main

echo ""
echo "✅ SUCCESS! Changes pushed to GitHub."
echo "Vercel should auto-deploy in a few moments."


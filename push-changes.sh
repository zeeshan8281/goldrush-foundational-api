#!/bin/bash
cd "/Users/zeeshan/Desktop/FOUNDATIONAL API UI - 1"
echo "Adding all changes..."
git add -A
echo "Committing changes..."
git commit -m "Update README: Fix API categories (6 not 10), update all endpoint lists and structure"
echo "Pushing to GitHub..."
git push origin main
echo "Done! Check GitHub and Vercel should auto-deploy."


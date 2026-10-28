#!/usr/bin/env bash
# Creates the feat/refunds-and-webhooks branch for the review lab and pushes it to your copy.
set -euo pipefail
cd "$(dirname "$0")/.."
git checkout -b feat/refunds-and-webhooks
git apply review-pr/refunds-and-webhooks.patch
git add src test
git commit -q -m "Add refunds API and processor webhooks"
git push -u origin feat/refunds-and-webhooks
git checkout -q main
echo
echo "Branch pushed. Now open the pull request from the link on the lab page."

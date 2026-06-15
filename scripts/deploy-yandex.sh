#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

npm run build

: "${YC_BUCKET_NAME:?Set YC_BUCKET_NAME to your Object Storage bucket name}"

ENDPOINT="${YC_S3_ENDPOINT:-https://storage.yandexcloud.net}"

aws s3 sync dist/ "s3://${YC_BUCKET_NAME}/" \
  --endpoint-url="$ENDPOINT" \
  --delete \
  --acl public-read \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "index.html"

aws s3 cp dist/index.html "s3://${YC_BUCKET_NAME}/index.html" \
  --endpoint-url="$ENDPOINT" \
  --acl public-read \
  --cache-control "no-cache, no-store, must-revalidate" \
  --content-type "text/html; charset=utf-8"

echo "Deployed to s3://${YC_BUCKET_NAME}/"

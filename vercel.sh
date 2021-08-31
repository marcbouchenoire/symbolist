#!/bin/bash

echo "$VERCEL_GIT_COMMIT_AUTHOR_LOGIN"

if [[ "$VERCEL_GIT_COMMIT_AUTHOR_LOGIN" == "dependabot"  ]]; then
  exit 0;
else
  exit 1;
fi
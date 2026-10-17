#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "${BASH_SOURCE[0]}")"
node -e 'if (Number(process.versions.node.split(".")[0]) < 22) throw new Error("INDI tests require Node.js 22 or newer")'
npm ci --ignore-scripts --no-audit --no-fund
npm test

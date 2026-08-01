#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export DEPLOY_SITE_KEY="homeguard"

exec "$SCRIPT_DIR/_deploy-site.sh" "$@"

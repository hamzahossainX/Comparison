#!/usr/bin/env bash
#
# Build all three sites exactly as the GitHub Pages workflow does and serve them locally
# under the same subpaths, so what you see here is what deploys.
#
#   ./scripts/preview.sh          build everything, then serve on :8099
#   ./scripts/preview.sh --serve  skip the builds, just serve what is already in .site/
#
# Then open http://localhost:8099/Comparison/
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SITE="$ROOT/.site"
BASE="/Comparison"
PORT="${PORT:-8099}"

build() {
  local dir="$1" base_path="$2" out="$3" dest="$4"
  echo "── building $dir  (base $base_path)"
  cd "$ROOT/$dir"
  [ -d node_modules ] || npm ci
  rm -rf "$out"
  PAGES_BASE_PATH="$base_path" npm run build
  rm -rf "${SITE:?}$BASE/$dest"
  mkdir -p "$SITE$BASE"
  cp -r "$out" "$SITE$BASE/$dest"
  cd "$ROOT"
}

if [ "${1:-}" != "--serve" ]; then
  rm -rf "$SITE"
  mkdir -p "$SITE$BASE"
  build Claude  "$BASE/claude"   out  claude
  build KIMI-K3 "$BASE/kimi-k3"  out  kimi-k3
  build Codex   "$BASE/codex/"   dist codex
  cp "$ROOT/docs/landing/index.html" "$SITE$BASE/index.html"
  cp -r "$ROOT/docs/previews" "$SITE$BASE/previews"
  touch "$SITE/.nojekyll"

  echo
  echo "── verifying asset URLs are subpath-relative"
  for p in claude kimi-k3 codex; do
    if grep -qE '(src|href)="/(_next|assets)/' "$SITE$BASE/$p/index.html"; then
      echo "  LEAK  $p has root-absolute asset URLs"; exit 1
    fi
    echo "  ok    $p"
  done
fi

echo
echo "── serving $SITE on http://localhost:$PORT$BASE/"
echo "     landing   http://localhost:$PORT$BASE/"
echo "     claude    http://localhost:$PORT$BASE/claude/"
echo "     kimi-k3   http://localhost:$PORT$BASE/kimi-k3/"
echo "     codex     http://localhost:$PORT$BASE/codex/"
echo
cd "$SITE" && python3 -m http.server "$PORT" --bind 127.0.0.1

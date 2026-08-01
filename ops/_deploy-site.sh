#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

SERVER="34.96.169.250"
SSH_USER="ubuntu"
KEY_PATH="$SCRIPT_DIR/34.96.169.250.pem"
SELECTED_SITE="${DEPLOY_SITE_KEY:-}"
SKIP_BUILD=false
DRY_RUN=false

readonly RESET=$'\033[0m'
readonly CYAN=$'\033[0;36m'
readonly GREEN=$'\033[0;32m'
readonly YELLOW=$'\033[1;33m'
readonly RED=$'\033[0;31m'
readonly GRAY=$'\033[0;90m'

print_color() {
  local color="$1"
  shift
  printf '%s\n' "${color}$*${RESET}"
}

usage() {
  cat <<'EOF'
Publish one selected static site.

Usage:
  ./deploy-watermark.sh [options]
  ./deploy-cleaner.sh [options]
  ./deploy-homeguard.sh [options]

Options:
  --skip-build         use the existing dist directories
  --dry-run            print steps without building, deleting, or uploading
  --server HOST        SSH/Nginx server (default: 34.96.169.250)
  --user USER          SSH user (default: ubuntu)
  --key PATH           SSH private key (default: ops/34.96.169.250.pem)
  -h, --help           show this help

Examples:
  ./deploy-watermark.sh --dry-run
  ./deploy-cleaner.sh --skip-build
  ./deploy-homeguard.sh --dry-run
EOF
}

require_value() {
  local option="$1"
  local value="${2:-}"

  if [[ -z "$value" || "$value" == --* ]]; then
    print_color "$RED" "Missing value: $option"
    usage
    exit 2
  fi
}

while (( $# > 0 )); do
  case "$1" in
    --skip-build)
      SKIP_BUILD=true
      shift
      ;;
    --dry-run|--what-if)
      DRY_RUN=true
      shift
      ;;
    --server)
      require_value "$1" "${2:-}"
      SERVER="$2"
      shift 2
      ;;
    --user)
      require_value "$1" "${2:-}"
      SSH_USER="$2"
      shift 2
      ;;
    --key)
      require_value "$1" "${2:-}"
      KEY_PATH="$2"
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      print_color "$RED" "Unknown option: $1"
      usage
      exit 2
      ;;
  esac
done

case "$SELECTED_SITE" in
  watermark|cleaner|homeguard)
    SITES=("$SELECTED_SITE")
    ;;
  *)
    print_color "$RED" "Invalid site: $SELECTED_SITE"
    exit 2
    ;;
esac

if [[ ! "$SERVER" =~ ^[A-Za-z0-9.-]+$ ]]; then
  print_color "$RED" "Unsafe server value: $SERVER"
  exit 2
fi

if [[ ! "$SSH_USER" =~ ^[A-Za-z_][A-Za-z0-9_-]*$ ]]; then
  print_color "$RED" "Unsafe SSH user: $SSH_USER"
  exit 2
fi

if [[ ! -f "$KEY_PATH" ]]; then
  print_color "$RED" "SSH key does not exist: $KEY_PATH"
  exit 1
fi

for command_name in ssh scp curl; do
  if ! command -v "$command_name" >/dev/null 2>&1; then
    print_color "$RED" "Required command not found: $command_name"
    exit 1
  fi
done

if ! $DRY_RUN; then
  chmod 600 "$KEY_PATH"
fi

TARGET="${SSH_USER}@${SERVER}"
SSH_OPTS=(-i "$KEY_PATH" -o BatchMode=yes -o StrictHostKeyChecking=accept-new)

configure_site() {
  case "$1" in
    watermark)
      SITE_NAME="WATERMARK"
      PROJECT_DIR="$REPO_DIR/watermarkinspector"
      REMOTE_DIR="/var/www/watermarkinspector"
      PRIMARY_DOMAIN="watermarkinspector.erjinyi.com"
      ORIGIN_DOMAIN="watermarkinspector.gcsa.org"
      ROUTES=(/ /privacy /terms /support)
      ;;
    cleaner)
      SITE_NAME="CLEANER"
      PROJECT_DIR="$REPO_DIR/cleaner"
      REMOTE_DIR="/var/www/cleaner"
      PRIMARY_DOMAIN="cleaner.erjinyi.com"
      ORIGIN_DOMAIN="cleaner.gcsa.org"
      ROUTES=(/)
      ;;
    homeguard)
      SITE_NAME="HOME GUARD"
      PROJECT_DIR="$REPO_DIR/homeguard"
      REMOTE_DIR="/var/www/homeguard"
      PRIMARY_DOMAIN="homeguard.erjinyi.com"
      ORIGIN_DOMAIN="homeguard.gcsa.org"
      ROUTES=(/ /privacy /terms /support)
      ;;
  esac

  DIST_DIR="$PROJECT_DIR/dist"
}

assert_safe_remote_path() {
  local path="$1"
  local relative_path part_count

  if [[ -z "$path" || "$path" != /* || "$path" == *"'"* || "$path" == *$'\n'* || "$path" == *$'\r'* ]]; then
    print_color "$RED" "Remote path must be a safe absolute path: $path"
    exit 2
  fi

  case "$path" in
    /|/var|/var/www|/home|/usr|/etc|/opt|/tmp)
      print_color "$RED" "Remote path is too broad: $path"
      exit 2
      ;;
  esac

  relative_path="${path#/}"
  IFS='/' read -r -a path_parts <<< "$relative_path"
  part_count="${#path_parts[@]}"
  if (( part_count < 3 )); then
    print_color "$RED" "Remote path must identify a concrete site directory: $path"
    exit 2
  fi
}

run_remote() {
  local remote_command="$1"

  print_color "$GRAY" "    ssh -> $TARGET"
  if $DRY_RUN; then
    printf '%s\n' "    $remote_command"
    return
  fi

  ssh "${SSH_OPTS[@]}" "$TARGET" "sudo bash -lc $(printf '%q' "$remote_command")"
}

assert_static_output() {
  if [[ ! -f "$DIST_DIR/index.html" ]]; then
    print_color "$RED" "Static entry was not generated: $DIST_DIR/index.html"
    exit 1
  fi
  if [[ ! -d "$DIST_DIR/assets" ]]; then
    print_color "$RED" "Static assets were not generated: $DIST_DIR/assets"
    exit 1
  fi
  if [[ -z "$(find "$DIST_DIR/assets" -type f -print -quit)" ]]; then
    print_color "$RED" "Static assets directory is empty: $DIST_DIR/assets"
    exit 1
  fi
}

build_site() {
  if [[ ! -f "$PROJECT_DIR/package.json" ]]; then
    print_color "$RED" "package.json does not exist: $PROJECT_DIR/package.json"
    exit 1
  fi

  print_color "$CYAN" "[$SITE_NAME] Build"
  if $SKIP_BUILD; then
    print_color "$GRAY" "    Build skipped; validating existing dist"
    assert_static_output
    return
  fi

  if $DRY_RUN; then
    printf '%s\n' "    cd $PROJECT_DIR"
    printf '%s\n' "    yarn install --immutable (only when node_modules is missing)"
    printf '%s\n' "    yarn build"
    return
  fi

  cd "$PROJECT_DIR"
  if [[ ! -d "$PROJECT_DIR/node_modules" ]]; then
    if ! command -v yarn >/dev/null 2>&1; then
      print_color "$RED" "yarn is required because node_modules is missing"
      exit 1
    fi
    printf '%s\n' "    yarn install --immutable"
    yarn install --immutable
  fi

  printf '%s\n' "    yarn build"
  yarn build
  assert_static_output
}

upload_static_files() {
  local item base_name upload_count=0

  shopt -s dotglob nullglob
  for item in "$DIST_DIR"/*; do
    base_name="$(basename "$item")"
    case "$base_name" in
      .openai|server)
        continue
        ;;
    esac

    upload_count=$((upload_count + 1))
    if $DRY_RUN; then
      printf '%s\n' "    scp -r $item ${TARGET}:${REMOTE_DIR}/"
    else
      scp "${SSH_OPTS[@]}" -r "$item" "${TARGET}:${REMOTE_DIR}/"
    fi
  done
  shopt -u dotglob nullglob

  if (( upload_count == 0 )) && ! $DRY_RUN; then
    print_color "$RED" "No client files available to upload: $DIST_DIR"
    exit 1
  fi
}

publish_site() {
  local route primary_url origin_url

  assert_safe_remote_path "$REMOTE_DIR"

  print_color "$CYAN" "[$SITE_NAME] Clear remote directory"
  run_remote "mkdir -p '$REMOTE_DIR' && find '$REMOTE_DIR' -mindepth 1 -maxdepth 1 -exec rm -rf {} +"
  run_remote "chown -R '$SSH_USER:$SSH_USER' '$REMOTE_DIR'"

  print_color "$CYAN" "[$SITE_NAME] Upload static files"
  upload_static_files
  run_remote "chown -R www-data:www-data '$REMOTE_DIR' && find '$REMOTE_DIR' -type d -exec chmod 755 {} + && find '$REMOTE_DIR' -type f -exec chmod 644 {} +"

  print_color "$CYAN" "[$SITE_NAME] Verify routes"
  for route in "${ROUTES[@]}"; do
    primary_url="https://${PRIMARY_DOMAIN}${route}"
    origin_url="http://${ORIGIN_DOMAIN}${route}"
    print_color "$GRAY" "    GET $primary_url -> $SERVER"
    print_color "$GRAY" "    GET $origin_url -> $SERVER"

    if ! $DRY_RUN; then
      curl --fail --silent --show-error --noproxy '*' --resolve "${PRIMARY_DOMAIN}:443:${SERVER}" "$primary_url" --output /dev/null
      curl --fail --silent --show-error --noproxy '*' --resolve "${ORIGIN_DOMAIN}:80:${SERVER}" "$origin_url" --output /dev/null
    fi
  done
}

print_color "$YELLOW" "========================================"
print_color "$YELLOW" " Static site deployment -> $TARGET"
print_color "$YELLOW" " Site:  $SELECTED_SITE"
print_color "$YELLOW" " Mode:  $(if $DRY_RUN; then printf 'dry-run'; else printf 'publish'; fi)"
print_color "$YELLOW" "========================================"

for site_key in "${SITES[@]}"; do
  printf '\n'
  configure_site "$site_key"
  build_site
  publish_site
done

printf '\n'
print_color "$GREEN" "========================================"
if $DRY_RUN; then
  print_color "$GREEN" " Dry run completed; no remote changes were made"
else
  print_color "$GREEN" " Site deployed successfully"
fi
print_color "$GREEN" "========================================"

FROM mcr.microsoft.com/devcontainers/javascript-node:22

# 1. Enable Corepack. Fetch version defined in package.json
RUN corepack enable

# 2. Set the pnpm store directory
RUN pnpm config set store-dir /home/node/.local/share/pnpm/store

# 3. Install browser dependencies for Playwright
RUN npx playwright install-deps
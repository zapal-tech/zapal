FROM mcr.microsoft.com/devcontainers/typescript-node:20-bookworm

RUN usermod -l zapal node
RUN usermod -d /home/zapal -m zapal
RUN groupmod -n zapal node
RUN mv /etc/sudoers.d/node /etc/sudoers.d/zapal

# Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive && apt-get -y install --no-install-recommends <your-package-list-here>

# Setup SQLite local database
RUN apt update
RUN apt install sqlite3 -y

# Install pnpm
RUN su zapal -c "npm i -g pnpm"
RUN su zapal -c 'echo -e "# pnpm\nexport PNPM_HOME=\"/home/$(whoami)/.local/share/pnpm\"\ncase \":$PATH:\" in\n  *\":/home/$(whoami)/.local/share/pnpm:\"*) ;;\n  *) export PATH=\"/home/$(whoami)/.local/share/pnpm:$PATH\" ;;\nesac\n#pnpm end" >> ~/.zshrc'

# Install Turbo
RUN su zapal -c "PNPM_HOME=/home/zapal/.local/share/pnpm PATH=/home/zapal/.local/share/pnpm:$PATH pnpm i -g turbo"

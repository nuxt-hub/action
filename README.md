# NuxtHub GitHub Action

![CI](https://github.com/actions/typescript-action/actions/workflows/ci.yml/badge.svg)
[![CodeQL](https://github.com/actions/typescript-action/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/codeql-analysis.yml)

Automatically deploy your Nuxt app to NuxtHub using GitHub Actions ☁️🚀

## 📃 Example workflow

```yaml
# .github/workflows/nuxt-hub.yml
name: Deploy to NuxtHub
on: push

jobs:
  deploy:
    name: "Deploy to NuxtHub"
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write

    steps:
      - uses: actions/checkout@v4

      - name: Install pnpm
        uses: pnpm/action-setup@v4

      - name: Install Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Build site
        run: pnpm run build

      - name: Deploy to NuxtHub
        uses: nuxt-hub/action@v1
```

## 🧾 Outputs

This action provides the following outputs that you can use in subsequent workflow steps:

- **`environment`**
  The environment of the deployment (e.g. production, preview).

- **`deployment-url`**
  The URL of the deployment. For preview environments, it links to the deployment of the commit.

  Examples:
  - https://abcdefg.example.nuxt.dev (main)
  - https://abcdefg.example.pages.dev (feat/example)

- **`branch-url`**
  The permanent URL for the current branch deployment.

  Examples:
  - https://example.nuxt.dev (main)
  - https://feat-example.example.pages.dev (feat/example)

## 💚 Contributing

```bash
# Install dependencies
pnpm install

# Package the TypeScript for distribution
pnpm run bundle
```

### Development

1. Update `src/`
1. Format, test, and build the action

   ```bash
   pnpm run bundle
   ```

   > It will run [`unbuild`](https://github.com/unjs/unbuild)
   > to build the final JavaScript action code with all dependencies included.

1. (Optional) Test the action locally

   The [`@github/local-action`](https://github.com/github/local-action) utility
   can be used to test your action locally. It is a simple command-line tool
   that "stubs" (or simulates) the GitHub Actions Toolkit. This way, you can run
   your TypeScript action locally without having to commit and push your changes
   to a repository.

   The `local-action` utility can be run in the following ways:

   - Visual Studio Code Debugger

     Make sure to review and, if needed, update
     [`.vscode/launch.json`](./.vscode/launch.json)

   - Terminal/Command Prompt

     ```bash
     # pnpm local-action <action-yaml-path> <entrypoint> <dotenv-file>
     pnpm local-action . src/main.ts .env
     ```

   You can provide a `.env` file to the `local-action` CLI to set environment
   variables used by the GitHub Actions Toolkit. For example, setting inputs and
   event payload data used by your action. For more information, see the example
   file, [`.env.example`](./.env.example), and the
   [GitHub Actions Documentation](https://docs.github.com/en/actions/learn-github-actions/variables#default-environment-variables).


### Publishing a New Release

This project includes a helper script, [`script/release`](./script/release)
designed to streamline the process of tagging and pushing new releases for
GitHub Actions.

GitHub Actions allows users to select a specific version of the action to use,
based on release tags. This script performs the following steps:

1. **Retrieving the latest release tag:** The script starts by fetching the most
   recent SemVer release tag of the current branch, by looking at the local data
   available in your repository.
1. **Prompting for a new release tag:** The user is then prompted to enter a new
   release tag. To assist with this, the script displays the tag retrieved in
   the previous step, and validates the format of the inputted tag (vX.X.X). The
   user is also reminded to update the version field in package.json.
1. **Tagging the new release:** The script then tags a new release and syncs the
   separate major tag (e.g. v1, v2) with the new release tag (e.g. v1.0.0,
   v2.1.2). When the user is creating a new major release, the script
   auto-detects this and creates a `releases/v#` branch for the previous major
   version.
1. **Pushing changes to remote:** Finally, the script pushes the necessary
   commits, tags and branches to the remote repository. From here, you will need
   to create a new release in GitHub so users can easily reference the new tags
   in their workflows.

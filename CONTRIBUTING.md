# Contributing to IIITD PYQs Website

Thank you for your interest in contributing to the IIITD PYQs website! We welcome contributions from developers of all skill levels. To ensure a smooth, professional, and efficient collaboration process, please follow these guidelines.

---

## 🛠️ Local Development Setup

1. **Fork the Repository**
   Fork the repository on GitHub to your own account by clicking the "Fork" button at the top-right of the [pyq-iiitd repository](https://github.com/Keshav-Chaudhary/pyq-iiitd).

2. **Clone Your Fork**
   Clone your fork locally:
   ```bash
   git clone https://github.com/<your-username>/pyq-iiitd.git
   cd pyq-iiitd
   ```

3. **Install Dependencies**
   Install the project dependencies using npm:
   ```bash
   npm install
   ```

4. **Run the Development Server**
   Start the local Vite development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## 🌿 Branching Strategy

We use a standard branching naming convention to keep track of changes:

*   **Features:** `feature/your-feature-name` (e.g., `feature/analytics-export`)
*   **Bug Fixes:** `bugfix/issue-description` (e.g., `bugfix/mobile-menu-overlap`)
*   **Documentation:** `docs/document-type` (e.g., `docs/readme-screenshots`)
*   **Chore / Refactoring:** `chore/refactor-name` (e.g., `chore/cleanup-unused-assets`)

Before starting work, create your branch from the `main` branch:
```bash
git checkout -b feature/your-feature-name
```

---

## 💬 Commit Message Standards

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for structured, clean, and easily parseable commit history. Please write your commit messages in the following format:

```text
<type>(<scope>): <short summary>

[optional body]
```

### Allowed Types:
*   `feat`: A new user-facing feature.
*   `fix`: A bug fix.
*   `docs`: Documentation updates (e.g., README, comments).
*   `style`: Formatting, missing semi-colons, styling changes (no logic changes).
*   `refactor`: Code changes that neither fix a bug nor add a feature.
*   `test`: Adding missing tests or correcting existing tests.
*   `chore`: Internal chores, build tools, dependency updates.

### Examples:
*   `feat(analytics): add file distribution chart`
*   `fix(mobile): resolve menu overlapping on small screens`
*   `docs(readme): add custom domain deployment instructions`

---

## 🧪 Verification Before Pushing

Before pushing your changes to your fork, make sure your code builds successfully and has no lint issues:

```bash
# Run linting check
npm run lint

# Build the project locally
npm run build
```

Verify that the build completes successfully and the output directory (`dist`) is populated without errors.

---

## 🚀 Creating a Pull Request (PR)

1. **Push your branch to your GitHub fork:**
   ```bash
   git push origin feature/your-feature-name
   ```
2. **Open the PR:**
   Go to the original `pyq-iiitd` repository on GitHub. You should see a prompt to open a Pull Request from your branch.
3. **Fill out the PR Template:**
   *   **Title:** Summarize your changes using conventional prefixing (e.g., `feat: Add analytics export button`).
   *   **Description:** Detail what changes you made, why they were needed, and how you verified them.
   *   **Screenshots/Recordings:** For any UI changes, please attach desktop and mobile screenshots or screen recordings to help us review.
4. **Link Issues:** If your PR fixes a specific open issue, link it in the description using `Fixes #<issue-number>`.

---

Thank you again for contributing to the IIITD community! If you have questions or need assistance, feel free to open a Discussion on GitHub.

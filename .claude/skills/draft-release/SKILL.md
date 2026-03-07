---
name: draft-release
description: Draft and create a new GitHub release for this Chrome extension. Use this skill whenever the user wants to release a new version, bump the version, create a release, publish to Chrome Web Store, tag a release, or generate a changelog. Also use when the user mentions shipping, cutting a release, or preparing a new version.
---

# Draft Release

Automate the full release flow for the Default Account+ for Google Chrome extension: version bump, changelog generation, git tagging, and GitHub release creation. Publishing the GitHub release triggers the Chrome Web Store upload via CI.

## Context

- Repo: `badrisnarayanan/default.wtf` on GitHub
- Extension versions live in two manifest files that must stay in sync: `manifest.json` (Chrome MV3) and `manifest_firefox.json` (Firefox MV2)
- The `.github/workflows/publish-chrome.yml` workflow triggers on `release: [published]` — creating the GitHub release is what kicks off the Chrome Web Store upload
- Version format is `X.Y.Z` (semver without `v` prefix). Git tags and release titles use the `v` prefix: `vX.Y.Z`

## Release Flow

### Step 1: Gather current state

Read the current version from `manifest.json` (the `"version"` field), then check git state:

```bash
git describe --tags --abbrev=0 2>/dev/null || echo "no-tags"
git log $(git describe --tags --abbrev=0 2>/dev/null || git rev-list --max-parents=0 HEAD)..HEAD --oneline
```

If there are no commits since the last tag, tell the user there's nothing new to release and stop.

### Step 2: Choose version bump

Ask the user which bump type they want (using AskUserQuestion):
- **Patch** (e.g. 2.1.0 → 2.1.1) — bug fixes, small tweaks
- **Minor** (e.g. 2.1.0 → 2.2.0) — new features, new Google services added
- **Major** (e.g. 2.1.0 → 3.0.0) — breaking or architectural changes

If the user already specified a version or bump type in their message, skip asking and use it directly.

Calculate the new version. Verify it's higher than the current one.

### Step 3: Generate release notes

Categorize commits since the last tag by scanning their messages (case-insensitive):

| Category | Matches |
|---|---|
| **New Features** | "Add", "feat", "new", "support" |
| **Bug Fixes** | "Fix", "bug", "resolve", "patch" |
| **Improvements** | "Refactor", "Update", "Improve", "Clean", "Optimize" |
| **Other** | Everything else |

Format as markdown, omitting empty categories:

```markdown
## What's Changed

### New Features
- Add support for NotebookLM service

### Bug Fixes
- Fix redirect loops for Gemini and AI Studio

### Improvements
- Refactor redirect logic into shared module
```

Show the draft to the user and ask if they want to edit anything before proceeding. This is their chance to reword entries, remove noise commits, or add context.

### Step 4: Update version in manifests

Update the `"version"` field in both:
- `manifest.json`
- `manifest_firefox.json`

Both must have the exact same version string.

### Step 5: Commit and tag

```bash
git add manifest.json manifest_firefox.json
git commit -m "Bump version to vX.Y.Z"
git tag -a vX.Y.Z -m "vX.Y.Z"
```

### Step 6: Push (requires confirmation)

Before pushing, explicitly ask the user to confirm. Show what will happen:
- Push commit to `origin main`
- Push tag `vX.Y.Z`

After confirmation:
```bash
git push origin main --follow-tags
```

### Step 7: Create GitHub release

```bash
gh release create vX.Y.Z --title "vX.Y.Z" --notes "<release notes>"
```

After creation, tell the user:
1. The release URL (from gh output)
2. The Chrome Web Store publish workflow has been triggered automatically
3. They can check workflow status: `gh run list --workflow=publish-chrome.yml --limit 1`

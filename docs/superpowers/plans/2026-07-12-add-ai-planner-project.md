# Add AI Travel Planner Project Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add "AI Travel Planner: Fine-Tuning Mistral 7B" project markdown file to the projects content directory so it populates both the "Other Noteworthy Projects" and the "Archive" page.

**Architecture:** Create a Gatsby-compatible markdown page under `content/projects/` with appropriate frontmatter metadata and content. Gatsby's graphQL queries will automatically pick it up, sort by date, and render it.

**Tech Stack:** Markdown, Gatsby

## Global Constraints

- File naming: `FineTuningAIPlanner.md`
- Directory path: `content/projects/`
- Date format: YYYY-MM-DD
- Tech list: exactly `Python`, `Mistral 7B`, `LoRA`, `Unsloth`, `Gemini API`

---

### Task 1: Create Project Markdown File

**Files:**
- Create: `content/projects/FineTuningAIPlanner.md`

- [ ] **Step 1: Create the project markdown file**

Create the file `content/projects/FineTuningAIPlanner.md` with the following content:

```markdown
---
date: '2026-07-11'
title: 'AI Travel Planner: Fine-Tuning Mistral 7B'
github: 'https://github.com/Devllihc/Fine-tuning-AI-Planner-Python'
company: ''
tech:
  - Python
  - Mistral 7B
  - LoRA
  - Unsloth
  - Gemini API
showInProjects: true
---

A project focused on research and training of a Large Language Model (LLM) to act as a smart travel planning assistant, fine-tuned on Mistral-7B-Instruct using LoRA and Unsloth.
```

- [ ] **Step 2: Verify the Gatsby site compiles successfully**

Observe the running `npm start` terminal process or check compilation. Alternatively, run:
```bash
npm run build
```
Expected: The build completes without GraphQL queries or markdown parsing errors.

- [ ] **Step 3: Commit the changes**

Staging and committing the new project:
```bash
git add content/projects/FineTuningAIPlanner.md
git commit -m "feat: add AI Travel Planner project markdown file"
```

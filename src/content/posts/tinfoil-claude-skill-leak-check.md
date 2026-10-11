---
title: "tinfoil: a Claude skill that checks repos for leaks"
description: tinfoil is an open-source Claude skill that reviews repos, screenshots, PDFs and blog posts for leaked secrets, personal data and employer info before you publish.
date: 2026-10-11
tags: [security, privacy, claude, open-source]
---

Before I make a GitHub repo public, I run a secret scanner on it. It catches API
keys well. It ignores a README line saying you're the only backend dev on a small
team in a named city who pushes before 9am. Each of those details is harmless by
itself. Put them together with the commit timestamps and you have one specific
person.

I wrote [tinfoil](https://github.com/Ivanko1608/tinfoil) for that second kind of
leak. It's a free, open-source skill for Claude. You ask "is this safe to post?"
about a repo, a screenshot, a PDF or a draft blog post, and Claude reads it the
way someone trying to find you would. Then it tells you whether to publish.

## What it checks

It starts by asking who you're publishing as. Your personal email on a portfolio
project is fine. On a project meant to stay anonymous, it's the worst thing in the
repo, so everything else gets weighed against your answer. Then it goes through
READMEs, commit messages, branch names, test fixtures and docs. It also checks
images for EXIF GPS data and for whatever is visible in them, like browser tabs,
notifications and street signs. When it finds small details that add up to a name
or an employer, it reports them as one finding.

It also flags things a scanner has no reason to notice: code that probably belongs
to your employer, real client data in a fixture, internal hostnames and ticket
numbers. The report ends with a verdict (safe to publish, fix first, or don't
publish yet) and a short list of fixes in the right order. If a key leaked, for
example, rotate it before rewriting git history, because deleting a pushed file
doesn't remove it.

## The scanner

The mechanical checks are handled by a single-file Python scanner with no
dependencies. It covers credentials, personal data, Office and PDF metadata, and
every commit on every branch. You can run it on its own as a
[pre-commit hook or a GitHub Action](https://github.com/Ivanko1608/tinfoil#bonus-the-scanner-on-its-own).

## What it doesn't do

tinfoil doesn't replace [gitleaks](https://github.com/gitleaks/gitleaks) or
[trufflehog](https://github.com/trufflesecurity/trufflehog), so keep one of those
in CI. Every report also lists what it didn't check, so a clean result means
"nothing found," not "guaranteed safe."

## Install

MIT licensed. To install in Claude Code:

```text
/plugin marketplace add Ivanko1608/tinfoil
/plugin install tinfoil@tinfoil
```

For Claude.ai and Claude Desktop, upload
[`dist/tinfoil.zip`](https://github.com/Ivanko1608/tinfoil/raw/HEAD/dist/tinfoil.zip)
under Settings → Capabilities → Skills.

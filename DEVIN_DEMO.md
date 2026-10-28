# Devin demo: Devin Review catches real bugs in a PR

**What it shows:** Devin Review runs on a PR that contains refund and webhook bugs and posts ranked inline comments with suggested fixes.

**Needs:** GitHub only

More demos: [devin-advanced-demos](https://github.com/thequantexplorer/devin-advanced-demos)

## Set it up

1. Click **Use this template → Create a new repository** (or fork it) into your own GitHub account or org.
   - Tick **Include all branches**. The PR under review lives on `feat/refunds-and-webhooks`. A fork made with `gh repo fork thequantexplorer/devin-demo-pr-review --clone` copies it too.
2. In Devin, open [**Settings → Connections → GitHub**](https://app.devin.ai/settings/connections/github) and make sure Devin can access the new repository.
3. Open the pull request that Devin will review. In a browser, go to

   `https://github.com/<you>/devin-demo-pr-review/compare/main...feat/refunds-and-webhooks`

   That page shows the changes on the `feat/refunds-and-webhooks` branch. Click **Create pull request**. From a terminal you can run this instead:

   ```sh
   gh pr create --repo <you>/devin-demo-pr-review --base main --head feat/refunds-and-webhooks \
     --title "Add refunds API and processor webhooks" --body "Adds POST /payments/:id/refunds and processor webhooks."
   ```

## Prompt

Start a new Devin session and paste this. Replace `<you>` with your GitHub user or org and set the PR number.

```text
Run Devin Review on https://github.com/<you>/devin-demo-pr-review/pull/1 ("refunds and webhooks"). I want a security- and correctness-focused review: money handling, webhook authentication, timing attacks, and anything that could let someone refund more than they paid. Post the findings as review comments on the PR with suggested fixes, ranked by severity, and summarize the top issues here. Don't merge.
```

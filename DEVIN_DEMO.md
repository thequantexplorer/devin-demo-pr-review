# Devin demo: Devin Review catches real bugs in a PR

**What it shows:** Devin Review runs on a PR that contains refund and webhook bugs and posts ranked inline comments with suggested fixes.

**Needs:** GitHub only

More demos: [devin-advanced-demos](https://github.com/thequantexplorer/devin-advanced-demos)

## Set it up

1. Click **Use this template → Create a new repository**, choose your GitHub account or org as the owner, and keep the name `devin-demo-pr-review`. The links and prompt below assume that name. Use the template rather than a fork: pull requests on a fork go to the original repo by default.
2. In Devin, open [**Settings → Connections → GitHub**](https://app.devin.ai/settings/connections/github) and make sure Devin can access the new repository.
3. Create the branch with the code under review. Clone your copy and run the script, which creates `feat/refunds-and-webhooks` from `main`, applies `review-pr/refunds-and-webhooks.patch` and pushes it:

   ```sh
   git clone https://github.com/<you>/devin-demo-pr-review && cd devin-demo-pr-review
   scripts/create-review-branch.sh
   ```

4. Open the pull request that Devin will review. In a browser, go to

   `https://github.com/<you>/devin-demo-pr-review/pull/new/feat/refunds-and-webhooks`

   and click **Create pull request**.

## Prompt

Start a new Devin session and paste this. Replace `<you>` with your GitHub user or org and set the PR number.

```text
Run Devin Review on https://github.com/<you>/devin-demo-pr-review/pull/1 ("refunds and webhooks"). I want a security- and correctness-focused review: money handling, webhook authentication, timing attacks, and anything that could let someone refund more than they paid. Post the findings as review comments on the PR with suggested fixes, ranked by severity, and summarize the top issues here. Don't merge.
```

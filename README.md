# AI Email Assistant

AI Mail Assistant — a web page that organises an inbox and highlights what matters (summary, priority, category, tasks, deadline, security, smart replies).

## How to run
Open the live site, or open `index.html` in a browser.

## Status
`script.js` (email data and the Analyze Emails logic) is present — it was added on 2026-11-05 with 12 demo emails, so the email list, search, sidebar filters and Analyze button all work. The sidebar counts (total emails, high priority, pending tasks, deadlines) are derived from the demo data, so they always match the emails in `script.js`. To use real emails, replace the `EMAILS` array in `script.js` with real data (or connect an email API).

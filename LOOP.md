# LOOP.md — Loop Engineering Configuration

> This file configures autonomous agent loop behavior for this project.
> Inspired by the Ralph Loop / Claude Code /goal patterns (2026).
> Read VISION.md and STATE.md before every iteration.

## 🔁 Loop Architecture

```
Each Loop Iteration:
  1. Read VISION.md (anchor intent — what are we building?)
  2. Read STATE.md (where are we? what is next?)
  3. Pick ONE task from STATE.md task queue
  4. Implement it
  5. VALIDATE (typecheck + lint + relevant tests)
  6. Commit (if all validators green)
  7. Update STATE.md (mark done, add next)
  8. Append to .kb/08-change-log.md
  9. EXIT this iteration cleanly
```

## ✅ Completion Criteria (Per Task)

A task is DONE only when ALL of the following are true:
- `pnpm typecheck` exits 0
- `pnpm lint` exits 0
- Relevant tests pass (`pnpm test`)
- STATE.md is updated
- Change log is updated
- Code matches the existing HTML design (for frontend tasks)

**Output the following when done:**
```
<promise>TASK_COMPLETE: [task name]</promise>
```

## 🛑 Stop Conditions

Stop and escalate to human when:
- Same error appears 3 iterations in a row (stuck loop)
- Drizzle migration would DROP or ALTER existing columns
- Payment integration behavior is ambiguous
- A design decision requires changing the HTML template
- TypeScript errors cannot be resolved without changing shared types

**Output when stopping:**
```
<stop>ESCALATE: [reason] — waiting for human input</stop>
```

## 💰 Budget Guard

- Max iterations per session: 30
- If iteration count hits 25, output a progress summary and ask for confirmation to continue
- Never delete files without outputting what will be deleted and waiting one iteration

## 🔀 Sub-Agent Roles (For Parallel Work)

| Role | Responsibility |
|---|---|
| Implementer | Writes code for the current task |
| Verifier | Runs typecheck, lint, tests and reports failures |
| Reviewer | Checks that UI matches HTML design |
| Logger | Updates STATE.md and change log |

> In single-agent mode: one agent plays all roles sequentially.

## 📁 Anchor Files (Load Every Iteration)

1. `VISION.md` — always
2. `STATE.md` — always
3. `.kb/05-hallucination-traps.md` — always
4. `.kb/04-coding-standards.md` — for implementation tasks
5. `.kb/01-project-overview.md` — for API/data tasks

# why tool permissions belong outside the model

imagine a coding agent decides that the cleanest fix is to delete a folder.

the model returns a tool call with a path and a convincing explanation. perhaps the deletion really is necessary. perhaps the model misunderstood the request. perhaps a retrieved file contained instructions designed to manipulate it.

should the tool call run because the model asked confidently?

no.

a model can propose an action. it should not be the authority that decides whether the action is allowed.

this distinction shapes the tool system in the coding-agent harness i’m building. the model can choose from tools described in its request, but those descriptions are not the security boundary. the boundary lives in ordinary application code that validates the request, constrains its scope, asks for approval when necessary, and performs the operation only after those checks succeed.

the interface itself does not receive unrestricted access to node.js or the filesystem. the electron renderer runs with isolation enabled, node integration disabled, and its sandbox enabled.

a preload bridge exposes a small set of named operations: open a workspace, read a file, start an agent run, answer an approval request, and similar application-specific actions. it does not expose a generic ipc channel, a shell, or the node filesystem api.

those requests cross into the main process, where the application checks that they came from its own trusted page and validates their inputs. paths are resolved against the opened workspace. linked paths and traversal outside that workspace are rejected.

this boundary matters because the renderer displays model output, repository text, and other untrusted content. even when that content is sanitized, it should not gain ambient access to the computer.

the same principle applies inside the agent loop.

when the model requests a tool, the harness parses the arguments and checks them against the tool’s schema. the tool registry decides whether that name exists and what implementation it maps to. the model does not provide executable code for the harness to run.

read-only tools can list files, search text, read bounded file contents, and inspect git status or diffs. they still have limits on paths, file sizes, result counts, output size, and execution time.

mutating tools take a different path.

before replacing an existing file, the agent must have read its current contents and include those exact contents with the proposed change. if the file changes before the write is applied, the operation fails instead of overwriting someone else’s work.

the harness then builds a reviewable change. the interface can show the target and a unified diff before anything is written. the user can reject it, allow it once, or allow that type of file action for the current workspace.

the model can request the operation, but it cannot approve its own request. approval is resolved by application state outside the model’s context.

commands are treated more strictly.

the general command tool launches an executable directly with a separate argument array. it does not silently pass model text through a command shell, so operators such as pipes, redirects, and substitutions are not interpreted as hidden shell syntax.

the working directory must resolve inside the workspace. argument count, argument size, execution time, and captured output are bounded. cancellation and timeout terminate the process tree.

most importantly, every command requires fresh approval. there is no “always allow” option for arbitrary commands.

diagnostic scripts also require fresh approval, even though the model can select only familiar names such as test, build, lint, or typecheck. a package script belongs to the repository, and a script called “test” can still execute arbitrary code or modify files.

this is why an allowlist is useful but not sufficient. a friendly name does not make an operation harmless.

the first sub-agents in the harness make the same boundary explicit in another way. they receive only read, search, and git-inspection tools. they cannot edit files, run commands, request approvals, or create more sub-agents. that restriction comes from the tool registry given to them, not from asking them politely to remain read-only.

none of this makes the application a complete security sandbox.

after approval, a command still runs with the application user’s operating-system permissions. the command risk label is a heuristic, not a proof. persistent file-action permissions are scoped to the current workspace and action type, but they still require care. network controls, workspace trust, stronger secret redaction, and a durable audit trail remain future work.

the goal is not to claim that every dangerous outcome has been eliminated. it is to make authority explicit and keep it outside the probabilistic part of the system.

models are good at interpreting goals, exploring alternatives, and proposing changes. deterministic application code is better at checking paths, enforcing limits, recording decisions, and refusing actions that have not been authorized.

a useful coding agent needs both.

the model decides what it wants to do. the harness decides what it is capable of doing. the user decides when a consequential action may proceed.

next in the series: what a coding agent should remember, what it should forget, and why project memory needs provenance and correction instead of automatic trust.

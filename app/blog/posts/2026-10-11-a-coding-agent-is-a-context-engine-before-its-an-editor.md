# a coding agent is a context engine before it’s an editor

imagine asking a coding agent: “why does this function fail?”

the function is open in the editor. the relevant test is elsewhere. a design decision was made three chats ago. somewhere in the repository, an old comment contradicts the current code.

what should the model see?

that question has shaped the coding-agent harness i’m building more than the editor or chat interface has. the model can only work with the context the harness gives it. sending too little makes it guess. sending everything makes the important evidence harder to find and the request more expensive. so i’ve started treating context as a product feature, not just a prompt assembled behind the scenes.

the app saves the visible conversation locally. that is useful for the person returning to a task, but it doesn’t mean every message goes into every model request.

at the start of a new run, the harness sends a bounded slice of recent chat, the current request, and the selected file’s path. the full transcript stays available in the interface. this distinction matters: a chat can look continuous while the model has only been given part of it.

within an active run, the harness uses openai’s previous_response_id to continue the response chain. when that chain grows, it can request server-side compaction. the resulting compaction item is opaque. our interface therefore shows a checkpoint made from visible activity, but does not pretend that checkpoint is a readable copy of what the provider retained.

a coding agent needs code. it does not need a dump of every file before it can begin.

for each new run, the harness looks for a small number of relevant files saved on disk. the selected file gets priority. words in the request help rank other paths and source lines. the model receives short excerpts with line numbers, while the chat shows which paths and line ranges were included.

this gives us a useful answer to “where did that context come from?” it also exposes a limit: retrieval can miss the right file. the agent still has search and read tools for deeper investigation, and it should read a file again before editing it.

unsaved editor content is not silently inserted into this automatic retrieval step. that may sometimes be less convenient, but it avoids presenting unsaved work as though it were the current state on disk.

some information should survive a chat: “we use this test framework,” or “this architectural choice was deliberate.” but automatically turning a model-generated summary into a permanent project fact is risky. summaries can be wrong, and decisions change.

for now, durable memory in the harness is deliberately manual. a user saves a fact or decision, gives it a topic and source label, and can later correct, disable, or delete it. relevant enabled items may be included in a future request. the chat shows which ones were used.

that memory is separate from the transcript, retrieved files, and the provider’s active response chain. it is also stored locally without encryption, so it is not a place for api keys or other secrets.

these are mechanisms, not a claim that the agent now remembers reliably. our tests check boundaries and request wiring. they do not yet tell us how often retrieval picks the best file, whether an old project fact misleads the model, or what survives a long real task after compaction.

those evaluations are next. before adding cleverer memory or semantic search, i want to know where this simpler system fails.

the lesson from building this part of the harness is straightforward: a coding agent’s intelligence is partly in the model, but much of its usefulness comes from deciding what evidence to bring to the model, when to bring it, and how to let the user inspect that choice.

next in the series: what happens when the agent wants to act on that evidence, and why tool permissions belong outside the model.

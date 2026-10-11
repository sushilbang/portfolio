# are fastapi and celery enough?

i have been using fastapi and celery for a while now and here is what I have learnt so far.

first why fastapi? tbh i described my idea to gemini-2.5-pro and it suggested me fastapi. having used fastapi enough i think i am in a position of explaining the reason.

my project idea had long running tasks. long running tasks can be a pain if you handle them as soon as they arrive (synchronously). it blocks your page unless the request is satisfied = user experience is degraded. what they want is either their request should be snappy or they should see some changes. this can be done by offloading the long running heavy tasks to workers and let them execute it in the background.

celery is a framework which defines what these tasks are, how to run them and when to run them. workers execute tasks in the background allowing for other functions to run smoothly. who offloads these tasks and manages them? this is where a message broker comes into picture. redis can be used as a message broker here taking these tasks and putting them into redis queues from which the workers can take them and execute them.

the other thing about celery is you can create more than just one worker for executing different "types" of tasks and set the concurrency to "n" based on the number of tasks you want to execute concurrently. in general concurrency should be set to less than or equal to the number of cores available on your CPU.

talking about fastapi, some of the reasons i really like about fastapi are:

- it accelerates the api implementation process.
- no need to make documentation for your apis, as it does it for you using openapi and redoc.
- you can inject dependencies into route decorations to lets say maybe authenticate any user before moving to the api code.

it also provides asynchronous support: async and await for concurrent and i/o bound tasks, think why do we need celery then? :)

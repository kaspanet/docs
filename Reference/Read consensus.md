# Read consensus

The current architecture suffers from a problem of non-granular locks. Any operation on consensus entirely locks it.
This causes many problems: For example, that when a node A is syncing node B, node A locks its own consensus in order to
determine what blocks it should send node B. This also prevents parallel validation.

In order to avoid it we need to apply a new architecture where reading from consensus happens directly from the database
and doesn't require a lock.
# Application repository handoffs

AI-DOS 1.2 intentionally confines manifest entries to the canonical project root. These checked-in handoff records describe the independently versioned Backend and Frontend sibling repositories without copying or tracking their contents in the Workspace repository.

The `path` values are relative to this Workspace root. Verify each sibling directly with Git when repository state matters; the handoff records do not replace application Git history.

# Appendix: Result Formats

A DATALOG-TEXT processor may simply need to return query results via an API
and so not deal with the display of data to human users. If the processor does
display human-readable results it should be done according to the results
formats defined in this section.

If a processor supports multiple result forms, including forms not defined in
this specification, the programmer can select the preferred form via the
`results` pragma [§&nbsp;Pragma results](pragmas.md#pragma-results) or some
other means such as processor command-line parameters, environment variables
and so forth.

## `native` Format

This format MUST be supported by a conforming DATALOG-TEXT processor that displays results in human-readable form

### Example -- Existential Query

```datalog
.pragma results=native
?- mortal("Socrates").
```

In the native results form a processor MAY return the matching fact, or return
a boolean response. The two results in the following example are therefore equivalent:

```datalog
mortal("Socrates").
true
```

### Example -- Selection Query

```datalog
.pragma results=native
?- mortal(X).
```

As above, but the output MUST be line-oriented with a single fact per line.

```datalog
mortal("Socrates").
mortal("Plato").
```

### Example -- Projection Query

```datalog
.pragma results=native
.assert car(make: string, model: string, age: integer).

car("ford", X, _)?
```

As above, but only variables are REQUIRED to be included in the response.
Specifically, anonymous attributes MUST be removed from the results and the
inclusion of constant values MAY be present, but it is RECOMMENDED to remove
them.

In the native form the result `car(edge).` would be an error as the car relation has
three attributes; similarly, `car("ford", edge, _).` is invalid as it includes
an anonymous variable in a fact. The naïve approach is to return the entirety
of the matching facts, as shown below. However, this results in a column that
was specifically anonymous and really should not be present.

```datalog
car("ford", edge, 22).
car("ford", escort, 12).
car("ford", fiesta, 8).
car("ford", focus, 19).
car("ford", fusion, 13).
car("ford", mustang, 3).
…
```

In this case the processor MAY choose to construct a new intensional relation
representing the query and then return these _simplified_ facts.

```datalog
car_1 :- car("ford", X, _).

car_1(edge).
car_1(escort).
car_1(fiesta).
car_1(focus).
car_1(fusion).
car_1(mustang).
…
```

## `tabular` Format

This format is optional but RECOMMENDED.

This specification does not require a specific set of characters for laying
out tables. The following are all acceptable styles that use either ASCII
characters or Unicode Box Drawing characters. Note that all the formats below
do make a distinction between header and body rows.

```text
+------------+------------+    ,------------+------------,    
| X: string  | Y: string  |    | X: string  | Y: string  |    X: string  | Y: string
+============+============+    |============+============|    -----------+-----------
| "Socrates" | "Plato"    |    | "Socrates" | "Plato"    |    "Socrates" | "Plato"    
+------------+------------+    '------------+------------'    

┌────────────┬────────────┐    ╭────────────┬────────────╮    
│ X: String  │ Y: String  │    │ X: String  │ Y: String  │    X: String  │ Y: String 
╞════════════╪════════════╡    ╞════════════╪════════════╡    ═══════════╪═══════════
│ "Socrates" │ "Plato"    │    │ "Socrates" │ "Plato"    │    "Socrates" │ "Plato"   
└────────────┴────────────┘    ╰────────────┴────────────╯    
```

### Example -- Existential Query

In the fact result form a table has an unnamed column with the fact constants
included.

```text
+------------+
| _: string  |
+============+
| "Socrates" |
+------------+
```

In the boolean result form a table is written with an unlabeled column with
the value `true`.

```text
+------------+
| _: boolean |
+============+
| true       |
+------------+
```

### Example -- Selection Query

In the tabular results form a table is written with one column per variable in
the goal and all matching facts as rows. 

```text
+------------+
| X: string  |
+============+
| "Socrates" |
| "Plato"    |
+------------+
```

Note that in naming a column it is appropriate to use either the name of the
variable (as shown above) or the label of the attribute if known (below).

```text
+---------------+
| name: string  |
+===============+
| "Socrates"    |
| "Plato"       |
+---------------+
```

### Example -- Projection Query

As above.

```text
+------------+
| X: string  |
+============+
| edge       |
+------------+
| escort     |
+------------+
| fiesta     |
+------------+
| focus      |
+------------+
| fusion     |
+------------+
| mustang    |
+------------+
      …
```

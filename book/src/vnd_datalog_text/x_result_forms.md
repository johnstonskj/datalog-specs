# Appendix: Result Formats

A DATALOG-TEXT processor may simply need to return query results via an API and so not deal with the display of data to human users. If the processor does display human-readable results it should be done according to the results formats defined in this section.

If a processor supports multiple result forms, including forms not defined in this specification, the programmer can select the preferred form via the `results` pragma [§&nbsp;Pragma results](pragmas.md#pragma-results) or some other means such as processor command-line parameters, environment variables and so forth.

## `native` Format

This format MUST be supported by a conforming DATALOG-TEXT processor that displays results in human-readable form

### Example -- Existential Query

```datalog
.pragma results=native
?- mortal("Socrates").
```

In the native results form this simply returns the value `true` to indicate that the query matches.

```datalog
true
```

### Example -- Selection Query

```datalog
.pragma results=native
?- mortal(X).
```

In the native results form the results are written to look like the input form of a fact.

```datalog
mortal("Socrates").
```

### Example -- Projection Query

TBD

```datalog
.pragma results=native
.assert car(make: string, model: string, age: integer).

car("ford", X, _)?
```

TBD

```datalog
car_1 :- car("ford", X, _);
car_1(edge).
car_1(escort).
car_1(fiesta).
car_1(focus).
car_1(fusion).
car_1(mustang).
```

## `tabular` Format

This format is optional but RECOMMENDED.

This specification does not require a specific set of characters for laying out tables. The following are all acceptable styles that use either ASCII characters or Unicode Box Drawing characters.

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

```datalog
.pragma results=tabular
?- mortal("Socrates").
```

In the tabular results form a table is written with an unlabeled column with the value `true`.

```text
+------------+
| _: boolean |
+============+
| true       |
+------------+
```

### Example -- Selection Query

```datalog
.pragma results=tabular
?- mortal(X).
```

In the tabular results form a table is written with one column per variable in the goal and all matching values as rows.

```text
+------------+
| X: string  |
+============+
| "Socrates" |
+------------+
```

### Example -- Projection Query

TBD

```datalog
.pragma results=tabular
.assert car(make: string, model: string, age: integer).

car("ford", X, _)?
```

TBD

```text
+------------+
| model      |
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
     ...
```

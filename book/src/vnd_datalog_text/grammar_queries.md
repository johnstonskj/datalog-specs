# Queries

A query is simply a goal without sub-goals (or a rule without a body). It is assumed that all intensional relations have been inferred using the program's rules and so the goal's predicate may be extensional or intensional.

![query](images/query.png)

While a query is just a goal it is syntactically distinct **either** with the prefix `"?-"` **or** the suffix `"?"`.

```ebnf
query   ::= ( "?-" atom "." ) | ( atom "?" ) ;
```

The following are equivalent queries.

```datalog
?- ancestor(xerces, X).
ancestor(xerces, X)?
```

## Query Forms

While a query is syntactically simple, an Atom with constant _and_ variable
terms, it's application falls into some distinct patterns or forms.

* _Existential_ -- determines the existance of a fact by only providing
  constant terms; this can be reduced to a boolean response value.
* _Selection_ -- one or more variables will result in all facts that match any
  provided constants. 
* _Projection_ (narrower) -- one or more anonymous variables will remove the
  corresponding attribute from any results.

## Examples

We refer to our common syllogism example.

```datalog
human("Socrates").

mortal(X) <- human(X).

?- mortal("Socrates").
```

The execution of this program will start with the goal query
`mortal("Socrates")` which can be read as "_is there an atom with the label
'mortal' with a single attribute value 'Socrates'_?". 

```text
+------------+
| _: string  |
+============+
| "Socrates" |
+------------+
```

As all terms are constant in this query, a processor  MAY return a boolean
value rather than the matching fact, in this case `true`.

```text
+------------+
| _: boolean |
+============+
| true       |
+------------+
```

However, if we were to change the final query to replace the constant with a variable, as follows:

```datalog
?- mortal(X).
```

The program will select all matching (in this case all) facts from the
_mortal_ relation. In this case the column is named for the variable `X`, the
previous example used the anonymous identifier.

```text
+------------+
| X: string  |
+============+
| "Socrates" |
+------------+
```

When the value `_` is used in a query it denotes an attribute of the relation that has no meaning
in either the query or the response. For example, in the following query we ask for all values of
the _model_ attribute in the _car_ relation where the _make_ is "ford", and ignore the age entirely.

```datalog
.assert car(make: string, model: string, age: integer).

car("ford", X, _)?
```

The results of this query would not include the age column:

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

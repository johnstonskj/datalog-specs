# Queries

A query is simply an atom, but one identified to the system as a goal with either the prefix `?-`
or the suffix `?`.

![query](images/query.png)

```ebnf
query   ::= ( "?-" atom "." ) | ( atom "?" ) ;
```

## Example

The following queries are equivalent and will return the value of the variable `X` for any facts in
the _ancestor_ relationship where the first attribute is the string value `"xerces"`.

```datalog
?- ancestor(xerces, X).
ancestor(xerces, X)?
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

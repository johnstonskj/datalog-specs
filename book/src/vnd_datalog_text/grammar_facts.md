# Relations & Facts

Facts **must** be expressed in the form of ground atoms and so they have a specific rule rather than a constrained form of the `atom` rule.

![fact](images/fact.png)

```ebnf
fact    ::= predicate ( "(" constant ( "," constant )* ")" )? "." ;
```

A predicate is the identifier shared by a fact and relation.

![predicate](images/predicate.png)

```ebnf
predicate
        ::= LC_ALPHA ( ALPHA | DIGIT | "_" )* ;
```

## Example

The following demonstrates a simple fact denoting that the constant `brooke` representing some
individual is the parent of some individual represented by the constant `"Xerces"`.

```datalog
parent("Xerces", brooke).
```

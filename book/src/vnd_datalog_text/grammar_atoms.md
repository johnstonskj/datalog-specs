# Atoms & Terms

The text representation of an atom is a relatively simple translation from the abstract syntax
above.

![atom](images/atom.png)

```ebnf
atom    ::= predicate "(" term ( "," term )* ")" ;
```

## Terms

![term](images/term.png)

```ebnf
term    ::= variable | constant ;
```

Note that we explicitly separate variables into named and anonymous forms here.

## Variables

![variable](images/variable.png)

```ebnf
variable
        ::= named-variable | anon-variable ;
```

![named-variable](images/named-variable.png)

```ebnf
named-variable
        ::= UC_ALPHA ( ALPHA | DIGIT | "_" )* ;
        
anon-variable
        ::= "_" ;
```

## Example

The following are all valid rule body atoms.

```datalog
dead(julius_caesar).
emperor(julius_caesar, rome).
emperor(X, Y).
emperor(X, rome).
```

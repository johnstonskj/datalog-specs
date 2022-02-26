# Rules

As facts are syntactically distinct from rules in the text representation there is no need for empty
bodies -- all rules **must** have at least one literal. Material implication may be written using
the Unicode character `⟵` (long leftwards arrow`\u{27f5}`).

![rule](images/rule.png)

```ebnf
rule    ::= ( head | "⊥" )? ( ":-" | "<-" | "⟵" ) body "." ;
```

The head of a rule is a disjunction of atoms, or in the case of a constraint the head may is
optional or replaced by the value `"⊥"`.

![head](images/head.png)

```ebnf
head    ::= ( atom ( ( ";" | "|" | "OR" | "∨" ) atom )* ) ;
```

The body of a rule is comprised of one, or more, literals.

![body](images/body.png)

```ebnf
body    ::= literal ( ( "," | "&" | "AND" | "∧" ) literal )* ;
```

## Examples

The following sets of rules are equivalent.

```datalog
ancestor(X, Y) :- parent(X, Y).
ancestor(X, Y) <- parent(X, Y).
ancestor(X, Y) ⟵ parent(X, Y).

movie_star(X) :- star(X)  ,  movie_cast_member(X, _, _).
movie_star(X) :- star(X)  &  movie_cast_member(X, _, _).
movie_star(X) :- star(X) AND movie_cast_member(X, _, _).
movie_star(X) :- star(X)  ∧  movie_cast_member(X, _, _).
```

As described in the abstract syntax it is an error to use an extensional relation in the head of
a rule. The following will generate an error:

```datalog
parent("Xerces", brooke).

parent(X,Y) :- father(X,Y).
```

The language feature `disjunction` corresponds to the language $\small\text{Datalog}^{\lor}$ and
allows multiple atoms to appear in the rule's head with the semantics that these are choices. This
syntax will not be accepted unless the feature is enabled.

The following describes the rule that _if X is a parent then X is **either** a
father **or** mother_.

```datalog
.feature(disjunction).

father(X) ;  mother(X) :- parent(X).
father(X) |  mother(X) :- parent(X).
father(X) OR mother(X) :- parent(X).
father(X) ⋁  mother(X) :- parent(X).
```

As the use of disjunction in this position in the head is _inclusive_ it is considered that any rule as above can be transformed
into the following standard form. Clearly, in this case this is not the expected semantics which would require
an exclusive disjunction, the language $\small\text{Datalog}^{\oplus}$. Because the semantics may
cause such confusion ASDI does not do this transformation by default.

```datalog
father(X) :- parent(X).
mother(X) :- parent(X).
```

The language feature `constraints` corresponds to the language $\small\text{Datalog}^{\Leftarrow}$ and
allows the specification of rules with no head. In this case the material implication symbol is
**required**, the falsum value is optional for readability, therefore the following rules are
equivalent.

```datalog
.feature(constraints).

:- alive(X) AND dead(X).
⊥ ⟵ alive(X) ∧ dead(X).
```

## Safety

ASDI will disallow the addition of rules that are unsafe according to the abstract syntax. The
following are examples of unsafe rules:

* `a(X) :- b(Y).` — because `X` appears as a distinguished variable but does not appear in a
  positive relational literal, error
  [`HeadVariablesMissingInBody`](error/enum.Error.html#variant.NegativeVariablesNotAlsoPositive).
* `a(X) :- b(Y), NOT b(X).` — because `X` appears in a negated literal but does not appear in a
  positive relational literal, error
  [`NegativeVariablesNotAlsoPositive`](error/enum.Error.html#variant.NegativeVariablesNotAlsoPositive).
* `a(X) :- b(Y), X < Y.` — Because `X` appears in an arithmetic literal but does not appear in a
  positive relational literal, error
  [`ArithmeticVariablesNotAlsoPositive`](error/enum.Error.html#variant.ArithmeticVariablesNotAlsoPositive).

# Program

A program ($\small P$) consists of a set of facts that comprise the extensional database ($\small D_E$), a list of rules that comprise the intensional database ($\small D_I$), and possibly a set of queries ($\small Q$) to interrogate the result of any reasoning performed over the program.

![program](images/program.png)

```ebnf
program ::= processing-instruction* ( fact | rule | query )* ;
```

A program consists of a single file containing facts, rules, and queries as well as any additional files referenced via _processing instructions_.

## Example

```datalog
.assert human(string).
.infer mortal from human.

human(socrates).

mortal(X) :- human(X).

?- mortal(socrates).
```
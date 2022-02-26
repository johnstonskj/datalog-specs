# Comments

Comments in Datalog are either 1) the `%` character and continue to the end of the line, or
2) C-style with `/*` to start and `*/` to end. These correspond to the same rules as Prolog.

![comment](images/comment.png)

```ebnf
comment ::= line-comment | block-comment ;
```

![line-comment](images/line-comment.png)

```ebnf
line-comment
        ::= "%" [^\r\n]* EOL ;
```

![block-comment](images/block-comment.png)

```ebnf
block-comment
        ::= '/*' ( [^*] | '*'+ [^*/] )* '*'* '*/' ;
```

## Example

```datalog
% Here's a comment
?- ancestor(xerces, X). % and another
?- ancestor(brooke /* and one inline */, X). % and another
```

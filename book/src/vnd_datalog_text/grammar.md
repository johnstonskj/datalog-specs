# Datalog Text Grammar

A DATALOG-TEXT resource is a Unicode<span class="bibref inline">[UNICODE](x_references.md#UNICODE)</span> character string encoded in UTF-8. Unicode code points only in the range `U+0` to `U+10FFFF` inclusive are allowed.

**White space** (Unicode category **Zs**, tab `U+0009` and `EOL`) is used to separate two terminals which would otherwise be (mis-)recognized as one terminal. White space is significant in the production `literal-string` (see [§&nbsp;Types & Constants](grammar_constants.md)).

**Comments** in a DATALOG-TEXT resource takes either of the following forms. Comments are treated as white space.

1. Begin with a `%` and continue to the end of line (`EOL`) or end of file if there is no end of line after the comment marker. 
2. Begin with the characters `/*` and end with the characters `*/`. They may occur anywhere outside other tokens, and their contents have no influence on the rendering. Comments MAY NOT be nested.

The EBNF used here is defined in XML 1.0 <span class="bibref inline">[EBNF-NOTATION](x_references.md#EBNF-NOTATION)</span> with the addition that each rule in the grammar ends with a semicolon character `;`. The amended rule for `symbol` is shown below.

```ebnf
symbol ::= expression ";"
```

The following are the detailed sections of the grammar.

* [Program](grammar_program.md)
* [Relations & Facts](grammar_facts.md)
* [Types & Constants](grammar_constants.md)
* [Rules](grammar_rules.md)
* [Atoms & Terms](grammar_atoms.md)
* [Literals](grammar_literals.md)
* [Queries](grammar_queries.md)
* [Processing Instructions](grammar_pi.md)
* [Comments](grammar_comments.md)
* [Terminal/Lexical](grammar_lexical.md)

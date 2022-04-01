# Errors

This specification expects parsers of to emit certain errors when dealing with the semantics of the resource content (we do not address low-leve lexing/parsing errors). Each instance of an error reported to the client of the parser SHOULD include a message that denotes the details of the elements involved and SHOULD, if possible, the source location.

The following errors MUST be supported in a conforming DATALOG-TEXT processor. The naming convention used here for errors is commonly referred to as _[Screaming Snake Case](https://en.wikipedia.org/?title=SCREAMING_SNAKE_CASE&redirect=no)_ where all characters are in upper case and all words are separated by underscores. A conforming DATALOG-TEXT processor SHOULD adapt this naming convention to the idiomatic form expected by a programmer in the implementation language.

Additional errors MAY be added, but where possible existing errors SHOULD BE used, distinguished by the `message` (See the non-normative [§&nbsp;Error Type](#error_type) below) field on the error instance. Alternatively more detailed errors may be wrapped within one of the errors below using the `caused_by` field on the error instance.

## Core Errors

<dl class="enum">
    <dt id="ERR_UNSUPPORTED_DIALECT">ERR_UNSUPPORTED_DIALECT</dt>
    <dd>

The dialect specified in the `vnd.datalog` media type was not identified, or otherwise not supported by this parser.
    </dd>
    <dt id="ERR_UNSUPPORTED_SYNTAX">ERR_UNSUPPORTED_SYNTAX</dt>
    <dd>

The parser found syntax that is not supported by the dialect specified in the `vnd.datalog` media type.
    </dd>
    <dt id="ERR_UNSUPPORTED_FEATURE">ERR_UNSUPPORTED_FEATURE</dt>
    <dd>

A feature identified by a feature pragma is not supported by this parser.
    </dd>
    <dt id="ERR_FEATURE_NOT_ENABLED">ERR_FEATURE_NOT_ENABLED</dt>
    <dd>

A required language feature during parsing was not enabled in the `features` pragma. The error `ERR_FEATURE_NOT_ENABLED` should be signaled instead if enabling the feature would result in such an error.
    </dd>
    <dt id="ERR_UNSUPPORTED_PROCESSING_INSTRUCTION">ERR_UNSUPPORTED_PROCESSING_INSTRUCTION</dt>
    <dd>
    
The processing instruction was not identified, or otherwise not supported by this parser.
    </dd>
    <dt id="ERR_UNSUPPORTED_PRAGMA">ERR_UNSUPPORTED_PRAGMA</dt>
    <dd>
    
The pragma was not identified, or otherwise not supported by this parser.
    </dd>
    <dt id="ERR_INCONSISTENT_FACT_SCHEMA">ERR_INCONSISTENT_FACT_SCHEMA</dt>
    <dd>

Two facts are asserted but with different schema, or a fact is asserted with a different schema than it's declared relation.

Given the following processing instruction `.assert human(string).`, the following fact is inconsistent` human(24).`

Or, if no relation declaration exists the first instance of a fact, say `human("Alice").`, is used to infer the relation schema and thus the following fact is inconsistent `human(24).`
    </dd>
    <dt id="ERR_PREDICATE_NOT_AN_EXTENSIONAL_RELATION">ERR_PREDICATE_NOT_AN_EXTENSIONAL_RELATION</dt>
    <dd>

A predicate is used in a context that identifies an extensional relation, however the label was not in the extensional database. 
    </dd>
    <dt id="ERR_PREDICATE_NOT_AN_INTENSIONAL_RELATION">ERR_PREDICATE_NOT_AN_INTENSIONAL_RELATION</dt>
    <dd>

A predicate is used in a context that identifies an intensional relation, however the label was not in the intensional database.
    </dd>
    <dt id="ERR_RELATION_ALREADY_EXISTS">ERR_RELATION_ALREADY_EXISTS</dt>
    <dd>

An attempt was made to declare a relation where one already exists.
    </dd>
    <dt id="ERR_EXTENSIONAL_RELATION_IN_RULE_HEAD">ERR_EXTENSIONAL_RELATION_IN_RULE_HEAD</dt>
    <dd>

A previously identified extensional relation, either with the `assert` processing instruction or inferred from a fact, appears in the head of a rule.
    </dd>
    <dt id="ERR_HEAD_VARIABLE_NOT_IN_POSITIVE_RELATIONAL_LITERAL">ERR_HEAD_VARIABLE_NOT_IN_POSITIVE_RELATIONAL_LITERAL</dt>
    <dd>

A variable that is used within the head of a rule does not also appear in a positive _relational_ literal. For example, the following is invalid: `a(X) :- b(Y)`.
    </dd>
    <dt id="ERR_INVALID_NUMBER_OF_ATOMS_IN_HEAD">ERR_INVALID_NUMBER_OF_ATOMS_IN_HEAD</dt>
    <dd>

A $\small\text{Datalog}$ program requires one, and only one, atom in a rule's head. Also see [§&nbsp;With Constraints](#with-constraints) and [§&nbsp;With Disjunction](#with-disjunction) for modifications to this error condition.
    </dd>
    <dt id="ERR_INVALID_TYPE">ERR_INVALID_TYPE</dt>
    <dd>

A value was provided which did not match the expected type.
    </dd>
    <dt id="ERR_MISSING_VALUE">ERR_MISSING_VALUE</dt>
    <dd>

An expected value was not found.
    </dd>
    <dt id="ERR_INVALID_VALUE_FOR_TYPE">ERR_INVALID_VALUE_FOR_TYPE</dt>
    <dd>

A value was provided that is an invalid representation of the expected type.
    </dd>
    <dt id="ERR_INVALID_RELATION">ERR_INVALID_RELATION</dt>
    <dd>

A relation cannot be constructed, either from the values provided to an `assert` or `infer` processing instruction or during rule evaluation.
    </dd>
    <dt id="WARN_DUPLICATE">WARN_DUPLICATE</dt>
    <dd>

Signaled on any duplicate declaration, processing instruction, fact, rule, or query.
    </dd>
    <dt id="WARN_RULE_IS_ALWAYS_TRUE">WARN_RULE_IS_ALWAYS_TRUE</dt>
    <dd>

This rule will always evaluate to true. See also `WARN_ARITHMETIC_LITERAL_IS_ALWAYS_TRUE`.
    </dd>
    <dt id="WARN_RULE_IS_ALWAYS_FALSE">WARN_RULE_IS_ALWAYS_FALSE</dt>
    <dd>

This rule will always evaluate to false. See also `WARN_ARITHMETIC_LITERAL_IS_ALWAYS_FALSE`.
    </dd>
</dl>

## Resolver Errors

The following errors are introduced for use by the _resolver_ subcomponent of the DATALOG-TEXT processor.

<dl class="enum">
    <dt id="ERR_UNSUPPORTED_MEDIA_TYPE">ERR_UNSUPPORTED_MEDIA_TYPE</dt>
    <dd>

A media type present in an `input` or `output``input` or `output` processing instruction is not supported by this processor.
    </dd>
    <dt id="ERR_INVALID_URI">ERR_INVALID_URI</dt>
    <dd>

The URI present in an `input` or `output` processing instruction could not be parsed, and constructed as a valid absolute URI.
    </dd>
    <dt id="ERR_INPUT_RESOURCE_DOES_NOT_EXIST">ERR_INPUT_RESOURCE_DOES_NOT_EXIST</dt>
    <dd>

Having constructed a valid absolute URI no resource was found. For example in an HTTP response this would be the error 404 `NOT FOUND`. 

Opening a file-system resource would be one of the errors  `ENODEV`,  `ENOENT`, or  `ENOTDIR`[^1].
    </dd>
    <dt id="ERR_INVALID_INPUT_RESOURCE">ERR_INVALID_INPUT_RESOURCE</dt>
    <dd>

The resource was retrieved, but it was not possible to parse it according to its expected media type.
    </dd>
    <dt id="ERR_OUTPUT_RESOURCE_NOT_WRITEABLE">ERR_OUTPUT_RESOURCE_NOT_WRITEABLE</dt>
    <dd>

An `output` processing instruction identified a resource but the relation could not be written to that resource.
    </dd>
    <dt id="ERR_IO_INSTRUCTION_PARAMETER">ERR_IO_INSTRUCTION_PARAMETER</dt>
    <dd>
    
A parameter specified for an input or output processing instruction does not match the expectations of the media type, or does not match the relation's schema.
    </dd>
    <dt id="ERR_IO_SYSTEM_FAILURE">ERR_IO_SYSTEM_FAILURE</dt>
    <dd>

The underlying input output system reported a failure. For `file` URIs this is typically file system errors, for `http` this would be HTTP, <span class="bibref inline">[RFC2616](x_references.md#RFC2616)</span> [§&nbsp;10.&nbsp;Status Code Definitions](https://datatracker.ietf.org/doc/html/rfc2616#section-10), or network errors.
    </dd>
</dl>

## Evaluator Errors

_This section is non-normative._

The following errors are introduced for use by the _evaluator_ subcomponent of the DATALOG-TEXT processor. This section is non-normative because this specification does not address any behavior required of the evaluator. It is included here because in some cases a parser may choose to perform more detailed semantic evaluation of rules which would result in these errors.

<dl class="enum">
    <dt id="ERR_NOT_EVALUABLE">ERR_NOT_EVALUABLE</dt>
    <dd>

The parsed and resolved resource cannot be evaluated, this is generally a catch-all error when the parsed resource semantics are unclear or contradictory.
    </dd>
    <dt id="ERR_INCOMPATIBLE_RELATION_SCHEMA">ERR_INCOMPATIBLE_RELATION_SCHEMA</dt>
    <dd>

This error occurs when evaluating rules where the required operation two or more relations (union, intersection, cartesian product, join, …) cannot be performed as the relations have incompatible schema.
    </dd>
</dl>

## With Negation

<dl class="enum">
    <dt id="ERR_NEGATIVE_VARIABLE_NOT_IN_POSITIVE_RELATIONAL_LITERAL">ERR_NEGATIVE_VARIABLE_NOT_IN_POSITIVE_RELATIONAL_LITERAL</dt>
    <dd>

A variable that is used within a negated literal does not also appear in a positive _relational_ literal. For example, the following is invalid: `a(X) :- b(Y), NOT b(X).`
    </dd>
</dl>

## With Arithmetic Literals

<dl class="enum">
    <dt id="ERR_ARITHMETIC_VARIABLE_NOT_IN_POSITIVE_RELATIONAL_LITERAL">ERR_ARITHMETIC_VARIABLE_NOT_IN_POSITIVE_RELATIONAL_LITERAL</dt>
    <dd>

A variable that is used within an arithmetic literal does not also appear in a positive _relational_ literal. For example, the following is invalid: `a(X) :- b(Y), X < Y.`
    </dd>
    <dt id="ERR_INVALID_OPERATOR_FOR_TYPE">ERR_INVALID_OPERATOR_FOR_TYPE</dt>
    <dd>

The operator is not specified for the type of the current entity.
    </dd>
    <dt id="ERR_INCOMPATIBLE_TYPES_FOR_OPERATOR">ERR_INCOMPATIBLE_TYPES_FOR_OPERATOR</dt>
    <dd>

The left-hand and right-hand sides of the literal are of different types and the operator cannot be used with the combination of types.
    </dd>
    <dt id="WARN_ARITHMETIC_LITERAL_IS_ALWAYS_TRUE">WARN_ARITHMETIC_LITERAL_IS_ALWAYS_TRUE</dt>
    <dd>

Evaluation of this literal will always return true. For example `1 = 1`.
    </dd>
    <dt id="WARN_ARITHMETIC_LITERAL_IS_ALWAYS_FALSE">WARN_ARITHMETIC_LITERAL_IS_ALWAYS_FALSE</dt>
    <dd>

Evaluation of this literal will always return false. For example `1 = 2`
    </dd>
</dl>

## With Constraints

The error `ERR_INVALID_NUMBER_OF_ATOMS_IN_HEAD` is relaxed in $\small\text{Datalog}^{\Leftarrow}$ to allow zero atoms in a rule's head.

## With Disjunction

The error `ERR_INVALID_NUMBER_OF_ATOMS_IN_HEAD` is relaxed in $\small\text{Datalog}^{\lor}$ to allow more than one atom in a rule's head.

## With Functional Dependencies/IO

```datalog
.assert employee(ein: integer, name: string, ssn: string, active: bool).
.fd employee: ein --> ssn.
.fd employee: ein --> 2, 4. 
```

<dl class="enum">
    <dt id="ERR_INVALID_ATTRIBUTE_INDEX">ERR_INVALID_ATTRIBUTE_INDEX</dt>
    <dd>

The integer index in the functional dependency specification is not a valid attribute index in the relation.

For example, in `.fd employee: employee_id --> ssn.` the attribute label
`employee_id` is invalid.

This error is also used to denote invalid columns specified in `input` or
    `output` processing instructions.
    </dd>
    <dt id="ERR_INVALID_ATTRIBUTE_LABEL">ERR_INVALID_ATTRIBUTE_LABEL</dt>
    <dd>

The predicate in the functional dependency specification is not a valid attribute label in the relation.

For example, in `.fd employee: ein --> 2, 24.` the index `24` is invalid.

This error is also used to denote invalid columns specified in `input` or
    `output` processing instructions.
    </dd>
</dl>

The error `ERR_PREDICATE_NOT_AN_EXTENSIONAL_RELATION` is raised if the relation predicate in the processing instruction has not been asserted as an extensional relation.

## Error Type

_This section is non-normative._

This specification assumes the presence of a type that allows the instance of a signaled error to carry information regarding the location of the error and any other relevant context. The following is a non-normative structure that may be referenced by this specification.

```text
structure Error {
    kind: ErrorKind,
    caused_by: Option<Error>,
    source_line: Option<integer>,
    source_column: Option<integer>,
    message: string,
}
```

* `kind` -- the error identifier.
* `caused_by` -- an optional inner value allowing error instances to be nested.
* `source_line` -- where possible the parser should identify the 1-based line number where the error occurred.
* `source_column` -- where possible the parser should identify the 1-based column number where the error occurred.
* `message` -- a string providing as much information as possible regarding this error instance including any labels associated with values in error.

The above structure required a type `ErrorKind`, this is the enumeration of all the error identifiers from the section above.

```text
enumeration ErrorKind {
    ERR_UNSUPPORTED_DIALECT,
    …
}
```

<p>&nbsp;</p>

----------

[^1]: From The Open Group [man page](https://pubs.opengroup.org/onlinepubs/9699919799/functions/open.html) for the `open()` function.

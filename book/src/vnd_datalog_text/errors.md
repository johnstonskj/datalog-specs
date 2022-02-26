# Errors

This specification expects parsers of to emit certain errors when dealing with the semantics of the resource content (we do not address low-leve lexing/parsing errors). Each instance of an error reported to the client of the parser SHOULD include a message that denotes the details of the elements involved and SHOULD, if possible, the source location.

The following errors MUST be supported in any parser implementation. Additional errors MAY be added, but where possible errors should be distinguished by any message associate with the error instance.

<dl class="enum">
    <dt>ERR_UNSUPPORTED_DIALECT</dt>
    <dd>The dialect specified in the media type was not identified, or otherwise not supported by this parser.</dd>
    <dt>ERR_UNSUPPORTED_FEATURE</dt>
    <dd>A feature identified in the <code>features</code> processing instruction is not supported by this parser.</dd>
    <dt>ERR_INCONSISTENT_FACT_SCHEMA</dt>
    <dd>
        <p>Two facts are asserted but with different schema, or a fact is asserted with a different schema than it's declared relation.</p>
        <p>Given the following processing instruction <code>.assert human(string).</code>, the following fact is inconsistent <code>human(24).</code>
        </p>
        <p>Or, if no relation declaration exists the first instance of a fact, say <code>human("Alice").</code>, is used to infer the relation schema and thus the following fact is inconsistent <code>human(24).</code>
        </p>
    </dd>
    <dt>ERR_INCONSISTENT_RELATION_SCHEMA</dt>
    <dd>TBD</dd>
    <dt>ERR_PREDICATE_NOT_AN_EXTENSIONAL_RELATION</dt>
    <dd>TBD</dd>
    <dt>ERR_PREDICATE_NOT_AN_INTENSIONAL_RELATION</dt>
    <dd>TBD</dd>
    <dt>ERR_EXTENSIONAL_RELATION_IN_RULE_HEAD</dt>
    <dd>TBD</dd>
    <dt>ERR_HEAD_VARIABLE_NOT_IN_POSITIVE_RELATIONAL_LITERAL</dt>
    <dd>A variable that is used within the head of a rule does not also appear in a positive _relational_ literal. For example, the following is invalid: <code>a(X) :- b(Y).</code></dd>
    <dd>TBD</dd>
    <dt>ERR_INVALID_NUMBER_OF_ATOMS_IN_HEAD</dt>
    <dd>A $\small\text{Datalog}$ program requires one, and only one, atom in a rule's head.</dd>
    <dt>ERR_INVALID_TYPE</dt>
    <dd>A value was provided with an invalid type.</dd>
    <dt>ERR_INVALID_VALUE_FOR_TYPE</dt>
    <dd>A value was provided that is an invalid representation of the expected type.</dd>
    <dt>ERR_PROGRAM_NOT_STRATIFIABLE</dt>
    <dd>TBD</dd>
    <dt>ERR_ANONYMOUS_VARIABLE_NOT_ALLOWED_HERE</dt>
    <dd>TBD</dd>
    <dt>WARN_RULE_IS_ALWAYS_TRUE</dt>
    <dd>For some reason this rule will always evaluate to true.</dd>
    <dt>WARN_RULE_IS_ALWAYS_FALSE</dt>
    <dd>For some reason, this rule will always evaluate to false.</dd>
</dl>

## Resolver Errors

<dl class="enum">
    <dt>ERR_INVALID_URI</dt>
    <dd>TBD</dd>
    <dt>ERR_INPUT_RESOURCE_DOES_NOT_EXIST</dt>
    <dd>TBD (404), ENODEV, ENOENT, ENOTDIR[^1]</dd>
    <dt>ERR_COULD_NOT_RETRIEVE_INPUT_RESOURCE</dt>
    <dd>TBD (4xx)</dd>
    <dt>ERR_INVALID_INPUT_RESOURCE</dt>
    <dd>The resource was retrieved but it was not possible to parse it according to it's expected media type.</dd>
    <dt>ERR_OUTPUT_RESOURCE_NOT_WRITEABLE</dt>
    <dd>TBD</dd>
</dl>

## With Negation

<dl class="enum">
    <dt>ERR_NEGATIVE_VARIABLE_NOT_IN_POSITIVE_RELATIONAL_LITERAL</dt>
    <dd>A variable that is used within a negated literal does not also appear in a positive _relational_ literal. For example, the following is invalid: <code>a(X) :- b(Y), NOT b(X).</code></dd>
</dl>

## With Arithmetic Literals

<dl class="enum">
    <dt>ERR_ARITHMETIC_VARIABLE_NOT_IN_POSITIVE_RELATIONAL_LITERAL</dt>
    <dd>A variable that is used within an arithmetic literal does not also appear in a positive _relational_ literal. For example, the following is invalid: <code>a(X) :- b(Y), X < Y.</code></dd>
    <dt>ERR_INVALID_OPERATOR_FOR_TYPE</dt>
    <dd>An operator is not specified for the type of the current entity.</dd>
    <dt>ERR_INCOMPATIBLE_TYPES_FOR_OPERATOR</dt>
    <dd>The left-hand and right-hand sides of the literal are of different types and the operator cannot be used with the combination of types.</dd>
    <dt>WARN_ARITHMETIC_LITERAL_IS_ALWAYS_TRUE</dt>
    <dd>Evaluation of this literal will always return true. For example <code>1 = 1</code></dd>
    <dt>WARN_ARITHMETIC_LITERAL_IS_ALWAYS_FALSE</dt>
    <dd>Evaluation of this literal will always return false. For example <code>1 = 2</code></dd>
</dl>

## With Constraints

The error `ERR_INVALID_NUMBER_OF_ATOMS_IN_HEAD` is relaxed in $\small\text{Datalog}^{\bot}$ to allow zero atoms in a rule's head.

## With Disjunction

The error `ERR_INVALID_NUMBER_OF_ATOMS_IN_HEAD` is relaxed in $\small\text{Datalog}^{\lor}$ to allow more than one atom in a rule's head.

## With Functional Dependencies

```datalog
.assert employee(ein: integer, name: string, ssn: string, active: bool).
.fd employee: ein --> ssn.
.fd employee: ein --> 2, 4. 
```

<dl class="enum">
    <dt>ERR_INVALID_ATTRIBUTE_INDEX</dt>
    <dd>
        <p>The integer index in the functional dependency specification is not a valid attribute index in the relation. </p> 
        <p>For example, in <code>.fd employee: employee_id --> ssn.</code> the attribute label <code>employee_id</code> is invalid.</p>
    </dd>
    <dt>ERR_INVALID_ATTRIBUTE_LABEL</dt>
    <dd>
        <p>The predicate in the functional dependency specification is not a valid attribute label in the relation.</p> 
        <p>For example, in <code>.fd employee: ein --> 2, 24.</code> the index <code>24</code> is invalid.</p>
    </dd>
</dl>

The error `ERR_PREDICATE_NOT_AN_EXTENSIONAL_RELATION` is raised if the relation predicate in the processing instruction has not been asserted as an extensional relation.

----------

[^1]: From The Open Group [man page](https://pubs.opengroup.org/onlinepubs/9699919799/functions/open.html) for the `open()` function.
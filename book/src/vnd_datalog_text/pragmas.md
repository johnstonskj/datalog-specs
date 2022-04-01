# Pragmas

**REREAD THIS SECTION**

A number of pragmas below are termed _feature pragmas_ as they are boolean
gates that enable or disable specific language featues. Use of syntax
associated with a disabled language feature MAY result in errors. 

A conformant DATALOG-TEXT processor in strict mode MUST signal an error,
otherwise the processor MAY assume the feature is enabled due to its usage. A
conformant DATALOG-TEXT processor MUST signal an error when detecting a
feature identifier which they do not recognize, even if it may be valid in
some other version of this specification.

As feature pragmas are boolean parameters, the following two pragmas are equivalent:

```datalog
.pragma negation.
.pragma negation=true.
```

This also implies you can force a feature to be disabled in the following manner.

```datalog
.pragma negation=false.
```

Duplicate features listed in the same processing instruction, or multiple processing instructions MUST NOT be treated as an error, they are simply combined and de-duplicated as a set. A DATALOG-TEXT processor MAY signal a [`WARN_DUPLICATE`](errors.md#WARN_DUPLICATE) warning on detection of duplicate values.

## Pragma `base`

If the `base` pragma is not specified then any references in the subject resource are relative to the resource location if known by the parser, or relative to the process performing the parsing. 

Any use of the `base` pragma MUST include a constant string value that can be interpreted as a valid absolute URI (section 4.3 "_Absolute URI_" in <span class="bibref inline">[RFC3986](x_references.md#RFC3986)</span>).

**Default Value**: `""`, see [§&nbsp;URI References](resolvers.md#uri-references).

### Errors

* [`ERR_MISSING_VALUE`](errors.md#ERR_MISSING_VALUE) -- The URI was not present.
* [`ERR_INVALID_TYPE`](errors.md#ERR_INVALID_TYPE) -- The value provided was not a string.
* [`ERR_INVALID_URI`](errors.md#ERR_INVALID_URI) -- Could not parse the URI, or it was not absolute.

### Examples

In the following example the base IRI is _implicit_ and is determined by the resolver to dereference the relative value "data/humans.csv".

```datalog
.assert human(string).
.input(human, "data/humans.csv", "csv").
```

In the following example the base IRI is _explicitly_ declared and so the input for `human` is clearly "https://example.com/datalog/data/humans.csv".

```datalog
.pragma base="https://example.com/datalog/".
.assert human(string).
.input(human, "data/humans.csv", "csv").
```

The following are invalid.

```datalog
.pragma base.
%% ==> ERR_MISSING_VALUE
```

```datalog
.pragma base="/resources".
%% ==> ERR_INVALID_URI
```

```datalog
3M.pragma base=true.
%% ==> ERR_INVALID_TYPE
```


## Pragma `constraints` (feature)

Enable rules to omit the head and become a constraint, as describe in [§&nbsp;Rule Body & Constraints](grammar_rules.md#rule-body--constraints).

**Default Value**: `false`

### Errors

* [`ERR_UNSUPPORTED_FEATURE`](errors.md#ERR_UNSUPPORTED_FEATURE) -- This feature is not supported by this parser.
* [`ERR_INVALID_TYPE`](errors.md#ERR_INVALID_TYPE) -- the value provided was not of type boolean.

## Pragma `disjunction` (feature)

Enable multiple atoms in a rule head, as describe in [§&nbsp;Rule Head & Disjunction](grammar_rules.md#rule-head--disjunction).

**Default Value**: `false`

### Errors

* [`ERR_UNSUPPORTED_FEATURE`](errors.md#ERR_UNSUPPORTED_FEATURE) -- This feature is not supported by this parser.
* [`ERR_INVALID_TYPE`](errors.md#ERR_INVALID_TYPE) -- the value provided was not of type boolean.

## Pragma `extended_numerics` (feature)

Enable the types `float` and `decimal`, as describe in [§&nbsp;Numbers](grammar_constants.md#numbers).

**Default Value**: `false`

### Errors

* [`ERR_UNSUPPORTED_FEATURE`](errors.md#ERR_UNSUPPORTED_FEATURE) -- This feature is not supported by this parser.
* [`ERR_INVALID_TYPE`](errors.md#ERR_INVALID_TYPE) -- the value provided was not of type boolean.

## Pragma `functional_dependencies` (feature)

Enable the `fd` processing instruction, as describe in [§&nbsp;Processing Instruction `fd`](grammar_pi.md#processing-instruction-fd)

**Default Value**: `false`

### Errors

* [`ERR_UNSUPPORTED_FEATURE`](errors.md#ERR_UNSUPPORTED_FEATURE) -- This feature is not supported by this parser.
* [`ERR_INVALID_TYPE`](errors.md#ERR_INVALID_TYPE) -- the value provided was not of type boolean.

## Pragma `negation` (feature)

Enable negated literals within a rule, as describe in [§&nbsp;Negation](grammar_literals.md#negation).

**Default Value**: `false`

### Errors

* [`ERR_UNSUPPORTED_FEATURE`](errors.md#ERR_UNSUPPORTED_FEATURE) -- This feature is not supported by this parser.
* [`ERR_INVALID_TYPE`](errors.md#ERR_INVALID_TYPE) -- the value provided was not of type boolean.

## Pragma `results`

Determines whether query results are displayed in DATALOG-TEXT or tabular form. The following are valid values for the `results` pragma. This specification does not define the default form; however, it is RECOMMENDED to use tabular form in interactive tools.

The following are valid values for the result pragma. The details of each supported results form is described in the appendix [§&nbsp;Result Formats](x_result_forms.md).

* `native` -- results are returned as constant values or facts; this format MUST be supported by a conforming DATALOG-TEXT processor that displays results in human-readable form.
* `tabular` -- results are returned in a tabular form; this format is optional but RECOMMENDED.

**Default Value**: undefined.

### Errors

* [`ERR_UNSUPPORTED_FEATURE`](errors.md#ERR_UNSUPPORTED_FEATURE) -- This feature is not supported by this parser.
* [`ERR_INVALID_TYPE`](errors.md#ERR_INVALID_TYPE) -- the value provided was not a string.
* [`ERR_INVALID_VALUE_FOR_TYPE`](errors.md#ERR_INVALID_VALUE_FOR_TYPE) -- Invalid value for the results form, see [§&nbsp;Result Formats](x_result_forms.md).

## Pragma `strict`

This enables the strict processing mode as described in [§&nbsp;Strict vs Lax Processing](conformance.md#strict-vs-lax-processing) in Conformance and [§&nbsp;Strict Processing](grammar_pi.md#strict-processing) in Processing Instructions.
This pragma MUST BE supported by a conforming DATALOG-TEXT processor.

**Default Value**: undefined.

### Errors

* [`ERR_INVALID_TYPE`](errors.md#ERR_INVALID_TYPE) -- the value provided was not of type boolean.

### Examples

The following program will signal an error as it is required that all relations be explicitly declared before use when in strict processing mode.

```datalog
.pragma strict.

human(socrates).
%% ==> ERR_PREDICATE_NOT_AN_EXTENSIONAL_RELATION
```

A similar error is signaled for intensional relations.

```datalog
.pragma strict.
.assert human(string).

human(socrates).
mortal(X) :- human(X) AND NOT home(olympus).
%% ==> ERR_PREDICATE_NOT_AN_INTENSIONAL_RELATION
```

Finally, errors are signaled for undeclared use of features.

```datalog
.pragma strict.
.assert human(string).
.assert home(string).
.infer mortal from human.

mortal(X) :- human(X) AND NOT home(olympus).
%% ==> ERR_FEATURE_NOT_ENABLED
```

The following is invalid.

```datalog
.pragma strict="yes".
%% ==> ERR_INVALID_TYPE
```

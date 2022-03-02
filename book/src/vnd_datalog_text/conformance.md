# Conformance

As well as sections marked as non-normative, all authoring guidelines, diagrams, examples, and notes in this specification are non-normative. Everything else in this specification is normative.

The keywords _MAY_, _MUST_, _MUST NOT_, _RECOMMENDED_, _SHOULD_, and _SHOULD NOT_ in this document are to be interpreted as described in [BCP 14](https://tools.ietf.org/html/bcp14) <span class="bibref inline">[RFC2119](x_references.md#RFC2119)</span> <span class="bibref inline">[RFC8174](x_references.md#RFC8174)</span> when, and only when, they appear in all capitals, as shown here.

A conforming DATALOG-TEXT _resource_ is a Unicode string that MUST conform to the grammar and additional constraints defined in [§&nbsp;Datalog Text Grammar](grammar.md), starting with the `program` production. 

A conforming DATALOG-TEXT _parser_ MUST ensure the resource it is provided is a conforming DATALOG-TEXT resource, signalling error conditions specified herein. Additionally, a conforming _resolver_ MUST be able to convert paths to URIs <span class="bibref inline">[RFC3986](x_references.md#RFC3986)</span> and retrieve the identified resource on behalf of the parser.

## Strict vs Lax Processing

Two modes of operation for a conforming DATALOG-TEXT processor are described, a **strict** processing mode that, while more verbose, relies less on inference of a program's semantics. For example, when strict processing is enabled all relations both extensional and intensional MUST BE declared by processing instructions.

Strict processing support is RECOMMENDED, and may be enabled by the `strict` pragma (See [§&nbsp;Strict Processing](grammar_pi.md#strict-processing)) in Processing Instructions. Where behavior is required by strict processing it will be highlighted in the text. This specification does not define whether a conforming DATALOG-TEXT processor is required to be strict by default.

## Media Type and Content Encoding

The media type of DATALOG-TEXT resource is `text/vnd.datalog`. The content encoding of a DATALOG-TEXT document is always UTF-8. For complete details, see appendix [§&nbsp;IANA Considerations](x_iana.md).

### `features` Parameter

This parameter is used to indicate the language features the resource requires. The content of this parameter is a comma separated list of feature identifiers. This is used as a hint to a conforming DATALOG-TEXT processor to determine if they can process the resource. 

While it is clearly of benefit for the set of features listed in this parameter to be **exactly** the same as those used in the document it is impossible to guarantee. Therefore, processors MAY choose to proceed parsing the resource or signal an error. 

#### Errors

Any feature identifier which is not known to the processor MUST signal the error `ERR_UNSUPPORTED_FEATURE`, even if it may be valid in some other version of this specification.

#### Example

The media type `text/vnd.datalog;features=negation,constraints` denotes a document with the following pragmas.

```datalog
.pragma negation.
.pragma constraints.
```

### `dialect` Parameter

An initial set of identifiers is included in the _non-normative_ [§&nbsp;Dialect Identifiers](dialects.md).

Any value that is not known to the processor MUST signal the error `ERR_UNSUPPORTED_DIALECT`, even if it may be valid in some other version of this specification.

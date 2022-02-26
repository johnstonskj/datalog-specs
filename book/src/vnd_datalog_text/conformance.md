# Conformance

As well as sections marked as non-normative, all authoring guidelines, diagrams, examples, and notes in this specification are non-normative. Everything else in this specification is normative.

The keywords _MAY_, _MUST_, _MUST NOT_, _RECOMMENDED_, _SHOULD_, and _SHOULD NOT_ in this document are to be interpreted as described in [BCP 14](https://tools.ietf.org/html/bcp14) <span class="bibref inline">[RFC2119](x_references.md#RFC2119)</span> <span class="bibref inline">[RFC8174](x_references.md#RFC8174)</span> when, and only when, they appear in all capitals, as shown here.

A conforming Datalog _resource_ is a Unicode string that MUST conform to the grammar and additional constraints defined in section [1.4. Datalog Text Grammar](grammar.md), starting with the `program` production. 

A conforming Datalog _parser_ MUST ensure the resource it is provided is a conforming Datalog resource, signalling error conditions specified herein. Additionally, a conforming _resolver_ MUST be able to convert paths to URIs <span class="bibref inline">[RFC3986](x_references.md#RFC3986)</span> and retrieve the identified resource on behalf of the parser.

## Media Type and Content Encoding

The media type of Datalog text document is `application/vnd.datalog+text`. The content encoding of a Datalog text document is always UTF-8. For complete details, see appendix [IANA Considerations](x_iana.md).

### `features` Parameter

The optional "features" parameter allows the transport to identify language features used within the representation. The value of this parameter is a comma-separated list of feature identifiers supported by this specification. If this parameter is specified more than once it's values MUST be aggregated into a set, removing duplicates.

Therefore, the type `application/vnd.datalog+text;features=negation` denotes a document with the following processing instruction.

```datalog
.features(negation).
```

The purpose of this parameter is to save a client from having to parse a document if the features identified in the parameter are unsupported by them.

### `dialect` Parameter

The "dialect" parameter identifies the tool which generated the document, there are some existing tools with extensive usage that deviate from this core specification. An initial set of identifiers is included in the _non-normative_ [Dialect Identifiers](dialects.md).

If this parameter is specified more than once, the first value MUST be used and any subsequent value MUST be discarded.


## Processing Instructions

Once a resource has been accepted for parsing it MAY include one or more [processing instructions](grammar_pi.md) that need to be executed before the handling of actual program data. These processing instructions, while not a part of the program per se, MAY alter the behavior of the program and MUST be handled by any parser. 
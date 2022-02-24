# Conformance

As well as sections marked as non-normative, all authoring guidelines, diagrams, examples, and notes in this specification are non-normative. Everything else in this specification is normative.

The keywords _MAY_, _MUST_, _MUST NOT_, _RECOMMENDED_, _SHOULD_, and _SHOULD NOT_ in this document are to be interpreted as described in [BCP 14](https://tools.ietf.org/html/bcp14) <span class="bibref inline">[RFC2119](x_references.md#RFC2119)</span> <span class="bibref inline">[RFC8174](x_references.md#RFC8174)</span> when, and only when, they appear in all capitals, as shown here.

## Media Type and Content Encoding

The media type of Datalog text document is `application/vnd.datalog+text`. The content encoding of a Datalog text document is always UTF-8.

The optional "features" parameter allows the transport to identify language features used within the representation. The value of this parameter is a comma-separated list of feature identifiers supported by this specification.

Therefore, the type `application/vnd.datalog+text;features=negation` denotes a document with the following processing instruction.

```datalog
.features(negation).
```

The purpose of this parameter is to save a client from having to parse a document if the features identified in the parameter are unsupported by them.
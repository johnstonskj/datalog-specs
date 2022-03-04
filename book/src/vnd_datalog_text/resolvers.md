# Resolvers

TBD

## URI References

Relative URIs are resolved with base URIs as per _Uniform Resource Identifier (URI): Generic Syntax_ <span class="bibref inline">[RFC3986](x_references.md#RFC3986)</span> using only the basic algorithm in section 5.2. Neither Syntax-Based Normalization nor Scheme-Based Normalization (described in sections 6.2.2 and 6.2.3 of RFC3986) are performed.

The [`base` pragma](pragmas.md#pragma-base) defines the Base URI used to resolve relative URIs per RFC3986 section 5.1.1, "_Base URI Embedded in Content_". Section 5.1.2, "_Base URI from the Encapsulating Entity_" defines how the In-Scope Base URI may come from an encapsulating document, such as a SOAP envelope with an `xml:base` directive or a mime multipart document with a `Content-Location` header. The "_Retrieval URI_" identified in 5.1.3, Base "_URI from the Retrieval URI_", is the URL from which a particular DATALOG-TEXT resource was retrieved. If none of the above specifies the Base URI, the default Base URI (section 5.1.4, "_Default Base URI_") is used. 

In the case that multiple `base` pragmas exist, each replaces the previous value.

### Content Negotiation

This section applies to URI schemes, such as `http` and `https` that provide content negotiation.

The resolver MAY use the provided media type to construct an HTTP `Accept` header for URIs with `http` or `https` schemes, see <span class="bibref inline">[RFC2616](x_references.md#RFC2616), section 14.1</span>, in this case `Accept: text/csv`.

In the following example no media type is provided. While the resolver MAY choose to use the extension value `.csv` to infer a media type it SHOULD instead construct an `Accept` header that lists all media types that the resolver supports.

```datalog
.assert human(name: string).
.input human(uri="http://example.com/data/humans").
```

### Examples

Given the following program, the input file is provided as an absolute URI and can be fetched directly. 
 
```datalog
.assert human(name: string).
.input human(uri="http://example.com/data/humans.csv", type="text/csv", header=present).
%% fetch: http://example.com/data/humans.csv
```

Given a relative URI, as shown below, the resolver requires a _base URI_ to determine the absolute URI to fetch. An explicit base URI may be provided using the `base` pragma, or some other means such as processor command-line parameters, environment variables, or the current working directory of the host process[^1].

```datalog
.pragma base="https://example.com/datalog/".
.assert human(name: string).
.input human(uri="data/humans.csv", type="text/csv", header=present).
```

```datalog
.assert human(name: string).
.input human(uri="data/humans.csv", type="text/csv", header=present).
```

## Dataset Media Types

The following media types are documented here, however only `text/csv` and `text/tab-separated-values` MUST be supported by a conforming DATALOG-TEXT processor.

| Media Type                | Short   | Parameters | Conform | Expectations                                                                      |
|---------------------------|---------|------------|---------|-----------------------------------------------------------------------------------|
| text/csv                  | csv     | header     | MUST    | See <span class="bibref inline">[RFC4180](x_references.md#RFC4180)</span>         |
| text/tab-separated-values | tsv     | ?          | MUST    | See <span class="bibref inline">[IANA-TSV](x_references.md#IANA-TSV)</span>       |
| application/json          | json    | N/A        | N/A     | See <span class="bibref inline">[RFC4627](x_references.md#RFC4627)</span>         |
| application/vnd.sqlite3   | sqlite3 | N/A        | N/A     | See <span class="bibref inline">[SQLITE3-URI](x_references.md#SQLITE3-URI)</span> |
| text/vnd.datalog          | datalog | N/A        | N/A     | Used on output only to write DATALOG-TEXT from an in-memory representation.       |

### Common Parameters

* `uri` -- this MUST BE interpreted as a URI <span class="bibref inline">[RFC3986](x_references.md#RFC3986)</span> and handled as per [§&nbsp;URI References](#uri-references) above.
* `type` -- this string value MUST BE either the type name and subtype name of a supported media type (i.e. `text/csv`) or one of the supported media type short form identifiers described in the [§&nbsp;Dataset Media Types](resolvers.md#dataset-media-types) table.

### Text/CSV

* `header` -- one of the following values `{present, absent}` from <span class="bibref inline">[RFC4180](x_references.md#RFC4180)</span>.
* `columns` -- a comma-separated list of either positive integers or inclusive range specifiers of the form `[min:max]` where min and max are optional positive integers. If min is not present it is assumed to be the initial attribute index of `1`, if max is not present it is assumed to the last attribute index $\small j$ in $\small\(\alpha_1,\ldots,\alpha_j\)$.

ERR_IO_INSTRUCTION_PARAMETER

#### Errors

#### Examples

```datalog
.assert human(name: string).
.input human( 
    uri="http://example.com/data/humans.csv", 
    type="text/csv", 
    columns="2",
    header=present).
```

### Text/TSV

* `columns` -- see [§&nbsp;Text/CSV](#textcsv).

According to See <span class="bibref inline">[IANA-TSV](x_references.md#IANA-TSV)</span> the `tsv` production (copied below) the name line MUST BE present and so no `header` parameter is exposed for this type. 

```ebnf
tsv      ::= nameline record+ ;
```

#### Examples

```datalog
.assert car(make: string, model: string, year: integer).
.input human( 
    uri="http://example.com/data/humans.tsv", 
    type="text/tab-separated-values", 
    columns="[1:2],4").
```

### Application/JSON

_This section is non-normative._

### Application/SQLite3

_This section is non-normative._

* `table` -- the name of the table in the database to read from, or write to. If missing the processor MAY use the relation name as the table name, or MAY signal the error `ERR_IO_INSTRUCTION_PARAMETER`.
* `columns` -- a comma-separated list of column names in the table, these are matched positionally with relation attributes. If missing the processor MAY use the attribute names as column names, or MAY signal the error `ERR_IO_INSTRUCTION_PARAMETER`.

According to <span class="bibref inline">[SQLITE3-URI](x_references.md#SQLITE3-URI)</span> the URI specified for the database location MUST have the scheme `file` <span class="bibref inline">[RFC8089](x_references.md#RFC8089)</span>.

A conforming DATALOG-TEXT processor MAY choose to validate these parameters at parse time or MAY wait until the actual input/output operation is required. In either case if the processor determines that the table or columns specified in these parameters does not match the schema of the relation the processor MUST signal the error `ERR_IO_INSTRUCTION_PARAMETER`.

#### Example

In the following the intensional relation `mortal` is output to a SQLite database.

```datalog
.infer mortal(name: string).
.output mortal( 
    uri="file:///var/db/results.sql?cache=private&mode=rwc", 
    type="application/vnd.sqlite3",
    table="mortals",
    columns="short_name").
```

### Text/Datalog

_This section is non-normative._

----------

[^1]: See The Open Group [man page](https://pubs.opengroup.org/onlinepubs/007904975/functions/getcwd.html) for the `getcwd()` function.
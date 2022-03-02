# Resolvers

TBD

## IRI References

TBD


### Examples

Given the following program, the input file is provided as an absolute URI <span class="bibref inline">[RFC3986](x_references.md#RFC3986)</span> and can be fetch as such. 
 
```datalog
.assert human(name: string).
.input(human, "http://example.com/data/humans.csv", "text/csv", header=present).
%% fetch: http://example.com/data/humans.csv
```

Given a relative URI, as shown below, the resolver requires a _base URI_ to determine the absolute URI to fetch. An explicit base URI may be provided using the `base` pragma, or some other means such as processor command-line parameters, environment variables and so forth.

```datalog
.pragma base(iri="https://example.com/datalog/").
.assert human(name: string).
.input(human, "data/humans.csv", "text/csv", header=present).
```

```datalog
.assert human(name: string).
.input(human, "data/humans.csv", "text/csv", header=present).
```

```datalog
.assert human(name: string).
.input(human, "data/humans.csv", "text/csv", header=present).
```


```datalog
.assert human(name: string).
.input(human, "data/humans.csv", "text/csv", header=present).
```

## Media Types

The following media types MUST BE supported by a conforming DATALOG-TEXT processor.

| Media Type                  | Short Form | Parameters      | Expectations                                                                      |
|-----------------------------|------------|-----------------|-----------------------------------------------------------------------------------|
| `text/csv`                  | `csv`      | charset, header | See <span class="bibref inline">[RFC4180](x_references.md#RFC4180)</span>         |
| `text/tab-separated-values` | `tsv`      | ?               | See <span class="bibref inline">[IANA-TSV](x_references.md#IANA-TSV)</span>       |

The following media types MAY BE supported by a conforming DATALOG-TEXT processor; however, the mapping from relation structure and rule to these representations will be implementor defined.

| Media Type                | Short Form  | Parameters | Expectations                                                                      |
|---------------------------|-------------|------------|-----------------------------------------------------------------------------------|
| `application/json`        | `json`      | N/A        | See <span class="bibref inline">[RFC4627](x_references.md#RFC4627)</span>         |
| `application/vnd.sqlite3` | `sqlite3`   | See -->    | See <span class="bibref inline">[SQLITE3-URI](x_references.md#SQLITE3-URI)</span> |
| `text/vnd.datalog`        | `datalog`   | N/A        | Used on output only to write DATALOG-TEXT from an in-memory representation.       |

### Examples

The resolver MAY also use the provided media type to construct an HTTP `Accept` header, see <span class="bibref inline">[RFC2616](x_references.md#RFC2616), section 14.1</span>, in this case `Accept: text/csv`.

```datalog
.assert human(name: string).
.input(human, "http://example.com/data/humans.csv", "text/csv", header=present).
```

In the following example no media type is provided. While the resolver MAY choose to use the extension value `.csv` to infer a media type it SHOULD instead construct an `Accept` header that lists all media types that the resolver supports.

```datalog
.assert human(name: string).
.input(human, "http://example.com/data/humans.csv").
```

In the following the intensional relation `mortal` is output to a SQLite database.

```datalog
.infer mortal(name: string).
.output(human, "db/results.sql", "application/vnd.sqlite3", cache=private, mode=rwc).
```

----------

[^1]: From The Open Group [man page](https://pubs.opengroup.org/onlinepubs/007904975/functions/getcwd.html) for the `getcwd()` function.
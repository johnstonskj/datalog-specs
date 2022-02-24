# Dialect Identifiers

_This section is non-normative._

| Identifier  | Tool(s)                                    | Source             | Normative? | Date          | 
|-------------|--------------------------------------------|--------------------|------------|---------------|
| `core`      | N/A                                        | This specification | Yes        | XX March 2022 |
| `souffle`   | [Soufflé](https://souffle-lang.github.io/) |                    | No         | XX March 2022 |

Note that the absence of the `dialect` parameter on the MIME type is the same as using the value `core`. The following values are therefore equivalent.

```text
application/vnd.datalog+text
application/vnd.datalog+text;dialect=core
```
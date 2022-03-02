# Dialect Identifiers

_This section is non-normative._

| Identifier  | Source                                           | Date          | 
|-------------|--------------------------------------------------|---------------|
| `core`      | This specification                               | XX March 2022 |
| `souffle`   | [Soufflé](https://souffle-lang.github.io/)       | XX March 2022 |

Note that the absence of the `dialect` parameter on the MIME type is the same as using the value `core`. The following values are therefore equivalent.

```text
text/vnd.datalog
text/vnd.datalog;dialect=core
```
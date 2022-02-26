# Resolvers


## IRI References

## Media Types


| Media Type                  | Short Form | Parameters      | Expectations                                                                |
|-----------------------------|------------|-----------------|-----------------------------------------------------------------------------|
| `text/csv`                  | `csv`      | charset, header | See <span class="bibref inline">[RFC4180](x_references.md#RFC4180)</span>   |
| `text/tab-separated-values` | `tsv`      | ?               | See <span class="bibref inline">[IANA-TSV](x_references.md#IANA-TSV)</span> |
| `application/json`          | `json`     | N/A             | See <span class="bibref inline">[RFC4627](x_references.md#RFC4627)</span>   |

**Example**

```datalog
.assert human(name: string).
.input(human, "data/humans.csv", "text/csv", header=present).
```

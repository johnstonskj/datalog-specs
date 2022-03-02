# Basic Concepts

_This section is non-normative._

The following graph is an alternative representation of the [abstract syntax](../datalog/abstract.md). It represents
_leaf values_ (constants, variables, ...) in rectangles and _composite values_ as ellipses. Additionally, where a
composite is defined as $\small A \oplus B$ a small filled diamond shape represents the exclusive or relationship.
Finally, some edges in the graph are labeled with "`*`", "`+`", and "`?`" which are the common cardinality notation used
in regular expressions and BNF notation.

[![Abstract Graph](abstract_graph.svg)](abstract_graph.svg)

<div class="caption figure">Abstract Graph View</div>

**Notes**

1. The edge between _rule_ and _head_ has the label "`?/*`" as it has differing cardinality under $\small\text{Datalog}$,
   $\small\text{Datalog}^{\lor}$, and $\small\text{Datalog}^{\Leftarrow}$.
2. The edge between _literal_ and _negated?_ is labeled as "`?`" as it is necessary under $\small\text{Datalog}^{\lnot}$
   but not under $\small\text{Datalog}$.
3. The edge from the choice between _literal_ and _comparison_ is labeled as "`?`" as it is necessary under
   $\small\text{Datalog}^{\theta}$ but not under $\small\text{Datalog}$.
4. The two dashed lines represent the following constraints.
    1. Between _relation_ and _predicate_ to represent the fact that the predicate for a relation may be derived from the
       predicate of the _atoms_ within it (or vice versa).
    2. Between _head_ and _body_ to represent the fact that while both are optional for a _rule_, one or other must be
       present.

## Brief Semantics

_This section is non-normative._

### Program

A $\small\text{Datalog}$ program $\small P$ is a tuple comprising the extensional **database**, EDB, or  $\small D_{E}$, the intensional **database**, IDB, or  $\small D_{I}$, and a set of **queries** $\small Q$.

$$\small P=\(D_{E}, D_{I}, Q\)$$

The extensional database is a set of (extensional-) **relations**.

The intensional database is a set of **rules** for constructing additional (intensional-) **relations**.

### Relation

A relation is a tuple comprising a unique label $\small l$, a **schema** $\small \Alpha$, and a set of facts $\small F\$.

$$R = (l, \Alpha, F)$$

Relation labels are _predicates_, strings of characters  and underscores starting with a lower case character. 

### Schema

A relation's schema $\small\Alpha$ describes the attributes $\small\lbrace\alpha_1,\ldots,\alpha_j\rbrace$ that make up the relation. Each attribute $\small\alpha_i$ has a type and an optional label.

A relation's schema in $\small\text{Datalog}^{\rightarrow}$ is extended to support **functional dependencies**.

### Fact

A fact is an **atom** where all **terms** are constant values, not variables.

### Atom

An atom is a predicate-labeled tuple of **terms** $\small\lbrace t_1,\ldots,t_j\rbrace$. The atom's label identifies the relation to which it belongs. Therefore, each term $\small t_i$ MUST conform to the relation's schema attribute $\small \alpha_i$.

### Term

A term is a either a constant value, or a variable. 

A variable is a strings of characters and underscores starting with an upper case character.

### Rule

A rule takes the form `IF antecedence THEN consequence` where the consequence is the head of the rule before the material implication symbol and the antecedence is the body of the rule after the material implication symbol.

The consequence, or head, of the rule $\small r$ is the disjunction of atoms $\small A_1 \ldots, A_m$ and the antecedence, or body, of the rule is the conjunction of **literals** $\small L_1, \ldots, L_n$.

$$r=\small A_1, \lor \ldots, \lor A_m \leftarrow L_1, \land \ldots, \land L_n$$

* In $\small\text{Datalog}$ only a single atom MUST be present in the head; $\small m=1$.
* In $\small\text{Datalog}^{\lor}$ one or more atoms MAY be present in the head; $\small m \geq 1$.
* In $\small\text{Datalog}^{\Leftarrow}$ a single atom MAY or MAY NOT be present in the head; $\small m \leq 1$.

### Literal

A literal is either relation or **arithmetic** where a relational literal is simply an atom.

Arithmetic literals are present only in $\small\text{Datalog}^{\theta}$

In $\small\text{Datalog}^{\lnot}$ a literal may be positive or negative (a negated literal).

### Arithmetic Literal

An arithmetic literal takes the form $\small \(t_{lhs}, \theta, t_{rhs}\)$ where $\small t_{lhs}$ and $\small t_{rhs}$ are terms and $\small\theta$ is a binary comparison operation (equal, less-than, etc.).

### Query

A query is an atom which acts as a goal and returns any facts that match its terms.

### Functional Dependency

A functional dependency is a uniqueness constraint for a relation of the form $\small R: \alpha \longrightarrow \beta$ with the set $\small\alpha$ or determinant and the set $\small\beta$ or dependent of attributes in the schema of $\small R$.

This relationship denotes that for the relation $\small R$, every valid combination of determinant values uniquely determines the value of the dependent values.



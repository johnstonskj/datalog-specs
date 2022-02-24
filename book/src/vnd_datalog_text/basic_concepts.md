# Basic Concepts

A Datalog **Program** $\small P$ is a tuple comprising the **Extensional** database, EDB, or  $\small D_{E}$, the
**Intensional** database, IDB, or  $\small D_{I}$, and a set of queries $\small Q$.

$$\tag{0}\small P=\( D_E, D_I, Q \)$$

The extensional database in turn is a set of _relations_ each of which is a set of _facts_ (_ground atoms_). The intensional database is a set of _rules_ that derive additional facts into intensional _relations_ via entailment. 

Every relation $\small r$ has a schema that describes a set of attributes $\small \lbrace \alpha_1, \ldots, \alpha_j \rbrace$, and each attribute may be labeled, and may also have a type. In general, we refer to attributes by index, a value in $\small 1, \cdots, j$.

Datalog **Rules** $\small R$ are built from a language $\small \mathcal{L}=\( \mathcal{C},\mathcal{P},\mathcal{V}\)$ that contains the

* $\small \mathcal{C}$ — the finite sets of symbols for all constant values; e.g. hello, "hi" 123,
* $\small \mathcal{P}$ — the finite set of alphanumeric character strings that begin with a lowercase character; e.g. human, size, a,
* $\small \mathcal{V}$ — the finite set of alphanumeric character strings that begin with an uppercase character; e.g. X, A, Var.

Atoms are comprised of a label, $\small p \in \mathcal{P}$, and a tuple of terms. A set of atoms form a Relation if each conforms to the schema of the relation. The form of an individual atom is as follows:

$$\tag{ix}\small p\(t_1, \ldots, t_k\)$$


Terms, mentioned above, may be constant values or variables such that $\small\mathcal{T}=\mathcal{C}\cup\mathcal{V}\cup\bar{t}$ where $\small\bar{t}$ represents an anonymous variable.

Literals within the body of a rule, represent sub-goals that are the required to be true for the rule's head to be considered true. A literal may be an atom (termed a relational literal) or, in $\small\text{Datalog}^{\theta}$, a conditional expression (termed an arithmetic literal),

Any ground rule where $\small m=1$ and where $\small n=0$ is termed a Fact as it is true by nature of having an empty body, or alternatively we may consider the body be comprised of the truth value $\small\top$.

An atom may be also used as a Goal or Query clause in that its constant and variable terms may be used to match facts from the known facts or those that may be inferred from the set of rules introduced. A ground goal is simply determining that any fact exists that matches all the constant values provided and will return true or false. In the case that one or more variables exist a set of facts will be returned that match the expressed constants and provide the corresponding values for the variables.


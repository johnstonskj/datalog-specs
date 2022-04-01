# Appendix: IANA Considerations

This section has been submitted to the Internet Engineering Steering Group (IESG)[^1] for review, approval, and registration with IANA[^2].

## application/vnd.datalog

<dl>
    <dt>Type name:</dt>
    <dd><code>application</code></dd>
    <dt>Subtype name:</dt>
    <dd><code>vnd.datalog</code></dd>
    <dt>Required parameters:</dt>
    <dd>None.</dd>
    <dt>Optional parameters:</dt>
    <dd>

`features`

The optional "features" parameter allows the transport to identify language features used within the representation. The value of this parameter is a comma-separated list of feature identifiers supported by this specification. The purpose of this parameter is to save a client from having to parse a document if the features identified in the parameter are unsupported by them.

If this parameter is specified more than once its values MUST be aggregated into a set, removing duplicates.

`dialect`

This parameter identifies the tool which generated the document, there are some existing tools with extensive usage that deviate from this core specification.

If this parameter is specified more than once, the first value MUST be used and any subsequent value MUST be discarded.
    </dd>
    <dt>Encoding considerations:</dt>
    <dd>The content encoding of a Datalog text document is always UTF-8.</dd>
    <dt>Security considerations:</dt>
    <dd>
This media type does include program code for a Datalog interpreter to
execute. However, as Datalog is a restricted deductive logic language
its execution environment is limited to entailment and query, and not
capable of general purpose programming.

The Datalog language does contain references to additional resources
that may be required to complete a program. For example, an "input"
processing instruction will add facts from an external resource (using
IRIs) to an extensional relation whereas the "output" processing
instruction will be some local resource that may be written to. The
ability to include malicious data in an input file is limited by the
supported representations such as CSV. The ability to write to a local
system may be intercepted by a parser to redirect to safe locations,
and as such the allowed reference is always relative.

This media type requires no privacy or integrity services.
    </dd>
    <dt>Interoperability considerations:</dt>
    <dd>
A number of vendors have extended Datalog with additional syntax, this has been
a general problem for some years. The introduction of a common standard, and
support for the "dialect" parameter will help clients understand the potential
parsing issues of a specific document.
    </dd>
    <dt>Intended usage:</dt>
    <dd>Common -- For the interchange of Datalog programs.</dd>
    <dt>Applications which use this media:</dt>
    <dd>Applications that need to upload, download, or transfer Datalog programs.</dd>
    <dt>Fragment identifier considerations:</dt>
    <dd>None.</dd>
    <dt>Restrictions on usage:</dt>
    <dd>None.</dd>
    <dt>Published specification:</dt>
    <dd>
    [https://datalog-specs.info/vnd_datalog_text/abstract.html](https://datalog-specs.info/vnd_datalog_text/abstract.html) (not yet complete).
    </dd>
    <dt>Additional information:</dt>
    <dd>
        <dl>
            <dt>Magic number(s):</dt>
            <dd>None.</dd>
            <dt>File extension(s):</dt>
            <dd>dl</dd>
            <dt>Macintosh file type code:</dt>
            <dd>TEXT</dd>
        </dl>
    </dd>
    <dt>General Comments:</dt>
    <dd>None.</dd>
    <dt>Provisional registration? (standards tree only):</dt>
    <dd>N/A</dd>
    <dt>Author/Change controller:</dt>
    <dd>N/A</dd>
</dl>

<p>&nbsp;</p>

----------

[^1]: See [https://www.ietf.org/about/groups/iesg/](https://www.ietf.org/about/groups/iesg/).

[^2]: According to <span class="bibref inline">[RFC1590](x_references.md#RFC1590)</span>, and [Application for a Media Type](https://www.iana.org/form/media-types).

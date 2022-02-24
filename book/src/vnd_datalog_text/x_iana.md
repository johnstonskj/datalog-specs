# Appendix: IANA Considerations

This section has been submitted to the Internet Engineering Steering Group (IESG) for review, approval, and registration with IANA.

## application/vnd.datalog+text

<dl>
    <dt>Type name:</dt>
    <dd>application</dd>
    <dt>Subtype name:</dt>
    <dd>vnd.datalog+text</dd>
    <dt>Required parameters:</dt>
    <dd>None.</dd>
    <dt>Optional parameters:</dt>
    <dd>

`features`

This parameter allows the transport to identify language features used within the representation. The value of this parameter is a comma-separated list of feature identifiers supported by the specification.
        
`dialect`

This parameter identifies the tool which generated the document, there are some existing tools with extensive usage that deviate from this core specification.
    </dd>
    <dt>Encoding considerations:</dt>
    <dd>The content encoding of a Datalog text document is always UTF-8.</dd>
    <dt>Security considerations:</dt>
    <dd>None.</dd>
    <dt>Interoperability considerations:</dt>
    <dd>
A number of vendors have extended Datalog with additional syntax, this has been
a general problem for some years. The introduction of a common standard, and
support for the "dialect" parameter will help clients understand the potential
parsing issues of a specific document.
</>
    <dt>Intended usage:</dt>
    <dd>Common -- For the interchange of Datalog programs</dd>
    <dt>Applications which use this media:</dt>
    <dd>Applications that need to upload, download, or transfer Datalog programs.</dd>
    <dt>Fragment identifier considerations:</dt>
    <dd>None.</dd>
    <dt>Restrictions on usage:</dt>
    <dd>None.</dd>
    <dt>Published specification:</dt>
    <dd>[https://datalog-specs.info/vnd_datalog_text/abstract.html](https://datalog-specs.info/vnd_datalog_text/abstract.html) (not yet complete)</dd>
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

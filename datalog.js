/*
Language: Datalog
Author: Simon Johnston <johnstonskj@gmail.com>
Website: https://github.com/johnstonskj/rust-asdi
Category: logic
*/

hljsDatalog = function(hljs) {

  const PROLOG_LINE_COMMENT = {
    scope: 'comment',
    begin: '%',
    end: '$',
  };

  const PREDICATE = {
    scope: 'title.function.invoke',
    begin: /[a-z][A-Za-z0-9_]*/,
    relevance: 0
  };

  const VAR = {
    scope: 'variable',
    variants: [
      {
        begin: /[A-Z][a-zA-Z0-9_]*/
      },
      {
        begin: /_/
      }
    ],
    relevance: 0
  };

  const BOOLEAN = {
    scope: 'literal',
    begin: /(true|false)/
  };

  const SYMBOL_STRING = {
    scope: 'string',
    begin: /[a-z][A-Za-z0-9_]*(:[A-Za-z][A-Za-z0-9_]*)?/,
    relevance: 0
  };

  const REL_TYPES = {
    scope: 'types',
    begin: /string|integer|boolean/,
    relevance: 1
  };

  const REL_SEPARATOR = {
    scope: 'punctuation',
    begin: /:/
  };

  const INFER_FROM = {
    scope: 'keyword',
    begin: /from/,
    relevance: 1,
  };

  const PRAGMA_LIST = {
    scope: 'punctuation',
    begin: /\(/,
    end: /\)/,
    relevance: 0,
    contains: [
      PROLOG_LINE_COMMENT,
      hljs.C_BLOCK_COMMENT_MODE,
      REL_TYPES,
      REL_SEPARATOR,
      BOOLEAN,
      SYMBOL_STRING,
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE
    ]
  };

  const PRAGMA = {
    beginScope: 'meta',
    begin: /\.[a-z]+/,
    end: /\./,
    contains: [
      PROLOG_LINE_COMMENT,
      hljs.C_BLOCK_COMMENT_MODE,
      INFER_FROM,
      PREDICATE,
      PRAGMA_LIST,
      hljs.QUOTE_STRING_MODE,
    ],
    relevance: 0
  };

  const TERM_LIST = {
    scope: 'punctuation',
    begin: /\(/,
    end: /\)/,
    relevance: 0,
    contains: [
      PROLOG_LINE_COMMENT,
      hljs.C_BLOCK_COMMENT_MODE,
      VAR,
      BOOLEAN,
      SYMBOL_STRING,
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE
    ]
  };

  const IMPLICATION = {
    scope: 'keyword',
    begin: /:\-|<\-|⟵|\?\-?/
  };

  const CONNECTIVE = {
    scope: 'keyword',
    begin: /,|&|AND|∧|∨|OR|!|￢|NOT/
  };

  const COMPARISON_OP = {
    scope: 'operator',
    begin: /=|!=|\/=|<|<=|≤|>|>=|≥|\*=|≛|MATCHES/
  };

  const LINE_TERMINATOR = {
    scope: 'punctuation',
    begin: /\./
  };

  return {
    name: 'Datalog',
    contains: [
      PROLOG_LINE_COMMENT,
      hljs.C_BLOCK_COMMENT_MODE,
      PRAGMA,
      PREDICATE,
      TERM_LIST,
      IMPLICATION,
      CONNECTIVE,
      COMPARISON_OP,
      LINE_TERMINATOR,
      VAR,
      BOOLEAN,
      SYMBOL_STRING,
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE
    ]
  };
}

// module.exports = hljsDatalog;

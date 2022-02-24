# datalog-specs

GitHub Pages site for [datalog-spec.info ](https://datalog-spec.info).

## Building Locally

The book uses [mdbook](https://rust-lang.github.io/mdBook/) for formatting and once installed the following is all that's
necessary to compile to HTML. To install, ensure you have the Rust toolchain and use the following.

```bash
❯ cargo install mdbook
```


```bash
❯ cd book
❯ mdbook build
2020-07-30 08:40:23 [INFO] (mdbook::book): Book building has started
2020-07-30 08:40:23 [INFO] (mdbook::book): Running the html backend
```

The following will start a local server to host the built content. This command also watches the source file system for
changes and performs a build on any updates.

```bash
❯ mdbook serve
2020-07-30 08:40:54 [INFO] (mdbook::book): Book building has started
2020-07-30 08:40:54 [INFO] (mdbook::book): Running the html backend
2020-07-30 08:40:54 [INFO] (mdbook::cmd::serve): Serving on: http://localhost:3000
2020-07-30 08:40:54 [INFO] (warp::server): Server::run; addr=V6([::1]:3000)
2020-07-30 08:40:54 [INFO] (warp::server): listening on http://[::1]:3000
2020-07-30 08:40:54 [INFO] (mdbook::cmd::watch): Listening for changes...
```


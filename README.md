# Install Rust

Solana programs are built in Rust! If you don't know Rust, you can read _The Book_ [here](https://doc.rust-lang.org/book).

To install Rust just follow up [this](https://doc.rust-lang.org/book/ch01-01-installation.html) documentation.

# Install Solana CLI

We'll be using a nice CLI created by Solana, you can see installation instruction by looking [here](https://docs.solana.com/cli/install-solana-cli-tools#use-solanas-install-tool).

After installing the Solana CLI, run this command:

```sh
solana config set --url localhost
```

And now run this to make sure if we can get a local node up and running:

```sh
solana-test-validator
```

# Install Archor

Archor is like Hardhat for Solana, and to install you can just run this:

```sh
cargo install --git https://github.com/project-serum/anchor anchor-cli --locked
```

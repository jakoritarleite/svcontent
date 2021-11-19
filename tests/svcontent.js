const anchor = require('@project-serum/anchor');

const { SystemProgram } = anchor.web3;

const main = async () => {
    console.log('Starting the tests for svcontent');

    const provider = anchor.Provider.env();
    anchor.setProvider(provider);

    const program = anchor.workspace.Svcontent;

    // Create an account keypair for our program to use.
    const baseAccount = anchor.web3.Keypair.generate();
    const tx = await program.rpc.initialize({
        accounts: {
            baseAccount: baseAccount.publicKey,
            user: provider.wallet.publicKey,
            systemProgram: SystemProgram.programId
        },
        signers: [baseAccount]
    });
    console.log('Transaction signature is', tx);

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('The GIF counting is', account.totalGifs.toString());
}

const run = async () => {
    try {
        await main();
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

run();
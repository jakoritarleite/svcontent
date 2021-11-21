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

    let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('The GIF counting is', account.totalGifs.toString());

    await program.rpc.addGif("https://64.media.tumblr.com/03c78ec58da338fa128cb3e16cd5b4c2/tumblr_mzfa8lvm0l1qgrc4mo1_500.gif", {
        accounts: {
            baseAccount: baseAccount.publicKey,
            user: provider.wallet.publicKey,
        }
    });

    account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('The GIF counting is', account.totalGifs.toString());

    console.log('The GIF list', account.gifList);

    console.log('Upvoting');
    await program.rpc.upvote("https://64.media.tumblr.com/03c78ec58da338fa128cb3e16cd5b4c2/tumblr_mzfa8lvm0l1qgrc4mo1_500.gif", {
        accounts: {
            baseAccount: baseAccount.publicKey,
            user: provider.wallet.publicKey,
        }
    });

    account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('The GIF counting is', account.totalGifs.toString());

    console.log('The GIF list', account.gifList);
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
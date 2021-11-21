use anchor_lang::prelude::*;

declare_id!("eY9Ed7FJAeKTRaHU6qYNnip14SMd7FUpHY32vHTB47D");

#[program]
pub mod svcontent {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;
        base_account.total_gifs = 0;

        Ok(())
    }

    pub fn add_gif(ctx: Context<AddGif>, gif_link: String) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;
        let user = &mut ctx.accounts.user;

        let item = Item {
            upvotes: vec![],
            gif_link: gif_link.to_string(),
            user_address: *user.to_account_info().key
        };

        base_account.gif_list.push(item);
        base_account.total_gifs += 1;

        Ok(())
    }

    pub fn upvote(ctx: Context<UpvoteFn>, content_to_upvote: String) -> ProgramResult {
        let gif_list = &mut ctx.accounts.base_account.gif_list;
        let user = &mut ctx.accounts.user;

        for content in &mut gif_list.iter_mut() {
            if content.gif_link == content_to_upvote {
                content.upvote(Upvote {
                    user_address: *user.to_account_info().key
                });
            }
        }

        Ok(())
    }
}

impl Item {
    fn upvote(&mut self, new_upvote: Upvote) {
        self.upvotes.push(new_upvote);
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 9000)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddGif<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
    pub user: Signer<'info>
}

#[derive(Accounts)]
pub struct UpvoteFn<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
    pub user: Signer<'info>
}

#[account]
pub struct BaseAccount {
    pub total_gifs: u64,
    pub gif_list: Vec<Item>
}

#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct Upvote {
    pub user_address: Pubkey
}

#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct Item {
    pub upvotes: Vec<Upvote>,
    pub gif_link: String,
    pub user_address: Pubkey
}
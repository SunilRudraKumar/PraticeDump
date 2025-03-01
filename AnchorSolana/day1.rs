use anchor_lang::prelude::*;
use anchor_lang::system_program:;{transfer, Transfer};

declare_id!("thisIsTheProgramID");

#[program]
pub mod vault{
    use super::*;

    pub fn initialize(ctx: Context<Intialize>) -> Result<()> {
        let _ = ctx.accounts.initialize(ctx.bumps);
        Ok(())

    }

    pub fn deposit(ctx: Context<Deposit> , amount: u64) -> Result<()>{
        let _ = ctx.account.deposit(amount);
        Ok(())
    }

    pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()>{
        let _ = ctx.account.withdraw(amount);
        Ok(())
    }

    pub fn close(ctx: Context<Close>)-> Result<()>{
        let _ = ctx.account.close();
        Ok(())
    }
}


#[account]
#[derive(InitSpace)]
pub struct VaultState {
    pub vault_bump: u8,
    pub state_bump: u8,
}

#[derive(Accounts)]
pub stuct Initialize<'info>{

    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(
        init,
        payer = signer,
        space = 8 + VaultState::INIT_SPACE,
        seeds = [b"state", signer.key().as_ref()],
        bump
    )]
    pub vault_state: Account<'info, VaultState>,

    #[account(
        seeds = [b"vault", vault_state.key().as_ref()],
        bump
    )]
    pub vault: SystemAccount<'info>,

    pub sytem_program: Program<'info, System>,

}


impl<'info> Intialize<'info>{
    pub fn initialize(&mut self, bumps: InitializeBumps) -> Result<()>{
        self.vault_state.vault_bump = bumps.vault;
        self.vault_state.state_bump = bumps.vault_state;
        Ok(())
    }
}




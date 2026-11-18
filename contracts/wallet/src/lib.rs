#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, Address, Env, Symbol};

#[contract]
pub struct WalletContract;

#[contractimpl]
impl WalletContract {
    pub fn initialize(env: Env, admin: Address) {
        env.storage().instance().set(&symbol_short!("admin"), &admin);
    }

    pub fn version() -> Symbol {
        symbol_short!("v0_1_0")
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_version() {
        assert_eq!(WalletContract::version(), symbol_short!("v0_1_0"));
    }
}

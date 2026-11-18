#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, Symbol};

#[contract]
pub struct RewardsContract;

#[contractimpl]
impl RewardsContract {
    pub fn version() -> Symbol {
        symbol_short!("v0_1_0")
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::symbol_short;

    #[test]
    fn test_version() {
        assert_eq!(RewardsContract::version(), symbol_short!("v0_1_0"));
    }
}

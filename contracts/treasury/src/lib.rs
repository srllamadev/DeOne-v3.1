#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, Symbol};

#[contract]
pub struct TreasuryContract;

#[contractimpl]
impl TreasuryContract {
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
        assert_eq!(TreasuryContract::version(), symbol_short!("v0_1_0"));
    }
}

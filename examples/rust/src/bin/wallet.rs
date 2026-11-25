use std::sync::Arc;

use kaspa_wallet_core::prelude::{
    kaspa_to_sompi, AccountKind, AccountsEstimateRequest, AccountsSendRequest, Address,
    EncryptionKind, Events, Fees, PaymentOutputs, Secret, Wallet, WalletApi, WalletCreateArgs,
};
use kaspa_wrpc_client::{
    prelude::{NetworkId, NetworkType},
    Resolver,
};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let network_id = NetworkId::new(NetworkType::Mainnet);
    let wallet_secret = Secret::from("replace-with-wallet-secret");
    let filename = "wallet-example".to_string();
    let recipient = Address::try_from("kaspatest:replace-with-recipient")?;
    let payload = Some(b"order:1337".to_vec());
    let broadcast = false;

    let wallet = Arc::new(Wallet::try_new(
        Wallet::local_store()?,
        Some(Resolver::default()),
        Some(network_id),
    )?);

    let receiver = wallet.multiplexer().channel().receiver.clone();
    let event_task = tokio::spawn(async move {
        while let Ok(event) = receiver.recv().await {
            match event.as_ref() {
                Events::Balance { .. }
                | Events::Discovery { .. }
                | Events::Error { .. }
                | Events::Pending { .. }
                | Events::Maturity { .. } => println!("[wallet-event] {event:?}"),
                _ => {}
            }
        }
    });

    let wallet_exists = wallet
        .clone()
        .wallet_enumerate()
        .await?
        .iter()
        .any(|descriptor| descriptor.filename == filename);

    if !wallet_exists {
        wallet
            .clone()
            .wallet_create(
                wallet_secret.clone(),
                WalletCreateArgs::new(
                    Some("Wallet example".to_string()),
                    Some(filename.clone()),
                    EncryptionKind::XChaCha20Poly1305,
                    None,
                    false,
                ),
            )
            .await?;
    } else {
        wallet
            .clone()
            .wallet_open(wallet_secret.clone(), Some(filename.clone()), false, false)
            .await?;
    }

    wallet
        .clone()
        .accounts_ensure_default(
            wallet_secret.clone(),
            None,
            AccountKind::from("bip32"),
            None,
        )
        .await?;

    wallet.clone().connect(None, &network_id).await?;
    wallet.start().await?;

    let account = wallet
        .clone()
        .accounts_enumerate()
        .await?
        .into_iter()
        .next()
        .expect("wallet should contain a default account");

    wallet
        .clone()
        .accounts_activate(Some(vec![account.account_id]))
        .await?;

    println!("Send from: {:?}", account.receive_address);

    let destination = PaymentOutputs::from((recipient, kaspa_to_sompi(1.0))).into();

    if broadcast {
        let result = wallet
            .clone()
            .accounts_send(AccountsSendRequest {
                account_id: account.account_id,
                wallet_secret,
                payment_secret: None,
                destination,
                fee_rate: None,
                priority_fee_sompi: Fees::None,
                payload: payload.clone(),
            })
            .await?;

        println!("{result:#?}");
    } else {
        let result = wallet
            .clone()
            .accounts_estimate_call(AccountsEstimateRequest {
                account_id: account.account_id,
                destination,
                fee_rate: None,
                priority_fee_sompi: Fees::None,
                payload,
            })
            .await?;

        println!("{:#?}", result.generator_summary);
        println!("Set broadcast = true in this file to submit the transaction.");
    }

    event_task.abort();
    wallet.stop().await?;
    wallet.clone().disconnect().await?;
    wallet.clone().wallet_close().await?;

    Ok(())
}

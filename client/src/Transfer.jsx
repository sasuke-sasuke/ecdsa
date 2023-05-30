import { useState } from "react";
import server from "./server";
import { createSignature, getPublicKey, verifySignature } from "./helpers";

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [signature, setSignature] = useState("");
  const [sender, setSender] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [verify, setVerify] = useState(false);

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
      });

      setPrivateKey(prompt("Enter your private key: "));
      setSignature(createSignature(sendAmount, privateKey));
      setSender(getPublicKey(privateKey));
      try {
        setVerify(verifySignature(sendAmount, signature, sender));
        if (verify) {
          setBalance(balance);
          alert("Transaction successful");
        }
      } catch (ex) {
        alert("Invalid signature");
        // alert(ex.response.data.message);
      }

    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0xA2RE52..."
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;

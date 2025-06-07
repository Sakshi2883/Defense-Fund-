let web3;

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    // You can also save more user data here later!
    window.location.href = "index.html"; // 🔥 redirect after registration
  })
  .catch((error) => {
    const errorMessage = error.message;
    showError(errorMessage);
  });


async function connectWallet() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    alert("Wallet connected!");
  } else {
    alert("Please install MetaMask.");
  }
}

async function makeDonation() {
  const accounts = await web3.eth.getAccounts();
  const amount = document.getElementById("amount").value;
  const weiAmount = web3.utils.toWei(amount, "ether");

  const tx = await web3.eth.sendTransaction({
    from: accounts[0],
    to: "0xABCDEF1234567890ABCDEF1234567890ABCDEF12",
    value: weiAmount
  });

  alert("Donation successful! TX: " + tx.transactionHash);

  document.getElementById("toggle-dark").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
  window.onload = function () {
    const connectButton = document.getElementById('connectButton');
  
    if (connectButton) {
      connectButton.addEventListener('click', async () => {
        if (typeof window.ethereum !== 'undefined') {
          try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            connectButton.innerText = '✅ Wallet Connected';
            connectButton.disabled = true;
          } catch (err) {
            alert('Connection rejected.');
          }
        } else {
          alert('MetaMask not found. Please install it.');
        }
      });
    } else {
      console.error('Connect Wallet button not found.');
    }
  };  

}

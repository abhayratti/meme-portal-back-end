const main = async () => {
    const memeContractFactory = await hre.ethers.getContractFactory('MemePortal');
    const memeContract = await memeContractFactory.deploy({
      value: hre.ethers.utils.parseEther('0.1'),
    });  
    await memeContract.deployed();
    console.log("Contract deployed to:", memeContract.address);   

    let contractBalance = await hre.ethers.provider.getBalance(
      memeContract.address
    );
    console.log('Contact balance:', hre.ethers.utils.formatEther(contractBalance));
      
    const memeTxn = await memeContract.meme('This is the first link');
    await memeTxn.wait()

    contractBalance = await hre.ethers.provider.getBalance(memeContract.address);
    console.log('Contact balance:', hre.ethers.utils.formatEther(contractBalance));

    let allMemes = await memeContract.getAllMemes();
    console.log(allMemes);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();
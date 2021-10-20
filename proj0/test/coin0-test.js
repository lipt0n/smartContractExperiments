const { expect } = require("chai")
const { ethers } = require("hardhat")

const addresses = [
    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
]
describe("Coin0 tests", ()=>{
    it("should deploy new coin, owner should have them all", async ()=>{
        const [owner] = await ethers.getSigners()

        const coin0Factory = await ethers.getContractFactory("Coin0")
        const coin0 = await coin0Factory.deploy()


        // do i need this?
        // await coin0.deployed()

        const totalSupply = await coin0.totalSupply()
        const balance = await coin0.balanceOf(owner.address)
        expect(balance).to.be.equal(totalSupply)
    })
})
const { expect } = require("chai")
const { ethers } = require("hardhat")

const addresses = [
    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', // same as owner!
    '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
]
describe("Coin0 tests", ()=>{
    it("should deploy new coin, there should be 0 coins", async ()=>{
        const [owner] = await ethers.getSigners()

        const coin0Factory = await ethers.getContractFactory("Coin0")
        const coin0 = await coin0Factory.deploy()

        const totalSupply = await coin0.totalSupply()
        const balance = await coin0.balanceOf(owner.address)
        expect(balance).to.be.equal(totalSupply)
        expect(totalSupply).to.be.equal(0)
    })
    it("should mint some coins", async ()=>{
        const [owner] = await ethers.getSigners()

        const coin0Factory = await ethers.getContractFactory("Coin0")
        const coin0 = await coin0Factory.deploy()

        const totalSupply = await coin0.totalSupply()
        expect(totalSupply).to.be.equal(0)

        await coin0.mint(1000)

        const newTotalSupply = await coin0.totalSupply()
        expect(newTotalSupply).to.be.equal(1000)
    })

    it("should send coins", async ()=>{
        const [owner] = await ethers.getSigners()

        const coin0Factory = await ethers.getContractFactory("Coin0")
        const coin0 = await coin0Factory.deploy()

        await coin0.mint(1000)
        await coin0.send(addresses[1], 50)
        await coin0.send(addresses[2], 1)

        const newTotalSupply = await coin0.totalSupply()
        expect(newTotalSupply).to.be.equal(949)
        expect(await coin0.balanceOf(addresses[1])).to.be.equal(50)
        expect(await coin0.balanceOf(addresses[2])).to.be.equal(1)

    })
})
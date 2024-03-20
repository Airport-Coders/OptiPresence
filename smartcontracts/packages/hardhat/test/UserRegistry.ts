import { expect } from "chai";
import { ethers } from "hardhat";
import { UserRegistry } from "../typechain-types";

describe("UserRegistry", function () {
  let userRegistry: UserRegistry;
  let addr1: any, addr2: any;

  before(async () => {
    [addr1, addr2] = await ethers.getSigners();
    const userRegistryFactory = await ethers.getContractFactory("UserRegistry");
    userRegistry = (await userRegistryFactory.deploy()) as UserRegistry;
  });

  describe("User Registration", function () {
    it("Should allow a new user to register", async function () {
      const tx = await userRegistry
        .connect(addr1)
        .registerUser("Alice", "TmWK3pEw4JyFk9A3H3qzyUbGrp41qiJHtiPUnxoFQicSit");
      await expect(tx)
        .to.emit(userRegistry, "UserRegistered")
        .withArgs(addr1.address, "Alice", "TmWK3pEw4JyFk9A3H3qzyUbGrp41qiJHtiPUnxoFQicSit");
    });

    it("Should not allow registering with an existing address", async function () {
      await expect(
        userRegistry.connect(addr1).registerUser("Alice", "TmWK3pEw4JyFk9A3H3qzyUbGrp41qiJHtiPUnxoFQicSit"),
      ).to.be.revertedWith("User already exists");
    });

    it("Should reject registration with invalid name", async function () {
      await expect(
        userRegistry.connect(addr2).registerUser("", "TmWK3pEw4JyFk9A3H3qzyUbGrp41qiJHtiPUnxoFQicSit"),
      ).to.be.revertedWith("Invalid name");
    });

    it("Should reject registration with invalid IPFS hash", async function () {
      await expect(userRegistry.connect(addr2).registerUser("Bob", "InvalidHash")).to.be.revertedWith(
        "Invalid IPFS hash",
      );
    });
  });

  describe("Data Retrieval", function () {
    it("Should allow fetching user information by address", async function () {
      const userInfo = await userRegistry.getUserInfo(addr1.address);
      expect(userInfo.name).to.equal("Alice");
      expect(userInfo.faceHash).to.equal("TmWK3pEw4JyFk9A3H3qzyUbGrp41qiJHtiPUnxoFQicSit");
    });

    it("Should allow users to fetch their own information", async function () {
      const userInfo = await userRegistry.connect(addr1).getMyInfo();
      expect(userInfo.name).to.equal("Alice");
      expect(userInfo.faceHash).to.equal("TmWK3pEw4JyFk9A3H3qzyUbGrp41qiJHtiPUnxoFQicSit");
    });

    it("Should revert when fetching non-existent user info", async function () {
      await expect(userRegistry.getUserInfo(addr2.address)).to.be.revertedWith("User does not exist");
    });
  });

  describe("Data Update", function () {
    it("Should allow a user to update their name", async function () {
      const newName = "AliceUpdated";
      const tx = await userRegistry.connect(addr1).updateName(newName);
      await expect(tx).to.emit(userRegistry, "NameUpdated").withArgs(addr1.address, newName);
      const userInfo = await userRegistry.getUserInfo(addr1.address);
      expect(userInfo.name).to.equal(newName);
    });

    it("Should allow a user to update their face hash", async function () {
      const newFaceHash = "BmWK3pEw4JyFk9A3H3qzyUbGrp41qiJHtiPUnxoFQicSit";
      const tx = await userRegistry.connect(addr1).updateFaceHash(newFaceHash);
      await expect(tx).to.emit(userRegistry, "FaceHashUpdated").withArgs(addr1.address, newFaceHash);
      const userInfo = await userRegistry.getUserInfo(addr1.address);
      expect(userInfo.faceHash).to.equal(newFaceHash);
    });

    it("Should revert updates for non-existent users", async function () {
      await expect(userRegistry.connect(addr2).updateName("BobUpdated")).to.be.revertedWith("User does not exist");
      await expect(
        userRegistry.connect(addr2).updateFaceHash("TmWK3pEw4JyFk9A3H3qzyUbGrp41qiJHtiPUnxoFQicSit"),
      ).to.be.revertedWith("User does not exist");
    });
  });
});

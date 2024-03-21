import { expect } from "chai";
import { ethers } from "hardhat";
import { CheckInManager, EventManager, UserRegistry } from "../typechain-types";

describe("CheckInManager", function () {
  let checkInManager: CheckInManager;
  let eventManager: EventManager;
  let userRegistry: UserRegistry;
  let addr1: any, addr2: any, offchainValidator: any;

  const testEvent = {
    name: "Test Event",
    description: "This is a test event",
    imageHash: "QmWK3pEw4JyFk9A3H3qzyUbGrp41qiJHtiPUnxoFQicSit",
    location: "51.5074,0.1278",
    startTime: Math.floor(Date.now() / 1000),
    endTime: Math.floor(Date.now() / 1000) + 3600,
  };

  before(async () => {
    [addr1, addr2, offchainValidator] = await ethers.getSigners();

    const eventManagerFactory = await ethers.getContractFactory("EventManager");
    const userRegistryFactory = await ethers.getContractFactory("UserRegistry");
    eventManager = (await eventManagerFactory.deploy()) as EventManager;
    userRegistry = (await userRegistryFactory.deploy()) as UserRegistry;

    await eventManager.waitForDeployment();
    await userRegistry.waitForDeployment();

    await eventManager
      .connect(addr1)
      .createEvent(
        testEvent.name,
        testEvent.description,
        testEvent.imageHash,
        testEvent.location,
        testEvent.startTime,
        testEvent.endTime,
      );

    const checkInManagerFactory = await ethers.getContractFactory("CheckInManager");
    checkInManager = (await checkInManagerFactory.deploy(eventManager.target, userRegistry.target)) as CheckInManager;

    await checkInManager.waitForDeployment();
    await checkInManager.setOffchainValidator(offchainValidator.address);

    await userRegistry.connect(addr1).registerUser("Test User", "QmWK3pEw4JyFk9A3H3qzyUbGrp41qiJHtiPUnxoFQicSit");
  });

  describe("Check-in Request Submission", function () {
    it("Should allow a user to request a check-in", async function () {
      const unknownFaceHash = "QmWK3pEw4JyFk9A3H3qzyUbGrp41qiJHtiPUnxoFQicSit";
      const userLocation = "51.5074,0.1278";

      const knownFaceHash = (await userRegistry.getUserInfo(addr1.address)).faceHash;
      const event = (await eventManager.getAllEvents())[0];

      await expect(checkInManager.connect(addr1).requestCheckIn(0, unknownFaceHash, userLocation))
        .to.emit(checkInManager, "CheckInRequested")
        .withArgs(0, addr1.address, 0, knownFaceHash, unknownFaceHash, userLocation, event.location);
    });
  });

  describe("Check-in Approval and Rejection", function () {
    it("Should allow the offchain validator to approve a check-in", async function () {
      await expect(checkInManager.connect(offchainValidator).replyCheckIn(0, addr1.address, 0, true))
        .to.emit(checkInManager, "CheckInConfirmed")
        .withArgs(0, addr1.address, 0);
    });

    it("Should allow the offchain validator to reject a check-in", async function () {
      const faceHash = "QmWK3pEw4JyFk9A3H3qzyUbGrp41qiJHtiPUnxoFQicSit";
      const location = "51.5014,0.1419";
      await checkInManager.connect(addr1).requestCheckIn(0, faceHash, location);

      await expect(checkInManager.connect(offchainValidator).replyCheckIn(0, addr1.address, 1, false))
        .to.emit(checkInManager, "CheckInRejected")
        .withArgs(0, addr1.address, 1);
    });
  });

  describe("Check-in Information Retrieval", function () {
    it("Should allow a user to retrieve their check-in requests", async function () {
      const checkIns = await checkInManager.connect(addr1).getMyCheckIns(0);
      expect(checkIns.length).to.be.greaterThan(0);
    });

    it("Should allow retrieval of all user check-ins for an event", async function () {
      const userCheckIns = await checkInManager.connect(addr1).getUserCheckIns(0, addr1.address);
      expect(userCheckIns.length).to.be.greaterThan(0);
    });

    it("Should allow retrieval of all check-ins for an event", async function () {
      const eventCheckIns = await checkInManager.connect(addr1).getUsersCheckInsFromEvent(0);
      expect(eventCheckIns).to.include(addr1.address);
    });
  });
});

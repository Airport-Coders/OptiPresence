import { expect } from "chai";
import { ethers } from "hardhat";
import { EventManager } from "../typechain-types";

describe("EventManager", function () {
  let eventManager: EventManager;
  let addr1: any, addr2: any;

  before(async () => {
    [addr1, addr2] = await ethers.getSigners();
    const eventManagerFactory = await ethers.getContractFactory("EventManager");
    eventManager = (await eventManagerFactory.deploy()) as EventManager;
    await eventManager.waitForDeployment();
  });

  describe("Event Creation", function () {
    it("Should allow creating a new event", async function () {
      const tx = await eventManager
        .connect(addr1)
        .createEvent(
          "INTELI Conference",
          "Conference on inteli college",
          "TmWK3pEw4JyFk9A3H3qzyUbGrp41qiJHtiPUnxoFQicSit",
          "-23.555490,-46.733470",
          1660000000,
          1660096400,
        );
      await expect(tx).to.emit(eventManager, "EventCreated").withArgs(0, "INTELI Conference", addr1.address);
    });
  });

  describe("Event Updates", function () {
    it("Should allow the owner to update the event", async function () {
      await eventManager
        .connect(addr1)
        .updateEvent(
          0,
          "INTELI Conference Updated",
          "Conference on inteli college",
          "TmWK3pEw4JyFk9A3H3qzyUbGrp41qiJHtiPUnxoFQicSit",
          "-23.555490,-46.733470",
          1660100000,
          1660196400,
          true,
        );
      const events = await eventManager.getAllEvents();
      expect(events[0].name).to.equal("INTELI Conference Updated");
    });

    it("Should prevent non-owners from updating the event", async function () {
      await expect(
        eventManager
          .connect(addr2)
          .updateEvent(
            0,
            "INTELI Conference",
            "Conference on inteli college",
            "TmWK3pEw4JyFk9A3H3qzyUbGrp41qiJHtiPUnxoFQicSit",
            "-23.555490,-46.733470",
            1660000000,
            1660096400,
            true,
          ),
      ).to.be.revertedWith("Only the owner can perform this action");
    });
  });

  describe("Event Retrieval", function () {
    it("Should allow anyone to retrieve event information", async function () {
      const events = await eventManager.getAllEvents();
      expect(events[0].name).to.equal("INTELI Conference Updated");
    });

    it("Should allow retrieving all events", async function () {
      const allEvents = await eventManager.getAllEvents();
      expect(allEvents.length).to.be.greaterThan(0);
    });
  });

  describe("Event Validation", function () {
    it("Should prevent creating events with invalid details", async function () {
      await expect(
        eventManager.createEvent(
          "", // Invalid name
          "Conference on inteli college",
          "TmWK3pEw4JyFk9A3H3qzyUbGrp41qiJHtiPUnxoFQicSit",
          "-23.555490,-46.733470",
          1660000000,
          1660096400,
        ),
      ).to.be.revertedWith("Invalid name");

      await expect(
        eventManager.createEvent(
          "INTELI Conference",
          "",
          "TmWK3pEw4JyFk9A3H3qzyUbGrp41qiJHtiPUnxoFQicSit",
          "-23.555490,-46.733470",
          1660000000,
          1660096400,
        ),
      ).to.be.revertedWith("Invalid description");

      await expect(
        eventManager.createEvent(
          "INTELI Conference",
          "Conference on inteli college",
          "", // Invalid IPFS hash
          "-23.555490,-46.733470",
          1660000000,
          1660096400,
        ),
      ).to.be.revertedWith("Invalid IPFS hash");

      await expect(
        eventManager.createEvent(
          "INTELI Conference",
          "Conference on inteli college",
          "TmWK3pEw4JyFk9A3H3qzyUbGrp41qiJHtiPUnxoFQicSit",
          "", // Invalid location
          1660000000,
          1660096400,
        ),
      ).to.be.revertedWith("Invalid location");

      await expect(
        eventManager.createEvent(
          "INTELI Conference",
          "Conference on inteli college",
          "TmWK3pEw4JyFk9A3H3qzyUbGrp41qiJHtiPUnxoFQicSit",
          "-23.555490,-46.733470",
          1860000000,
          1600000000,
        ),
      ).to.be.revertedWith("Invalid time range");
    });
  });
});

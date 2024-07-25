import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { parseEther } from "viem";

describe("caloriesCalc", function() {
  async function deployCaloriesCalc() {
    const caloriesCalc = await hre.viem.deployContract("caloriesCalc");

    const [owner, otherAccount] = await hre.viem.getWalletClients();

    const caloriesCalcAddress = await hre.viem.deployContract("caloriesCalc", [
      caloriesCalc.address,
    ]);

    const publicClient = await hre.viem.getPublicClient();

    return {
      caloriesCalcAddress,
      owner,
      otherAccount,
      publicClient,
    };
  }

  describe("test 1", async function() {
    it("", async function() {
      const {
        caloriesCalcAddress,
        owner,
        otherAccount,
        publicClient,
      } = await loadFixture(deployCaloriesCalc);
    });
  });

  describe("test 2", function() {
    it("", async function() {
      const {
        caloriesCalcAddress,
        owner,
        otherAccount,
        publicClient,
      } = await loadFixture(deployCaloriesCalc);
    });
  });
  
  describe("test 3", function() {
    it("", async function() {
      const {
        caloriesCalcAddress,
        owner,
        otherAccount,
        publicClient,
      } = await loadFixture(deployCaloriesCalc);
    });
  });
});

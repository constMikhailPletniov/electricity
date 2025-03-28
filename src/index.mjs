/**
 * This class is just a facade for your implementation, the tests below are using the `World` class only.
 * Feel free to add the data and behavior, but don't change the public interface.
 */


export class World {

  constructor() { 
    this.households = [];
    this.powerPlants = [];
  }

  createPowerPlant() {
  const powerPlant = {
    id: this.powerPlants.length,
    alive: true
  };
  this.powerPlants.push(powerPlant);
  return powerPlant;
  }

  createHousehold() {
   const household = {
    id: this.households.length,
    connectedPowerPlants: new Set(),
    connectedHouseholds: new Set()
  };
  this.households.push(household);
  return household;
  }

  connectHouseholdToPowerPlant(household, powerPlant) {
   household.connectedPowerPlants.add(powerPlant);
  }

  connectHouseholdToHousehold(household1, household2) {
   household1.connectedHouseholds.add(household2);
    household2.connectedHouseholds.add(household1);
  }

  disconnectHouseholdFromPowerPlant(household, powerPlant) {
   household.connectedPowerPlants.delete(powerPlant);
  }

  killPowerPlant(powerPlant) {
   powerPlant.alive = false;
  }

  repairPowerPlant(powerPlant) {
   powerPlant.alive = true;
  }

  householdHasEletricity(household) {
  const visited = new Set();

  const queue = [household];

  while (queue.length > 0) {
    const current = queue.shift();
    if (visited.has(current)) continue;
    visited.add(current);

    for (let powerPlant of current.connectedPowerPlants) {
      if (powerPlant.alive) {
        return true;
      }
    }
    for (let neighbor of current.connectedHouseholds) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
      }
    }
  }
  return false;
  }
}

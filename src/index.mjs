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
  
  if(!household) return false;

  return this.#householdHasEletricity(household);
  
  }

  #householdHasEletricity(household, visited = new Set()) {

        if (visited.has(household)) return false;
        visited.add(household);

    for (let powerPlant of household.connectedPowerPlants) {
          if (powerPlant.alive) {
            return true;
          }
        }

        if(household.connectedHouseholds.size === 0) return false;

        for (let neighbor of household.connectedHouseholds) {
           if(this.#householdHasEletricity(neighbor,visited)) return true;
      }
    
      return false;
  }
}

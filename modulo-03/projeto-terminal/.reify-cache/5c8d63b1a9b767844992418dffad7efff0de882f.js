"use strict";var mocha;module.link('mocha',{default(v){mocha=v}},0);var chai;module.link('chai',{default(v){chai=v}},1);var Person;module.link('../src/person.js',{default(v){Person=v}},2);




const { describe, it } = mocha
const { expect } = chai

describe('Person', () => {
  it('should return a person instance from a string', () => {
    const person = Person.generateInstanceFromString(
      '1 Bike,Carro 2000 2020-01-01 2020-02-01'
    )

    const expected = {
      id: '1',
      kmTraveled: '2000',
      from: '2020-01-01',
      to: '2020-02-01',
      vehicles: ['Bike', 'Carro']
    }

    expect(person).to.be.deep.equal(expected)
  })

  it('should format values', () => {
    const person = new Person({
      id: '1',
      kmTraveled: '2000',
      from: '2020-01-01',
      to: '2020-02-01',
      vehicles: ['Bike', 'Carro']
    })

    const result = person.formatted('pt-BR')
    
    const expected = {
      id: 1,
      vehicles: 'Bike e Carro',
      kmTraveled: '2.000 km',
      from: '01 de janeiro de 2020',
      to: '01 de fevereiro de 2020'
    }

    expect(result).to.be.deep.equal(expected)
  })
})
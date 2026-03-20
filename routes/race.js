const express = require('express')
const router = express.Router()
const fs = require('fs')
const { calculateDriverStandings, calculateConstructorStandings } = require('../lib/standings')
const { applyOverrides } = require('../lib/simulator')

const data = JSON.parse(fs.readFileSync('race-results.json','utf-8'))

router.get('/api/races', (req, res) => {
    res.json(data.map(event => ({
        raceTitle: event.raceTitle,
        type: event.type
    })))
})

router.get('/api/races/:index', (req, res) => {
    const index = parseInt(req.params.index)
    if (isNaN(index) || index < 0 || index >= data.length) {
        return res.status(404).json({ error: 'Race not found' })
    }
    res.json(data[index])
})

router.get('/api/drivers', (req, res) => {
    const drivers = {}
    data.forEach(event => {
        event.results.forEach(result => {
            const driverNo = result.driverNo
            if (!drivers[driverNo]) {
                drivers[driverNo] = {
                    driverNo,
                    name: result.driver.name || result.driver,
                    code: result.driver.code,
                    team: result.team
                }
            }
        })
    })
    res.json(Object.values(drivers).sort((a, b) => a.name.localeCompare(b.name)))
})

router.get('/api/teams', (req, res) => {
    const teams = new Set()
    data.forEach(event => {
        event.results.forEach(result => {
            teams.add(result.team)
        })
    })
    res.json(Array.from(teams).sort())
})

router.post('/api/simulate', (req, res) => {
    const { overrides } = req.body
    const modifiedData = applyOverrides(data, overrides)
    const driverStandings = calculateDriverStandings(modifiedData)
    const constructorStandings = calculateConstructorStandings(modifiedData)
    res.json({
        drivers: driverStandings,
        constructors: constructorStandings
    })
})

router.get('/events',(req,res)=>{
    res.json(data)
})

router.get('/standings/drivers', (req, res) => {
    const table = calculateDriverStandings(data)
    
    console.table(table)
    res.json(table)
})

router.get('/standings/constructors', (req, res) => {
    const table = calculateConstructorStandings(data)
    
    console.table(table)
    res.json(table)

})

module.exports = router
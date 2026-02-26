const express = require('express')
const fs = require('fs')

const app = express()

fs.readFile('race-results.json', (e, d) => {
    if (e) return e
    const data = JSON.parse(d);

    let standings = {}

    data.forEach(race => {
        race.results.forEach(result => {
            const driverNo = result.driverNo
            const driverName = result.driver.name
            const team = result.team
            const points = Number(result.points)
            if (!standings[driverNo]) {
                standings[driverNo] = {
                    driverNo,
                    driverName,
                    team,
                    points: 0
                }
            }
            standings[driverNo].points += points
        })
    });

    const table = Object.values(standings)
    table.sort((a, b) => b.points - a.points)
    table.forEach((driver, index) => {
        driver.position = index + 1
    })
    console.table(table)
})



app.listen(3000, () => {
    console.log('Serve is running at 3000')
})
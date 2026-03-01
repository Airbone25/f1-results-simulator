const express = require('express')
const fs = require('fs')

const app = express()

const data = JSON.parse(fs.readFileSync('race-results.json','utf-8'))

// fs.readFile('race-results.json', (e, d) => {
//     if (e) return e
//     const data = JSON.parse(d);

//     let standings = {}

//     data.forEach(race => {
//         race.results.forEach(result => {
//             const driverNo = result.driverNo
//             const driverName = result.driver.name
//             const team = result.team
//             const points = Number(result.points)
//             if (!standings[driverNo]) {
//                 standings[driverNo] = {
//                     driverNo,
//                     driverName,
//                     team,
//                     points: 0
//                 }
//             }
//             standings[driverNo].points += points
//         })
//     });

//     const table = Object.values(standings)
//     table.sort((a, b) => b.points - a.points)
//     table.forEach((driver, index) => {
//         driver.position = index + 1
//     })
//     console.table(table)
// })

app.get('/events',(req,res)=>{
    res.json(data)
})

app.get('/standings/drivers', (req, res) => {
    const standings = {}

    data.forEach(event => {
        event.results.forEach(result => {
            const driverNo = result.driverNo
            const driverName = result.driver.name || result.driver
            const team = result.team
            const points = Number(result.points) || 0

            if (!standings[driverNo]) {
                standings[driverNo] = {
                    driverNo,
                    driverName,
                    team,
                    racePoints: 0,
                    sprintPoints: 0,
                    totalPoints: 0
                }
            }

            if (event.type === 'Race') {
                standings[driverNo].racePoints += points
            } else {
                standings[driverNo].sprintPoints += points
            }

            standings[driverNo].totalPoints += points
        });
    });

    const table = Object.values(standings)
        .sort((a, b) => b.totalPoints - a.totalPoints)
        .map((driver, index) => ({
            position: index + 1,
            ...driver
        }));
    
    console.table(table)
    res.json(table)
})

app.get('/standings/constructors', (req, res) => {
    const constructors = {}

    data.forEach(event => {
        event.results.forEach(result => {
            const team = result.team
            const points = Number(result.points) || 0

            if (!constructors[team]) {
                constructors[team] = {
                    team,
                    totalPoints: 0
                }
            }

            constructors[team].totalPoints += points
        })
    })

    const table = Object.values(constructors)
        .sort((a, b) => b.totalPoints - a.totalPoints)
        .map((team, index) => ({
            position: index + 1,
            ...team
        }));
    
    console.table(table)
    res.json(table)

})

app.listen(3000, () => {
    console.log('Server is running at 3000')
})
const POINTS_MAP = {
    'Race': {
        '1': 25, '2': 18, '3': 15, '4': 12, '5': 10,
        '6': 8, '7': 6, '8': 4, '9': 2, '10': 1
    },
    'Sprint': {
        '1': 8, '2': 7, '3': 6, '4': 5, '5': 4,
        '6': 3, '7': 2, '8': 1
    }
}

function calculateDriverStandings(data) {
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

    return Object.values(standings)
        .sort((a, b) => b.totalPoints - a.totalPoints)
        .map((driver, index) => ({
            position: index + 1,
            ...driver
        }));
}

function calculateConstructorStandings(data) {
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

    return Object.values(constructors)
        .sort((a, b) => b.totalPoints - a.totalPoints)
        .map((team, index) => ({
            position: index + 1,
            ...team
        }));
}

module.exports = {
    calculateDriverStandings,
    calculateConstructorStandings,
    POINTS_MAP
}

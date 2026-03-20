const { POINTS_MAP } = require('./standings')

/**
 * Applies user-defined overrides to the base race data.
 * 
 * @param {Array} baseData - The original race results array.
 * @param {Object} overrides - User-defined changes. 
 * Format: {
 *   "Race Title|Type": {
 *     "driverNo": { position: "1" }
 *   }
 * }
 * @returns {Array} - A new array with overrides applied.
 */
function applyOverrides(baseData, overrides) {
    if (!overrides || Object.keys(overrides).length === 0) {
        return baseData;
    }

    // Deep clone the base data to avoid mutating the original
    const modifiedData = JSON.parse(JSON.stringify(baseData));

    modifiedData.forEach(event => {
        const eventKey = `${event.raceTitle}|${event.type}`;
        const eventOverrides = overrides[eventKey];

        if (eventOverrides) {
            event.results.forEach(result => {
                const driverOverride = eventOverrides[result.driverNo];
                if (driverOverride) {
                    // Apply overrides
                    Object.assign(result, driverOverride);

                    // Auto-calculate points if position changed but points not provided
                    if (driverOverride.position !== undefined && driverOverride.points === undefined) {
                        const eventPoints = POINTS_MAP[event.type] || POINTS_MAP['Race']
                        result.points = (eventPoints[driverOverride.position] || 0).toString()
                    }
                }
            });
        }
    });

    return modifiedData;
}

module.exports = {
    applyOverrides
};

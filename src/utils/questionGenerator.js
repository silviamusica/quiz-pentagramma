export const shuffle = (array) => {
    const a = array.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

export const generateQuestions = (poolArr, count) => {
    if (!poolArr || poolArr.length === 0) return [];
    if (count <= poolArr.length) {
        return shuffle(poolArr).slice(0, count);
    }

    const result = [];
    while (result.length < count) {
        const chunk = shuffle(poolArr);
        for (let i = 0; i < chunk.length && result.length < count; i++) {
            const candidate = chunk[i];
            const last = result.length > 0 ? result[result.length - 1] : null;
            if (last && candidate.text === last.text) {
                if (i + 1 < chunk.length) {
                    [chunk[i], chunk[i + 1]] = [chunk[i + 1], chunk[i]];
                } else {
                    const alt = poolArr.find(p => p.text !== last.text);
                    if (alt) {
                        result.push(alt);
                        continue;
                    }
                }
            }
            result.push(chunk[i]);
        }
    }
    return result.slice(0, count);
};

export default { shuffle, generateQuestions };

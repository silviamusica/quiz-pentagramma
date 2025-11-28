// Esegue simulazioni per verificare che non ci siano duplicati consecutivi
import { generateQuestions } from '../src/utils/questionGenerator.js';

const allQuestions = [
    { text: "La nota sulla terza linea", answer: "Si", pos: 5, type: 'line' },
    { text: "La nota sulla quinta linea", answer: "Fa", pos: 9, type: 'line' },
    { text: "La nota sulla seconda linea", answer: "Sol", pos: 3, type: 'line' },
    { text: "La nota sulla quarta linea", answer: "Re", pos: 7, type: 'line' },
    { text: "La nota sulla prima linea", answer: "Mi", pos: 1, type: 'line' },
    { text: "La nota sul primo spazio", answer: "Fa", pos: 2, type: 'space' },
    { text: "La nota sul quarto spazio", answer: "Mi", pos: 8, type: 'space' },
    { text: "La nota sul terzo spazio", answer: "Do", pos: 6, type: 'space' },
    { text: "La nota sul secondo spazio", answer: "La", pos: 4, type: 'space' }
];

const runs = 2000;
const countsToTest = [5, 9, 12, 20, 30];

const summary = {};

for (const count of countsToTest) {
    let failures = 0;
    for (let r = 0; r < runs; r++) {
        const q = generateQuestions(allQuestions, count);
        for (let i = 1; i < q.length; i++) {
            if (q[i].text === q[i - 1].text) { failures++; break; }
        }
    }
    summary[count] = { runs, failures };
}

console.log('Test generator summary:');
for (const k of Object.keys(summary)) {
    const s = summary[k];
    console.log(`count=${k} runs=${s.runs} failures=${s.failures} (${((s.failures/s.runs)*100).toFixed(2)}%)`);
}

// Inoltre mostra alcune sequenze di esempio per ispezione manuale
console.log('\nSample sequences:');
for (const c of [5, 12]) {
    const seq = generateQuestions(allQuestions, c);
    console.log(`count=${c}:`, seq.map(x => x.text));
}

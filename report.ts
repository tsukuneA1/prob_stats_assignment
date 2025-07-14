import * as fs from 'fs';

const SAMPLES_20K = 20000;
const SAMPLES_LARGE_N = 2000;
const OUTPUT_DIR = './output'; 

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
}

namespace Problem1 {
    const generateExponential = (lambda: number): number => -Math.log(1 - Math.random()) / lambda;
    const generatePareto = (a: number, x0: number): number => x0 * Math.pow(1 - Math.random(), -1 / a);

    const createExponentialHistogramData = () => {
        const lambda = 2;
        const bins = new Map<string, number>();
        const binWidth = 0.1;
        const maxBinStart = 9.9;
        let csvContent = "区間,個数\n";

        for (let i = 0; i < SAMPLES_20K; i++) {
            const rand = generateExponential(lambda);
            if (rand >= maxBinStart + binWidth) {
                const key = `[10.0, +inf)`;
                bins.set(key, (bins.get(key) || 0) + 1);
            } else {
                const binIndex = Math.floor(rand / binWidth);
                const binStart = binIndex * binWidth;
                const key = `[${binStart.toFixed(1)}, ${(binStart + binWidth).toFixed(1)}`;
                bins.set(key, (bins.get(key) || 0) + 1);
            }
        }
        
        Array.from(bins.keys()).sort((a,b) => parseFloat(a.substring(1)) - parseFloat(b.substring(1)))
            .forEach(key => csvContent += `${key},${bins.get(key) || 0}\n`);

        fs.writeFileSync(`${OUTPUT_DIR}/p1-2_exponential_hist.csv`, csvContent);
        console.log("✅ 問題1-2: 指数分布のヒストグラムデータをCSVに出力しました。");
    };
    
    const createParetoHistogramData = () => {
        const a = 2, x0 = 1;
        const bins = new Map<string, number>();
        const binWidth = 0.5, numBins = 10;
        let csvContent = "区間,個数\n";

        for (let i = 0; i < SAMPLES_20K; i++) {
            const rand = generatePareto(a, x0);
            const maxVal = x0 + numBins * binWidth;
            if (rand >= maxVal) {
                const key = `[${maxVal.toFixed(1)}, +inf)`;
                bins.set(key, (bins.get(key) || 0) + 1);
            } else {
                const binIndex = Math.floor((rand - x0) / binWidth);
                const binStart = x0 + binIndex * binWidth;
                const key = `[${binStart.toFixed(1)}, ${(binStart + binWidth).toFixed(1)}`;
                bins.set(key, (bins.get(key) || 0) + 1);
            }
        }

        Array.from(bins.keys()).sort((a,b) => parseFloat(a.substring(1)) - parseFloat(b.substring(1)))
            .forEach(key => csvContent += `${key},${bins.get(key) || 0}\n`);

        fs.writeFileSync(`${OUTPUT_DIR}/p1-3_pareto_hist.csv`, csvContent);
        console.log("✅ 問題1-3: パレート分布のヒストグラムデータをCSVに出力しました。");
    };

    const createLawOfLargeNumbersData = () => {
        const a = 2, x0 = 1, expectedValue = 2;
        let sumX = 0, sumOfSquaredDiff = 0;
        let csvContent = "n,サンプル平均,サンプル分散\n";

        for (let n = 1; n <= SAMPLES_LARGE_N; n++) {
            const newSample = generatePareto(a, x0);
            sumX += newSample;
            sumOfSquaredDiff += Math.pow(newSample - expectedValue, 2);
            csvContent += `${n},${sumX / n},${sumOfSquaredDiff / n}\n`;
        }
        
        fs.writeFileSync(`${OUTPUT_DIR}/p1-4_p1-5_pareto_lln.csv`, csvContent);
        console.log("✅ 問題1-4 & 1-5: 大数の法則・分散データをCSVに出力しました。");
    };

    export const run = () => {
        createExponentialHistogramData();
        createParetoHistogramData();
        createLawOfLargeNumbersData();
    };
}

namespace Problem2 {
    const generateNormal = (mu: number, sigma: number): number => {
        let sumU = 0;
        for (let i = 0; i < 12; i++) sumU += Math.random();
        return mu + sigma * (sumU - 6);
    };

    export const run = () => {
        const mu = 2, variance = 7;
        const bins = new Map<string, number>();
        const binWidth = 1.0;
        let csvContent = "区間,個数\n";

        for (let i = 0; i < SAMPLES_20K; i++) {
            const rand = generateNormal(mu, Math.sqrt(variance));
            const binIndex = Math.floor(rand / binWidth);
            const binStart = binIndex * binWidth;
            const key = `[${binStart.toFixed(1)}, ${(binStart + binWidth).toFixed(1)})`;
            bins.set(key, (bins.get(key) || 0) + 1);
        }
        
        Array.from(bins.keys()).sort((a,b) => parseFloat(a.substring(1)) - parseFloat(b.substring(1)))
            .forEach(key => csvContent += `${key},${bins.get(key) || 0}\n`);

        fs.writeFileSync(`${OUTPUT_DIR}/p2_normal_hist.csv`, csvContent);
        console.log("✅ 問題2: 正規分布のヒストグラムデータをCSVに出力しました。");
    };
}

namespace Problem3 {
    const generatePoisson = (lambda: number): number => {
        const l = Math.exp(-lambda);
        let k = 0, p = 1;
        do { k++; p *= Math.random(); } while (p > l);
        return k - 1;
    };
    
    export const run = () => {
        const lambda = 1.62;
        const counts = new Map<number, number>();
        let csvContent = "Xの値,個数\n";

        for (let i = 0; i < SAMPLES_20K; i++) {
            const rand = generatePoisson(lambda);
            counts.set(rand, (counts.get(rand) || 0) + 1);
        }

        Array.from(counts.keys()).sort((a, b) => a - b)
            .forEach(key => csvContent += `${key},${counts.get(key) || 0}\n`);
        
        fs.writeFileSync(`${OUTPUT_DIR}/p3_poisson_hist.csv`, csvContent);
        console.log("✅ 問題3: ポアソン分布のヒストグラムデータをCSVに出力しました。");
    };
}

const main = () => {
    console.log("🚀 データ生成を開始します...");
    Problem1.run();
    Problem2.run();
    Problem3.run();
    console.log("\n🎉 全てのデータが`output`フォルダにCSVファイルとして保存されました。");
    console.log("次にPythonスクリプトを実行してグラフを生成してください。");
};

main();
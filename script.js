function generateTable() {
    const rows = buildRows();

    let output = "Level | Player DPS | Monster HP\n";
    output += "---------------------------------\n";

    for (const r of rows) {
        output += `${r.level} | ${r.playerDps} | ${r.monsterHp}\n`;
    }

    document.getElementById("result").innerText = output;
}


function buildRows() {
   
    const baseDps = Number(document.getElementById("dps").value);
    const growth = Number(document.getElementById("growth").value) / 100;
    const ttk = Number(document.getElementById("ttk").value);
    const levels = Number(document.getElementById("levels").value);

    let rows = [];
    let currentDps = baseDps;

    for (let level = 1; level <= levels; level++) {
        const monsterHp = Math.round(currentDps * ttk);

        rows.push({
            level: level,
            playerDps: Math.round(currentDps),
            monsterHp: monsterHp
        });

        currentDps = currentDps * (1 + growth);
    }

    return rows;
}

function downloadCSV() {
    
    const rows = buildRows();

    // CSV 헤더
    let csv = "Level,PlayerDPS,MonsterHP\n";

    // CSV 바디
    for (const r of rows) {
        csv += `${r.level},${r.playerDps},${r.monsterHp}\n`;
    }

    // 파일로 다운로드 처리 (브라우저 기본 기능)
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "monster_table.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
}

function generateTable() {
    const rows = buildRows();

    let output = "Level | Player DPS | Monster HP\n";
    output += "---------------------------------\n";

    for (const r of rows) {
        output += `${r.level} | ${r.playerDps} | ${r.monsterHp}\n`;
    }

    document.getElementById("result").innerText = output;

    // ✅ 그래프 그리기
    drawChart(rows);
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

function drawChart(rows) {
    const canvas = document.getElementById("chart");
    const ctx = canvas.getContext("2d");

    const w = canvas.width;
    const h = canvas.height;

    // 여백(축/라벨용)
    const padL = 50;
    const padR = 20;
    const padT = 20;
    const padB = 35;

    // 배경 클리어
    ctx.clearRect(0, 0, w, h);

    // 데이터 범위
    const maxHp = Math.max(...rows.map(r => r.monsterHp));
    const minHp = Math.min(...rows.map(r => r.monsterHp));
    const levels = rows.length;

    // 0으로 나눔 방지
    const hpRange = Math.max(1, maxHp - minHp);

    // 좌표 변환 함수
    const xFor = (i) => {
        // i: 0..levels-1
        const usableW = w - padL - padR;
        if (levels === 1) return padL + usableW / 2;
        return padL + (i * usableW) / (levels - 1);
    };

    const yForHp = (hp) => {
        const usableH = h - padT - padB;
        // 위가 0이라 뒤집어야 함
        return padT + (1 - (hp - minHp) / hpRange) * usableH;
    };

    // 축 그리기
    ctx.beginPath();
    ctx.moveTo(padL, padT);
    ctx.lineTo(padL, h - padB);
    ctx.lineTo(w - padR, h - padB);
    ctx.stroke();

    // y축 라벨(최소/최대)
    ctx.font = "12px Arial";
    ctx.fillText(String(maxHp), 8, padT + 10);
    ctx.fillText(String(minHp), 8, h - padB);

    // x축 라벨(시작/끝 레벨)
    ctx.fillText("1", padL, h - 10);
    ctx.fillText(String(levels), w - padR - 10, h - 10);

    // 선 그래프(몬스터 HP)
    ctx.beginPath();
    for (let i = 0; i < rows.length; i++) {
        const x = xFor(i);
        const y = yForHp(rows[i].monsterHp);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // 범례(legend)
    ctx.fillText("Monster HP", padL + 10, padT + 12);
}

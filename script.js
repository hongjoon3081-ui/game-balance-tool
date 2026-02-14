function generateTable() {

    const baseDps = Number(document.getElementById("dps").value);
    const growth = Number(document.getElementById("growth").value) / 100;
    const ttk = Number(document.getElementById("ttk").value);
    const levels = Number(document.getElementById("levels").value);

    let output = "Level | Player DPS | Monster HP\n";
    output += "---------------------------------\n";

    let currentDps = baseDps;

    for (let i = 1; i <= levels; i++) {

        const monsterHp = Math.round(currentDps * ttk);

        output += i + " | " + Math.round(currentDps) + " | " + monsterHp + "\n";

        currentDps = currentDps * (1 + growth);
    }

    document.getElementById("result").innerText = output;
}

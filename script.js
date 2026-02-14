function calculate() {

    const dps = Number(document.getElementById("dps").value);
    const ttk = Number(document.getElementById("ttk").value);
    const count = Number(document.getElementById("count").value);

    const monsterHP = dps * ttk;

    const totalTime = ttk * count;

    document.getElementById("result").innerText =
        "Recommended Monster HP: " + monsterHP +
        " | Total Clear Time: " + totalTime + " seconds";
}

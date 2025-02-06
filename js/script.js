
let stage1, stage2;
function setup() {
    new p5(sketchFirstStage, 'stage1');
    new p5(sketchSecondStage, 'stage2');
}

function sketchFirstStage(p) {
    let sunRadius, planetRadius, ringRadius;
    let angle = 0;

    p.setup = function() {
        p.createCanvas(400, 400).parent('stage1');
        p.angleMode(p.DEGREES);
    };

    p.draw = function() {
        p.background(240);
        p.translate(p.width / 2, p.height / 2);
        updateGearFirstStage(); // Mise à jour des paramètres
        drawGears(p, sunRadius, planetRadius, ringRadius, angle);
        angle += 1;
    };
    function updateGearFirstStage() {
        let module = parseFloat(document.getElementById('module').value);
        let sunTeeth = parseFloat(document.getElementById('sunTeeth').value);
        let ringTeeth1 = parseFloat(document.getElementById('ringTeeth1').value);
        let planetTeeth = (ringTeeth1 - sunTeeth) / 2;
        sunRadius = module * sunTeeth / 2;
        planetRadius = module * planetTeeth / 2;
        ringRadius = module * ringTeeth1 / 2;
    }
}

function sketchSecondStage(p) {
    let planetRadius, ringRadius;
    let angle = 0;

    p.setup = function() {
        p.createCanvas(400, 400).parent('stage2');
        p.angleMode(p.DEGREES);
    };

    p.draw = function() {
        p.background(240);
        p.translate(p.width / 2, p.height / 2);
        updateGearSecondStage(); // Mise à jour des paramètres
        drawGears(p, null, planetRadius, ringRadius, angle);
        angle += 1;
    };
    function updateGearSecondStage() {
        let module = parseFloat(document.getElementById('module').value);
        let planetTeeth2 = parseFloat(document.getElementById('planetTeeth2').value);
        let ringTeeth2 = parseFloat(document.getElementById('ringTeeth2').value);
        planetRadius = module * planetTeeth2 / 2;
        ringRadius = module * ringTeeth2 / 2;
    }
}

function drawGears(p, sunRadius, planetRadius, ringRadius, angle) {
    p.noFill();
    p.stroke(0);
    p.ellipse(0, 0, ringRadius * 2);
    if (sunRadius) {
        p.fill(255, 204, 0);
        p.ellipse(0, 0, sunRadius * 2);
    }
    let numPlanets = parseInt(document.getElementById('numPlanets').value);
    for (let i = 0; i < numPlanets; i++) {
        let x = p.cos(angle + i * 360 / numPlanets) * (ringRadius - planetRadius);
        let y = p.sin(angle + i * 360 / numPlanets) * (ringRadius - planetRadius);
        p.fill(0, 102, 255);
        p.ellipse(x, y, planetRadius * 2);
    }
}
function updateGearFirstStage() {
    let module = parseFloat(document.getElementById('module').value);
    let sunTeeth = parseFloat(document.getElementById('sunTeeth').value);
    let ringTeeth1 = parseFloat(document.getElementById('ringTeeth1').value);
    let planetTeeth = (ringTeeth1 - sunTeeth) / 2;

    sunRadius = module * sunTeeth / 2;
    planetRadius = module * planetTeeth / 2;
    ringRadius = module * ringTeeth1 / 2;
}

function updateGearSecondStage() {
    let module = parseFloat(document.getElementById('module').value);
    let planetTeeth2 = parseFloat(document.getElementById('planetTeeth2').value);
    let ringTeeth2 = parseFloat(document.getElementById('ringTeeth2').value);

    planetRadius = module * planetTeeth2 / 2;
    ringRadius = module * ringTeeth2 / 2;
}

function updateGear() {
    updateGearFirstStage();
    updateGearSecondStage();

    let module = parseFloat(document.getElementById('module').value);
    let sunTeeth = parseInt(document.getElementById('sunTeeth').value);
    let ringTeeth1 = parseInt(document.getElementById('ringTeeth1').value);
    let inputTorque = parseFloat(document.getElementById('inputTorque').value);
    let inputSpeed = parseFloat(document.getElementById('inputSpeed').value);
    let numPlanets = parseInt(document.getElementById('numPlanets').value);

    let gearRatio1 = 1 + (ringTeeth1 / sunTeeth);
    let planetTeeth1 = (ringTeeth1 - sunTeeth) / 2;
    let outputTorque1 = inputTorque / gearRatio1;
    let outputSpeed1 = inputSpeed / gearRatio1;
    let sunDiameter = module * sunTeeth;
    let ringDiameter1 = module * ringTeeth1;
    let centerDistance1 = (ringDiameter1 - sunDiameter) / 2;

    document.getElementById('gearRatio1').textContent = `Rapport de réduction (1er étage) : ${gearRatio1.toFixed(2)}`;
    document.getElementById('planetTeeth1').textContent = `Dents des planètes (1er étage) : ${planetTeeth1}`;
    document.getElementById('outputTorque1').textContent = `Couple de sortie (1er étage) : ${outputTorque1.toFixed(2)} Nm`;
    document.getElementById('outputSpeed1').textContent = `Vitesse de sortie (1er étage) : ${outputSpeed1.toFixed(2)} tr/min`;
    document.getElementById('realSizes1').textContent = `Diamètre du soleil: ${sunDiameter}mm, Diamètre couronne: ${ringDiameter1}mm`;
    document.getElementById('dimensions1').textContent = `Entraxe: ${centerDistance1.toFixed(2)}mm`;

    if (document.getElementById('enableSecondStage').checked) {
        let planetTeeth2 = parseInt(document.getElementById('planetTeeth2').value);
        let ringTeeth2 = parseInt(document.getElementById('ringTeeth2').value);
        let gearRatio2 = 1 + (ringTeeth2 / planetTeeth2);
        let outputTorque2 = outputTorque1;
        let outputSpeed2 = outputSpeed1;
        let totalReduction = gearRatio1 * gearRatio2;
        let ringDiameter2 = module * ringTeeth2;
        let centerDistance2 = (ringDiameter2 - ringDiameter1) / 2;

        document.getElementById('gearRatio2').textContent = `Rapport de réduction (2e étage) : ${gearRatio2.toFixed(2)}`;
        document.getElementById('outputTorque2').textContent = `Couple de sortie (2e étage) : ${outputTorque2.toFixed(2)} Nm`;
        document.getElementById('outputSpeed2').textContent = `Vitesse de sortie (2e étage) : ${outputSpeed2.toFixed(2)} tr/min`;
        document.getElementById('realSizes2').textContent = `Diamètre couronne: ${ringDiameter2}mm`;
        document.getElementById('dimensions2').textContent = `Entraxe: ${centerDistance2.toFixed(2)}mm`;
        document.getElementById('totalReduction').textContent = `Réduction Totale : ${totalReduction.toFixed(2)}`;
    document.getElementById('secondStageInfo').style.display = 'block';
    } else {
        document.getElementById('totalReduction').textContent = `Réduction Totale : ${gearRatio1.toFixed(2)}`;
        document.getElementById('secondStageInfo').style.display = 'none';
    }
}


function toggleSecondStage() {
    document.getElementById('secondStageControls').style.display = document.getElementById('enableSecondStage').checked ? 'block' : 'none';
    updateGear();
}
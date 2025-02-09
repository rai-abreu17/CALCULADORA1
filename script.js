function solveProblem() {
  // Leitura do peso da luminária
  const F = parseFloat(document.getElementById('force').value);
  const angleOrientation = document.getElementById('angleOrientation').value;
  
  // Leitura dos ângulos (em graus)
  let angleAC = parseFloat(document.getElementById('angleAC').value);
  let angleAD = parseFloat(document.getElementById('angleAD').value);
  
  // Leitura dos diâmetros (convertendo de mm para m)
  const dAB = parseFloat(document.getElementById('diameterAB').value) / 1000;
  const dAC = parseFloat(document.getElementById('diameterAC').value) / 1000;
  const dAD = parseFloat(document.getElementById('diameterAD').value) / 1000;
  
  // Cálculo das áreas (usando A = (π/4)*d²)
  const A_AB = Math.PI * Math.pow(dAB, 2) / 4;
  const A_AC = Math.PI * Math.pow(dAC, 2) / 4;
  const A_AD = Math.PI * Math.pow(dAD, 2) / 4;
  
  let F_AD, F_AC, F_AB;
  
  if(angleOrientation === "horizontal") {
    // Os ângulos são medidos a partir da horizontal.
    const θ_AC = angleAC * Math.PI / 180;
    const θ_AD = angleAD * Math.PI / 180;
    
    // Relação de forças entre AC e AD, considerando que há duas hastes AC:
    // (F_AC_individual / A_AC) = (F_AD / A_AD)  =>  F_AC_individual = (A_AC/A_AD)*F_AD
    // F_AC_total = 2 * F_AC_individual = (2*A_AC/A_AD)*F_AD
    const relacaoForcas = (2 * A_AC) / A_AD;
    
    // Equilíbrio vertical (as hastes AC e AD suportam a carga vertical):
    // F_AC_total*sin(θ_AC) + F_AD*sin(θ_AD) = F
    const denom = (relacaoForcas * Math.sin(θ_AC)) + Math.sin(θ_AD);
    F_AD = F / denom;
    F_AC = relacaoForcas * F_AD;
    
    // Para os cálculos de tensão, definimos que a haste AB deverá ser dimensionada para suportar F.
    F_AB = F;
  } else {
    // Os ângulos são medidos a partir da vertical.
    const θ_AC_v = angleAC * Math.PI / 180;
    const θ_AD_v = angleAD * Math.PI / 180;
    
    // Nesse caso, o equilíbrio vertical é:
    // 2*F_AC_individual*cos(θ_AC_v) + F_AD*cos(θ_AD_v) = F,
    // com F_AC_total = 2*F_AC_individual = 2*(A_AC/A_AD)*F_AD.
    F_AD = F / ((2*(A_AC/A_AD)*Math.cos(θ_AC_v)) + Math.cos(θ_AD_v));
    F_AC = 2 * (A_AC/A_AD) * F_AD;
    
    // Novamente, para efeito do dimensionamento, forçamos F_AB = F.
    F_AB = F;
  }
  
  // Cálculo das tensões (stress = Força / Área)
  // Converter para MPa dividindo por 1e6 (1 MPa = 1e6 Pa)
  const σ_AC = Math.abs(F_AC / A_AC) / 1e6;
  const σ_AD = Math.abs(F_AD / A_AD) / 1e6;
  const σ_AB = Math.abs(F_AB / A_AB) / 1e6;
  
  // Exibição dos resultados
  document.getElementById('stressAC').textContent = σ_AC.toFixed(2);
  document.getElementById('stressAD').textContent = σ_AD.toFixed(2);
  document.getElementById('stressAB').textContent = σ_AB.toFixed(2);
  
  document.getElementById('forceAC').textContent = F_AC.toFixed(2);
  document.getElementById('forceAD').textContent = F_AD.toFixed(2);
  document.getElementById('forceAB').textContent = F_AB.toFixed(2);
}

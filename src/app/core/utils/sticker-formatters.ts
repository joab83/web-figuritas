const GROUP_NAMES: Record<string, string> = {
  ALG: 'Argelia',
  ARG: 'Argentina',
  AUS: 'Australia',
  AUT: 'Austria',
  BEL: 'Bélgica',
  BIH: 'Bosnia y Herzegovina',
  BRA: 'Brasil',
  CAN: 'Canadá',
  CIV: 'Costa de Marfil',
  COD: 'República Democrática del Congo',
  COL: 'Colombia',
  CPV: 'Cabo Verde',
  CRO: 'Croacia',
  CUW: 'Curazao',
  CZE: 'República Checa',
  ECU: 'Ecuador',
  EGY: 'Egipto',
  ENG: 'Inglaterra',
  ESP: 'España',
  FRA: 'Francia',
  FWC: 'FIFA World Cup',
  GER: 'Alemania',
  GHA: 'Ghana',
  HAI: 'Haití',
  IRN: 'Irán',
  IRQ: 'Irak',
  JOR: 'Jordania',
  JPN: 'Japón',
  KOR: 'Corea del Sur',
  KSA: 'Arabia Saudita',
  MAR: 'Marruecos',
  MEX: 'México',
  NED: 'Países Bajos',
  NOR: 'Noruega',
  NZL: 'Nueva Zelanda',
  PAN: 'Panamá',
  PAR: 'Paraguay',
  POR: 'Portugal',
  QAT: 'Catar',
  RSA: 'Sudáfrica',
  SCO: 'Escocia',
  SEN: 'Senegal',
  SUI: 'Suiza',
  SWE: 'Suecia',
  TUN: 'Túnez',
  TUR: 'Turquía',
  URU: 'Uruguay',
  USA: 'Estados Unidos',
  UZB: 'Uzbekistán'
};

export function formatStickerSku(sku: string): string {
  return sku.replace(/^([A-Za-z]+)(\d+)$/, '$1 $2');
}

export function getGroupName(group: string): string {
  return GROUP_NAMES[group] ?? group;
}

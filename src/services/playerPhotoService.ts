// Player Photo Service: Verified portraits and real-time image resolution for Premier League stars

export function normalizePlayerName(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip diacritics
    .replace(/[\uFFFD]/g, '')       // strip replacement characters
    .replace(/[^a-zA-Z0-9\s]/g, '')  // strip punctuation
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');
}

// Verified Premier League portraits with exact matching
const VERIFIED_PORTRAITS: Record<string, string> = {
  "erling haaland": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/43/Erling_Haaland_Morocco_v_Norway_7_June_2026-51.jpg/330px-Erling_Haaland_Morocco_v_Norway_7_June_2026-51.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "haaland": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/43/Erling_Haaland_Morocco_v_Norway_7_June_2026-51.jpg/330px-Erling_Haaland_Morocco_v_Norway_7_June_2026-51.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "alexander isak": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/32/Alexander_Isak_-_Sweden_-_Greece21_%28cropped%29.jpg/330px-Alexander_Isak_-_Sweden_-_Greece21_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "isak": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/32/Alexander_Isak_-_Sweden_-_Greece21_%28cropped%29.jpg/330px-Alexander_Isak_-_Sweden_-_Greece21_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "morgan rogers": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/28/Morgan_Rogers_England_v_Panama_27_June_26-144_%28cropped%29.jpg/330px-Morgan_Rogers_England_v_Panama_27_June_26-144_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "rogers": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/28/Morgan_Rogers_England_v_Panama_27_June_26-144_%28cropped%29.jpg/330px-Morgan_Rogers_England_v_Panama_27_June_26-144_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "marcus tavernier": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/Marcus_Tavernier_2022.jpg/330px-Marcus_Tavernier_2022.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "tavernier": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/Marcus_Tavernier_2022.jpg/330px-Marcus_Tavernier_2022.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "nicolas jackson": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/35/Nicolas_Jackson_France_v_Senegal_16_June_2026-369_%28cropped%29.jpg/330px-Nicolas_Jackson_France_v_Senegal_16_June_2026-369_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "jackson": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/35/Nicolas_Jackson_France_v_Senegal_16_June_2026-369_%28cropped%29.jpg/330px-Nicolas_Jackson_France_v_Senegal_16_June_2026-369_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "joao pedro": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Jo%C3%A3o_Pedro%2C_2025_FIFA_Club_World_Cup_final_%2854654843615%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
  "joão pedro": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Jo%C3%A3o_Pedro%2C_2025_FIFA_Club_World_Cup_final_%2854654843615%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
  "pedro": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Jo%C3%A3o_Pedro%2C_2025_FIFA_Club_World_Cup_final_%2854654843615%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
  "bryan mbeumo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/78/Bryan_Mbeumo_00-02-31.18.png/330px-Bryan_Mbeumo_00-02-31.18.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "mbeumo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/78/Bryan_Mbeumo_00-02-31.18.png/330px-Bryan_Mbeumo_00-02-31.18.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "evanilson": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e2/Evanilson_2024.jpg/330px-Evanilson_2024.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "rayan cherki": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/97/Rayan_Cherki_France_v_Norway_26_June_26-114.jpg/330px-Rayan_Cherki_France_v_Norway_26_June_26-114.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "cherki": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/97/Rayan_Cherki_France_v_Norway_26_June_26-114.jpg/330px-Rayan_Cherki_France_v_Norway_26_June_26-114.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "pascal gross": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/51/Pascal_Gross_Ecuador_v_Germany_25_June_2026-065.jpg/330px-Pascal_Gross_Ecuador_v_Germany_25_June_2026-065.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "gross": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/51/Pascal_Gross_Ecuador_v_Germany_25_June_2026-065.jpg/330px-Pascal_Gross_Ecuador_v_Germany_25_June_2026-065.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "cole palmer": "https://upload.wikimedia.org/wikipedia/commons/f/fb/Cole_Palmer_2025_FIFA_Club_World_Cup_Final.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
  "palmer": "https://upload.wikimedia.org/wikipedia/commons/f/fb/Cole_Palmer_2025_FIFA_Club_World_Cup_Final.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
  "dominic calvertlewin": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5e/Dominic_Calvert-Lewin_13092025_%285%29.jpg/330px-Dominic_Calvert-Lewin_13092025_%285%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "dominic calvert-lewin": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5e/Dominic_Calvert-Lewin_13092025_%285%29.jpg/330px-Dominic_Calvert-Lewin_13092025_%285%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "calvertlewin": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5e/Dominic_Calvert-Lewin_13092025_%285%29.jpg/330px-Dominic_Calvert-Lewin_13092025_%285%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "kevin schade": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5a/Kevin_Schade_02082025_%281%29.jpg/330px-Kevin_Schade_02082025_%281%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "schade": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5a/Kevin_Schade_02082025_%281%29.jpg/330px-Kevin_Schade_02082025_%281%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "pedro neto": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/68/Pedro_Neto_Croatia_v_Portugal_2_July_2026-113.jpg/330px-Pedro_Neto_Croatia_v_Portugal_2_July_2026-113.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "neto": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/68/Pedro_Neto_Croatia_v_Portugal_2_July_2026-113.jpg/330px-Pedro_Neto_Croatia_v_Portugal_2_July_2026-113.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "kai havertz": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/76/Kai_Havertz_Ecuador_v_Germany_25_June_2026-118.jpg/330px-Kai_Havertz_Ecuador_v_Germany_25_June_2026-118.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "havertz": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/76/Kai_Havertz_Ecuador_v_Germany_25_June_2026-118.jpg/330px-Kai_Havertz_Ecuador_v_Germany_25_June_2026-118.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "jack rudoni": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/06/Jack_Rudoni.png/330px-Jack_Rudoni.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "rudoni": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/06/Jack_Rudoni.png/330px-Jack_Rudoni.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "charalambos kostoulas": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/94/Charalampos_Kostoulas_24012026_%282%29.jpg/330px-Charalampos_Kostoulas_24012026_%282%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "kostoulas": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/94/Charalampos_Kostoulas_24012026_%282%29.jpg/330px-Charalampos_Kostoulas_24012026_%282%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "bruno fernandes": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c7/Bruno_Fernandes_USMNT_v_Portugal_Mar_31_2026-27_%28cropped%29.jpg/330px-Bruno_Fernandes_USMNT_v_Portugal_Mar_31_2026-27_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "fernandes": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c7/Bruno_Fernandes_USMNT_v_Portugal_Mar_31_2026-27_%28cropped%29.jpg/330px-Bruno_Fernandes_USMNT_v_Portugal_Mar_31_2026-27_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "yasin ayari": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/Yasin_Ayari_-_Sweden_-_Greece20_%28cropped%29.jpg/330px-Yasin_Ayari_-_Sweden_-_Greece20_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "ayari": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/Yasin_Ayari_-_Sweden_-_Greece20_%28cropped%29.jpg/330px-Yasin_Ayari_-_Sweden_-_Greece20_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "bukayo saka": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2f/Bukayo_Saka_England_v_Ghana_23_June_2026-057_%28cropped%29.jpg/330px-Bukayo_Saka_England_v_Ghana_23_June_2026-057_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "saka": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2f/Bukayo_Saka_England_v_Ghana_23_June_2026-057_%28cropped%29.jpg/330px-Bukayo_Saka_England_v_Ghana_23_June_2026-057_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "brian brobbey": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0b/GAE_-_Ajax_-_52788469380_%28Brobbey%29.jpg/330px-GAE_-_Ajax_-_52788469380_%28Brobbey%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "brobbey": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0b/GAE_-_Ajax_-_52788469380_%28Brobbey%29.jpg/330px-GAE_-_Ajax_-_52788469380_%28Brobbey%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "jack hinshelwood": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9f/Jack_Hinshelwood_24012026_%282%29.jpg/330px-Jack_Hinshelwood_24012026_%282%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "hinshelwood": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9f/Jack_Hinshelwood_24012026_%282%29.jpg/330px-Jack_Hinshelwood_24012026_%282%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "leif davis": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/80/Davis_220826.jpg/330px-Davis_220826.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "davis": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/80/Davis_220826.jpg/330px-Davis_220826.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "jan paul van hecke": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/72/Jan_Paul_van_Hecke_24012026_%282%29_%28cropped%29.jpg/330px-Jan_Paul_van_Hecke_24012026_%282%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "hecke": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/72/Jan_Paul_van_Hecke_24012026_%282%29_%28cropped%29.jpg/330px-Jan_Paul_van_Hecke_24012026_%282%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "kiernan dewsburyhall": "https://upload.wikimedia.org/wikipedia/commons/7/77/Kiernan_Dewsbury-Hall_FIFA_Club_World_Cup_final_extraction.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
  "kiernan dewsbury-hall": "https://upload.wikimedia.org/wikipedia/commons/7/77/Kiernan_Dewsbury-Hall_FIFA_Club_World_Cup_final_extraction.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
  "dewsburyhall": "https://upload.wikimedia.org/wikipedia/commons/7/77/Kiernan_Dewsbury-Hall_FIFA_Club_World_Cup_final_extraction.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
  "igor thiago": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fb/Igor_Thiago_Brazil_V_Morocco_13_June_2026-120_%28cropped%29.jpg/330px-Igor_Thiago_Brazil_V_Morocco_13_June_2026-120_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "thiago": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fb/Igor_Thiago_Brazil_V_Morocco_13_June_2026-120_%28cropped%29.jpg/330px-Igor_Thiago_Brazil_V_Morocco_13_June_2026-120_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "oliver mcburnie": "https://upload.wikimedia.org/wikipedia/commons/6/63/McBurnie_and_PSG_superstar_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
  "mcburnie": "https://upload.wikimedia.org/wikipedia/commons/6/63/McBurnie_and_PSG_superstar_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
  "harvey barnes": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5c/Harvey_Barnes_2022_%28cropped%29.jpg/330px-Harvey_Barnes_2022_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "barnes": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5c/Harvey_Barnes_2022_%28cropped%29.jpg/330px-Harvey_Barnes_2022_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "tyrick mitchell": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/54/Tyrick_Mitchell%2C_Manchester_United_v_Crystal_Palace%2C_5_December_2021_%28cropped%29.jpg/330px-Tyrick_Mitchell%2C_Manchester_United_v_Crystal_Palace%2C_5_December_2021_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "mitchell": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/54/Tyrick_Mitchell%2C_Manchester_United_v_Crystal_Palace%2C_5_December_2021_%28cropped%29.jpg/330px-Tyrick_Mitchell%2C_Manchester_United_v_Crystal_Palace%2C_5_December_2021_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "enzo le fee": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/89/Enzo_Le_F%C3%A9e_SAFC_August_2025.jpg/330px-Enzo_Le_F%C3%A9e_SAFC_August_2025.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "enzo le fée": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/89/Enzo_Le_F%C3%A9e_SAFC_August_2025.jpg/330px-Enzo_Le_F%C3%A9e_SAFC_August_2025.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "maxim de cuyper": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dc/Maxim_De_Cuyper_USMNT_v_Belgium_Mar_28_2026-79_%28cropped%29.jpg/330px-Maxim_De_Cuyper_USMNT_v_Belgium_Mar_28_2026-79_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "cuyper": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dc/Maxim_De_Cuyper_USMNT_v_Belgium_Mar_28_2026-79_%28cropped%29.jpg/330px-Maxim_De_Cuyper_USMNT_v_Belgium_Mar_28_2026-79_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "declan rice": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/Declan_Rice_England_v_Ghana_23_June_2026-150.jpg/330px-Declan_Rice_England_v_Ghana_23_June_2026-150.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "rice": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/Declan_Rice_England_v_Ghana_23_June_2026-150.jpg/330px-Declan_Rice_England_v_Ghana_23_June_2026-150.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "daichi kamada": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e4/2022128173756_2022-05-08_Fussball_Eintracht_Frankfurt_vs_Borussia_M%C3%B6nchengladbach_-_Sven_-_1D_X_MK_II_-_0725_-_AK8I7460_%28Daichi_Kamada_cropped%29.jpg/330px-2022128173756_2022-05-08_Fussball_Eintracht_Frankfurt_vs_Borussia_M%C3%B6nchengladbach_-_Sven_-_1D_X_MK_II_-_0725_-_AK8I7460_%28Daichi_Kamada_cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "kamada": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e4/2022128173756_2022-05-08_Fussball_Eintracht_Frankfurt_vs_Borussia_M%C3%B6nchengladbach_-_Sven_-_1D_X_MK_II_-_0725_-_AK8I7460_%28Daichi_Kamada_cropped%29.jpg/330px-2022128173756_2022-05-08_Fussball_Eintracht_Frankfurt_vs_Borussia_M%C3%B6nchengladbach_-_Sven_-_1D_X_MK_II_-_0725_-_AK8I7460_%28Daichi_Kamada_cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "john mcginn": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/63/John_McGinn_Scotland_v_Bolivia_6_June_2026-2.jpg/330px-John_McGinn_Scotland_v_Bolivia_6_June_2026-2.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "mcginn": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/63/John_McGinn_Scotland_v_Bolivia_6_June_2026-2.jpg/330px-John_McGinn_Scotland_v_Bolivia_6_June_2026-2.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "josko gvardiol": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/58/Josko_Gvardiol_Croatia_v_Portugal_2_July_2026-262.jpg/330px-Josko_Gvardiol_Croatia_v_Portugal_2_July_2026-262.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "gvardiol": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/58/Josko_Gvardiol_Croatia_v_Portugal_2_July_2026-262.jpg/330px-Josko_Gvardiol_Croatia_v_Portugal_2_July_2026-262.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "mohammed kudus": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ef/Mohammed_Kudus_of_West_Ham_United.jpeg/330px-Mohammed_Kudus_of_West_Ham_United.jpeg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "kudus": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ef/Mohammed_Kudus_of_West_Ham_United.jpeg/330px-Mohammed_Kudus_of_West_Ham_United.jpeg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "antoine semenyo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/51/Antoine_Semenyo_England_v_Ghana_23_June_2026-209_%28cropped2%29.jpg/330px-Antoine_Semenyo_England_v_Ghana_23_June_2026-209_%28cropped2%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "semenyo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/51/Antoine_Semenyo_England_v_Ghana_23_June_2026-209_%28cropped2%29.jpg/330px-Antoine_Semenyo_England_v_Ghana_23_June_2026-209_%28cropped2%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "ben white": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a0/Ben_White_2018.jpg/330px-Ben_White_2018.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "white": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a0/Ben_White_2018.jpg/330px-Ben_White_2018.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "cody gakpo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9e/Netherlands_v_Tunisia_2026_World_Cup_-_55373562032_%28Cody_Gakpo%29.jpg/330px-Netherlands_v_Tunisia_2026_World_Cup_-_55373562032_%28Cody_Gakpo%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "gakpo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9e/Netherlands_v_Tunisia_2026_World_Cup_-_55373562032_%28Cody_Gakpo%29.jpg/330px-Netherlands_v_Tunisia_2026_World_Cup_-_55373562032_%28Cody_Gakpo%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "diego gomez": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Diego_Gomez_France_v_Paraguay_4_July_2026-024.jpg/330px-Diego_Gomez_France_v_Paraguay_4_July_2026-024.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "diego gómez": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Diego_Gomez_France_v_Paraguay_4_July_2026-024.jpg/330px-Diego_Gomez_France_v_Paraguay_4_July_2026-024.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "gomez": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Diego_Gomez_France_v_Paraguay_4_July_2026-024.jpg/330px-Diego_Gomez_France_v_Paraguay_4_July_2026-024.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "julio enciso": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Julio_Enciso_France_v_Paraguay_4_July_2026-039.jpg/330px-Julio_Enciso_France_v_Paraguay_4_July_2026-039.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "enciso": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Julio_Enciso_France_v_Paraguay_4_July_2026-039.jpg/330px-Julio_Enciso_France_v_Paraguay_4_July_2026-039.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "florian wirtz": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/70/Florian_Wirtz_Ecuador_v_Germany_25_June_2026-181_%28cropped%29.jpg/330px-Florian_Wirtz_Ecuador_v_Germany_25_June_2026-181_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "wirtz": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/70/Florian_Wirtz_Ecuador_v_Germany_25_June_2026-181_%28cropped%29.jpg/330px-Florian_Wirtz_Ecuador_v_Germany_25_June_2026-181_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "riccardo calafiori": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/46/1_Riccardo_Calafiori_2026_%28cropped%29.jpg/330px-1_Riccardo_Calafiori_2026_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "calafiori": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/46/1_Riccardo_Calafiori_2026_%28cropped%29.jpg/330px-1_Riccardo_Calafiori_2026_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "matheus cunha": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/31/Matheus_Cunha_Brazil_V_Morocco_13_June_2026-178_%28cropped%29.jpg/330px-Matheus_Cunha_Brazil_V_Morocco_13_June_2026-178_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "cunha": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/31/Matheus_Cunha_Brazil_V_Morocco_13_June_2026-178_%28cropped%29.jpg/330px-Matheus_Cunha_Brazil_V_Morocco_13_June_2026-178_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "abdoul ouattara": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/70/Abdoul_Ouattara_190926.jpg/330px-Abdoul_Ouattara_190926.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "ouattara": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/70/Abdoul_Ouattara_190926.jpg/330px-Abdoul_Ouattara_190926.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "brandon thomasasante": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d9/Brandon_Thomas-Asante_England_v_Ghana_23_June_2026-109.jpg/330px-Brandon_Thomas-Asante_England_v_Ghana_23_June_2026-109.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "brandon thomas-asante": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d9/Brandon_Thomas-Asante_England_v_Ghana_23_June_2026-109.jpg/330px-Brandon_Thomas-Asante_England_v_Ghana_23_June_2026-109.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "thomasasante": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d9/Brandon_Thomas-Asante_England_v_Ghana_23_June_2026-109.jpg/330px-Brandon_Thomas-Asante_England_v_Ghana_23_June_2026-109.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "jaidon anthony": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9c/Jaidon_Anthony_26042025_%283%29.jpg/330px-Jaidon_Anthony_26042025_%283%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "anthony": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9c/Jaidon_Anthony_26042025_%283%29.jpg/330px-Jaidon_Anthony_26042025_%283%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "morgan gibbswhite": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/61/Morgan_Gibbs-White_-_Nottingham_Forest_-_2025.jpg/330px-Morgan_Gibbs-White_-_Nottingham_Forest_-_2025.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "morgan gibbs-white": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/61/Morgan_Gibbs-White_-_Nottingham_Forest_-_2025.jpg/330px-Morgan_Gibbs-White_-_Nottingham_Forest_-_2025.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "gibbswhite": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/61/Morgan_Gibbs-White_-_Nottingham_Forest_-_2025.jpg/330px-Morgan_Gibbs-White_-_Nottingham_Forest_-_2025.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "andy robertson": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9a/Andy_Robertson_Scotland_v_Bolivia_6_June_2026-43.jpg/330px-Andy_Robertson_Scotland_v_Bolivia_6_June_2026-43.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "robertson": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9a/Andy_Robertson_Scotland_v_Bolivia_6_June_2026-43.jpg/330px-Andy_Robertson_Scotland_v_Bolivia_6_June_2026-43.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "amar dedic": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8e/FC_Salzburg_gegen_Paris_Saint-Germain_UEFA_Champions_League_16.jpg/330px-FC_Salzburg_gegen_Paris_Saint-Germain_UEFA_Champions_League_16.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "dedic": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8e/FC_Salzburg_gegen_Paris_Saint-Germain_UEFA_Champions_League_16.jpg/330px-FC_Salzburg_gegen_Paris_Saint-Germain_UEFA_Champions_League_16.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "bradley barcola": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f6/Bradley_Barcola_France_v_Spain_7.24.26-112_%28cropped%29.jpg/330px-Bradley_Barcola_France_v_Spain_7.24.26-112_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "barcola": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f6/Bradley_Barcola_France_v_Spain_7.24.26-112_%28cropped%29.jpg/330px-Bradley_Barcola_France_v_Spain_7.24.26-112_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "kobbie mainoo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1f/Kobbie_Mainoo_England_v_Ghana_23_June_2026-042.jpg/330px-Kobbie_Mainoo_England_v_Ghana_23_June_2026-042.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "mainoo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1f/Kobbie_Mainoo_England_v_Ghana_23_June_2026-042.jpg/330px-Kobbie_Mainoo_England_v_Ghana_23_June_2026-042.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "casemiro": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2f/Casemiro_Brazil_V_Morocco_13_June_2026-76_%28cropped%29.jpg/330px-Casemiro_Brazil_V_Morocco_13_June_2026-76_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "lisandro martinez": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6e/Lisandro_Martinez_Argentina_v_Egypt_7_July_2026-343_%28cropped%29.jpg/330px-Lisandro_Martinez_Argentina_v_Egypt_7_July_2026-343_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "lisandro martínez": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6e/Lisandro_Martinez_Argentina_v_Egypt_7_July_2026-343_%28cropped%29.jpg/330px-Lisandro_Martinez_Argentina_v_Egypt_7_July_2026-343_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "martinez": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d9/Emiliano_Martinez_Argentina_v_Spain_19_July_2026-269.jpg/330px-Emiliano_Martinez_Argentina_v_Spain_19_July_2026-269.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "matthijs de ligt": "https://upload.wikimedia.org/wikipedia/commons/c/c9/2022-07-30_Fu%C3%9Fball%2C_M%C3%A4nner%2C_DFL-Supercup%2C_RB_Leipzig_-_FC_Bayern_M%C3%BCnchen_Matthijs_de_Ligt_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
  "ligt": "https://upload.wikimedia.org/wikipedia/commons/c/c9/2022-07-30_Fu%C3%9Fball%2C_M%C3%A4nner%2C_DFL-Supercup%2C_RB_Leipzig_-_FC_Bayern_M%C3%BCnchen_Matthijs_de_Ligt_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
  "andre onana": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/67/Andr%C3%A9_Onana.jpg/330px-Andr%C3%A9_Onana.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "andré onana": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/67/Andr%C3%A9_Onana.jpg/330px-Andr%C3%A9_Onana.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "onana": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/67/Andr%C3%A9_Onana.jpg/330px-Andr%C3%A9_Onana.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "phil foden": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/53/2023-10-04_Fu%C3%9Fball%2C_M%C3%A4nner%2C_UEFA_Champions_League%2C_RB_Leipzig_-_Manchester_City_FC_1DX_2613%2C_Phil_Foden.jpg/330px-2023-10-04_Fu%C3%9Fball%2C_M%C3%A4nner%2C_UEFA_Champions_League%2C_RB_Leipzig_-_Manchester_City_FC_1DX_2613%2C_Phil_Foden.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "foden": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/53/2023-10-04_Fu%C3%9Fball%2C_M%C3%A4nner%2C_UEFA_Champions_League%2C_RB_Leipzig_-_Manchester_City_FC_1DX_2613%2C_Phil_Foden.jpg/330px-2023-10-04_Fu%C3%9Fball%2C_M%C3%A4nner%2C_UEFA_Champions_League%2C_RB_Leipzig_-_Manchester_City_FC_1DX_2613%2C_Phil_Foden.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "kevin de bruyne": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Kevin_De_Bruyne_USMNT_v_Belgium_Mar_28_2026-64_%28cropped%29.jpg/330px-Kevin_De_Bruyne_USMNT_v_Belgium_Mar_28_2026-64_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "bruyne": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Kevin_De_Bruyne_USMNT_v_Belgium_Mar_28_2026-64_%28cropped%29.jpg/330px-Kevin_De_Bruyne_USMNT_v_Belgium_Mar_28_2026-64_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "rodri": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7a/Rodri_Argentina_v_Spain_19_July_2026-187_%28cropped%29.jpg/330px-Rodri_Argentina_v_Spain_19_July_2026-187_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "bernardo silva": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/Bernardo_Silva_Croatia_v_Portugal_2_July_2026-238.jpg/330px-Bernardo_Silva_Croatia_v_Portugal_2_July_2026-238.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "silva": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/Bernardo_Silva_Croatia_v_Portugal_2_July_2026-238.jpg/330px-Bernardo_Silva_Croatia_v_Portugal_2_July_2026-238.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "ruben dias": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/Ruben_Dias_Croatia_v_Portugal_2_July_2026-228_%28cropped%29.jpg/330px-Ruben_Dias_Croatia_v_Portugal_2_July_2026-228_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "rúben dias": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/Ruben_Dias_Croatia_v_Portugal_2_July_2026-228_%28cropped%29.jpg/330px-Ruben_Dias_Croatia_v_Portugal_2_July_2026-228_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "dias": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/Ruben_Dias_Croatia_v_Portugal_2_July_2026-228_%28cropped%29.jpg/330px-Ruben_Dias_Croatia_v_Portugal_2_July_2026-228_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "david raya": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8a/David_Raya_Argentina_v_Spain_19_July_2026-003_%28cropped%29.jpg/330px-David_Raya_Argentina_v_Spain_19_July_2026-003_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "raya": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8a/David_Raya_Argentina_v_Spain_19_July_2026-003_%28cropped%29.jpg/330px-David_Raya_Argentina_v_Spain_19_July_2026-003_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "william saliba": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/06/William_Saliba_France_v_Paraguay_4_July_2026-183.jpg/330px-William_Saliba_France_v_Paraguay_4_July_2026-183.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "saliba": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/06/William_Saliba_France_v_Paraguay_4_July_2026-183.jpg/330px-William_Saliba_France_v_Paraguay_4_July_2026-183.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "gabriel magalhaes": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8e/Gabriel_Magalhaes_Brazil_V_Morocco_13_June_2026-132_%28cropped%29.jpg/330px-Gabriel_Magalhaes_Brazil_V_Morocco_13_June_2026-132_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "gabriel magalhães": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8e/Gabriel_Magalhaes_Brazil_V_Morocco_13_June_2026-132_%28cropped%29.jpg/330px-Gabriel_Magalhaes_Brazil_V_Morocco_13_June_2026-132_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "magalhaes": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8e/Gabriel_Magalhaes_Brazil_V_Morocco_13_June_2026-132_%28cropped%29.jpg/330px-Gabriel_Magalhaes_Brazil_V_Morocco_13_June_2026-132_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "martin degaard": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/13/Martin_Odegaard_France_v_Norway_26_June_26-014.jpg/330px-Martin_Odegaard_France_v_Norway_26_June_26-014.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "martin ødegaard": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/13/Martin_Odegaard_France_v_Norway_26_June_26-014.jpg/330px-Martin_Odegaard_France_v_Norway_26_June_26-014.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "degaard": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/13/Martin_Odegaard_France_v_Norway_26_June_26-014.jpg/330px-Martin_Odegaard_France_v_Norway_26_June_26-014.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "gabriel martinelli": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/Gabriel_Martinelli_Brazil_V_Morocco_13_June_2026-144.jpg/330px-Gabriel_Martinelli_Brazil_V_Morocco_13_June_2026-144.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "martinelli": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/Gabriel_Martinelli_Brazil_V_Morocco_13_June_2026-144.jpg/330px-Gabriel_Martinelli_Brazil_V_Morocco_13_June_2026-144.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "mohamed salah": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a6/Mohamed_Salah_Argentina_v_Egypt_7_July_2026-163_%28cropped%29.jpg/330px-Mohamed_Salah_Argentina_v_Egypt_7_July_2026-163_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "salah": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a6/Mohamed_Salah_Argentina_v_Egypt_7_July_2026-163_%28cropped%29.jpg/330px-Mohamed_Salah_Argentina_v_Egypt_7_July_2026-163_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "virgil van dijk": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/20160604_AUT_NED_8876_%28cropped%29.jpg/330px-20160604_AUT_NED_8876_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "dijk": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/20160604_AUT_NED_8876_%28cropped%29.jpg/330px-20160604_AUT_NED_8876_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "trent alexanderarnold": "https://upload.wikimedia.org/wikipedia/commons/5/5d/Trent_Alexander-Arnold_2018_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
  "trent alexander-arnold": "https://upload.wikimedia.org/wikipedia/commons/5/5d/Trent_Alexander-Arnold_2018_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
  "alexanderarnold": "https://upload.wikimedia.org/wikipedia/commons/5/5d/Trent_Alexander-Arnold_2018_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
  "alisson becker": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4f/Alisson_Becker_Brazil_V_Morocco_13_June_2026-117_%28cropped%29.jpg/330px-Alisson_Becker_Brazil_V_Morocco_13_June_2026-117_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "becker": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4f/Alisson_Becker_Brazil_V_Morocco_13_June_2026-117_%28cropped%29.jpg/330px-Alisson_Becker_Brazil_V_Morocco_13_June_2026-117_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "luis diaz": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c7/FC_RB_Salzburg_gegen_FC_Bayern_M%C3%BCnchen_%282026-01-06_Testspiel%29_40_%28Luiz_D%C3%ADaz%29.jpg/330px-FC_RB_Salzburg_gegen_FC_Bayern_M%C3%BCnchen_%282026-01-06_Testspiel%29_40_%28Luiz_D%C3%ADaz%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "luis díaz": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c7/FC_RB_Salzburg_gegen_FC_Bayern_M%C3%BCnchen_%282026-01-06_Testspiel%29_40_%28Luiz_D%C3%ADaz%29.jpg/330px-FC_RB_Salzburg_gegen_FC_Bayern_M%C3%BCnchen_%282026-01-06_Testspiel%29_40_%28Luiz_D%C3%ADaz%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "diaz": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c7/FC_RB_Salzburg_gegen_FC_Bayern_M%C3%BCnchen_%282026-01-06_Testspiel%29_40_%28Luiz_D%C3%ADaz%29.jpg/330px-FC_RB_Salzburg_gegen_FC_Bayern_M%C3%BCnchen_%282026-01-06_Testspiel%29_40_%28Luiz_D%C3%ADaz%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "alexis mac allister": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/db/Alexis_Mac_Allister_Argentina_v_Spain_19_July_2026-162_%28cropped%29.jpg/330px-Alexis_Mac_Allister_Argentina_v_Spain_19_July_2026-162_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "allister": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/db/Alexis_Mac_Allister_Argentina_v_Spain_19_July_2026-162_%28cropped%29.jpg/330px-Alexis_Mac_Allister_Argentina_v_Spain_19_July_2026-162_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "dominik szoboszlai": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/52/Dominik_Szoboszlai_04012026_%281%29.jpg/330px-Dominik_Szoboszlai_04012026_%281%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "szoboszlai": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/52/Dominik_Szoboszlai_04012026_%281%29.jpg/330px-Dominik_Szoboszlai_04012026_%281%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "ryan gravenberch": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3e/2022-07-30_Fu%C3%9Fball%2C_M%C3%A4nner%2C_DFL-Supercup%2C_RB_Leipzig_-_FC_Bayern_M%C3%BCnchen_1DX_3342_by_Stepro_%28cropped%29.jpg/330px-2022-07-30_Fu%C3%9Fball%2C_M%C3%A4nner%2C_DFL-Supercup%2C_RB_Leipzig_-_FC_Bayern_M%C3%BCnchen_1DX_3342_by_Stepro_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "gravenberch": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3e/2022-07-30_Fu%C3%9Fball%2C_M%C3%A4nner%2C_DFL-Supercup%2C_RB_Leipzig_-_FC_Bayern_M%C3%BCnchen_1DX_3342_by_Stepro_%28cropped%29.jpg/330px-2022-07-30_Fu%C3%9Fball%2C_M%C3%A4nner%2C_DFL-Supercup%2C_RB_Leipzig_-_FC_Bayern_M%C3%BCnchen_1DX_3342_by_Stepro_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "ibrahima konate": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f2/Ibrahima_Konate_France_v_Senegal_16_June_2026-516_%28cropped%29.jpg/330px-Ibrahima_Konate_France_v_Senegal_16_June_2026-516_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "ibrahima konaté": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f2/Ibrahima_Konate_France_v_Senegal_16_June_2026-516_%28cropped%29.jpg/330px-Ibrahima_Konate_France_v_Senegal_16_June_2026-516_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "konate": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f2/Ibrahima_Konate_France_v_Senegal_16_June_2026-516_%28cropped%29.jpg/330px-Ibrahima_Konate_France_v_Senegal_16_June_2026-516_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "diogo jota": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/26/Diogo_Jota_2025_Cropped.jpg/330px-Diogo_Jota_2025_Cropped.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "jota": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/26/Diogo_Jota_2025_Cropped.jpg/330px-Diogo_Jota_2025_Cropped.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "enzo fernandez": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/10/Enzo_Fernandez_Argentina_v_Spain_19_July_2026-050_%28cropped%29.jpg/330px-Enzo_Fernandez_Argentina_v_Spain_19_July_2026-050_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "enzo fernández": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/10/Enzo_Fernandez_Argentina_v_Spain_19_July_2026-050_%28cropped%29.jpg/330px-Enzo_Fernandez_Argentina_v_Spain_19_July_2026-050_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "fernandez": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/10/Enzo_Fernandez_Argentina_v_Spain_19_July_2026-050_%28cropped%29.jpg/330px-Enzo_Fernandez_Argentina_v_Spain_19_July_2026-050_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "moises caicedo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0e/Moises_Caicedo_Ecuador_v_Germany_25_June_2026-051_%28cropped%29.jpg/330px-Moises_Caicedo_Ecuador_v_Germany_25_June_2026-051_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "moisés caicedo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0e/Moises_Caicedo_Ecuador_v_Germany_25_June_2026-051_%28cropped%29.jpg/330px-Moises_Caicedo_Ecuador_v_Germany_25_June_2026-051_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "caicedo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0e/Moises_Caicedo_Ecuador_v_Germany_25_June_2026-051_%28cropped%29.jpg/330px-Moises_Caicedo_Ecuador_v_Germany_25_June_2026-051_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "levi colwill": "https://upload.wikimedia.org/wikipedia/commons/d/d1/Levi_Colwill_FIFA_Club_World_Cup_final_extraction.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
  "colwill": "https://upload.wikimedia.org/wikipedia/commons/d/d1/Levi_Colwill_FIFA_Club_World_Cup_final_extraction.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
  "marc cucurella": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8a/Marc_Cucurella_Argentina_v_Spain_19_July_2026-064_%28cropped%29.jpg/330px-Marc_Cucurella_Argentina_v_Spain_19_July_2026-064_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "cucurella": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8a/Marc_Cucurella_Argentina_v_Spain_19_July_2026-064_%28cropped%29.jpg/330px-Marc_Cucurella_Argentina_v_Spain_19_July_2026-064_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "malo gusto": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/Malo_Gusto_France_v_Senegal_16_June_2026-399.jpg/330px-Malo_Gusto_France_v_Senegal_16_June_2026-399.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "gusto": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/Malo_Gusto_France_v_Senegal_16_June_2026-399.jpg/330px-Malo_Gusto_France_v_Senegal_16_June_2026-399.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "robert sanchez": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4a/Robert_S%C3%A1nchez_FIFA_Club_World_Cup_final_extraction.jpg/330px-Robert_S%C3%A1nchez_FIFA_Club_World_Cup_final_extraction.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "robert sánchez": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4a/Robert_S%C3%A1nchez_FIFA_Club_World_Cup_final_extraction.jpg/330px-Robert_S%C3%A1nchez_FIFA_Club_World_Cup_final_extraction.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "sanchez": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4a/Robert_S%C3%A1nchez_FIFA_Club_World_Cup_final_extraction.jpg/330px-Robert_S%C3%A1nchez_FIFA_Club_World_Cup_final_extraction.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "reece james": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3e/Reece_James_England_v_Ghana_23_June_2026-248_%28cropped%29.jpg/330px-Reece_James_England_v_Ghana_23_June_2026-248_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "james": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3e/Reece_James_England_v_Ghana_23_June_2026-248_%28cropped%29.jpg/330px-Reece_James_England_v_Ghana_23_June_2026-248_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "christopher nkunku": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/98/2022-07-30_Fu%C3%9Fball%2C_M%C3%A4nner%2C_DFL-Supercup%2C_RB_Leipzig_-_FC_Bayern_M%C3%BCnchen_1DX_3321_by_Stepro_%28cropped%29.jpg/330px-2022-07-30_Fu%C3%9Fball%2C_M%C3%A4nner%2C_DFL-Supercup%2C_RB_Leipzig_-_FC_Bayern_M%C3%BCnchen_1DX_3321_by_Stepro_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "nkunku": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/98/2022-07-30_Fu%C3%9Fball%2C_M%C3%A4nner%2C_DFL-Supercup%2C_RB_Leipzig_-_FC_Bayern_M%C3%BCnchen_1DX_3321_by_Stepro_%28cropped%29.jpg/330px-2022-07-30_Fu%C3%9Fball%2C_M%C3%A4nner%2C_DFL-Supercup%2C_RB_Leipzig_-_FC_Bayern_M%C3%BCnchen_1DX_3321_by_Stepro_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "noni madueke": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/45/Noni_Madueke_England_v_Panama_27_June_26-054.jpg/330px-Noni_Madueke_England_v_Panama_27_June_26-054.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "madueke": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/45/Noni_Madueke_England_v_Panama_27_June_26-054.jpg/330px-Noni_Madueke_England_v_Panama_27_June_26-054.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "jadon sancho": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/43/Manchester_United_v_Liverpool%2C_22_August_2022_%2833%29_%28cropped%29.jpg/330px-Manchester_United_v_Liverpool%2C_22_August_2022_%2833%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "sancho": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/43/Manchester_United_v_Liverpool%2C_22_August_2022_%2833%29_%28cropped%29.jpg/330px-Manchester_United_v_Liverpool%2C_22_August_2022_%2833%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "marcus rashford": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/54/Marcus_Rashford_England_v_Ghana_23_June_2026-073.jpg/330px-Marcus_Rashford_England_v_Ghana_23_June_2026-073.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "rashford": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/54/Marcus_Rashford_England_v_Ghana_23_June_2026-073.jpg/330px-Marcus_Rashford_England_v_Ghana_23_June_2026-073.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "alejandro garnacho": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/Alejandro_Garnacho_7_August_2022_%28cropped%29.jpg/330px-Alejandro_Garnacho_7_August_2022_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "garnacho": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/Alejandro_Garnacho_7_August_2022_%28cropped%29.jpg/330px-Alejandro_Garnacho_7_August_2022_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "rasmus hjlund": "https://upload.wikimedia.org/wikipedia/commons/d/d3/Rasmus_H%C3%B8jlund_with_a_fan.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
  "rasmus højlund": "https://upload.wikimedia.org/wikipedia/commons/d/d3/Rasmus_H%C3%B8jlund_with_a_fan.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
  "hjlund": "https://upload.wikimedia.org/wikipedia/commons/d/d3/Rasmus_H%C3%B8jlund_with_a_fan.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
  "joshua zirkzee": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e2/Joshua_Zirkzee_2019.jpg/330px-Joshua_Zirkzee_2019.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "zirkzee": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e2/Joshua_Zirkzee_2019.jpg/330px-Joshua_Zirkzee_2019.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "amad diallo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1a/Amad_Diallo_Cote_D%27Ivoire_v_Ecuador_14_June_2026-256_%28cropped_2%29.jpg/330px-Amad_Diallo_Cote_D%27Ivoire_v_Ecuador_14_June_2026-256_%28cropped_2%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "diallo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1a/Amad_Diallo_Cote_D%27Ivoire_v_Ecuador_14_June_2026-256_%28cropped_2%29.jpg/330px-Amad_Diallo_Cote_D%27Ivoire_v_Ecuador_14_June_2026-256_%28cropped_2%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "harry maguire": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/Harry_Maguire_2023_%28cropped%29.jpg/330px-Harry_Maguire_2023_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "maguire": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/Harry_Maguire_2023_%28cropped%29.jpg/330px-Harry_Maguire_2023_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "luke shaw": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b3/Luke_Shaw%2C_Manchester_United_v_Newcastle_United%2C_11_September_2021_%2844%29_%28cropped%29.jpg/330px-Luke_Shaw%2C_Manchester_United_v_Newcastle_United%2C_11_September_2021_%2844%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "shaw": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b3/Luke_Shaw%2C_Manchester_United_v_Newcastle_United%2C_11_September_2021_%2844%29_%28cropped%29.jpg/330px-Luke_Shaw%2C_Manchester_United_v_Newcastle_United%2C_11_September_2021_%2844%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "diogo dalot": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1f/Diogo_Dalot_USMNT_v_Portugal_Mar_31_2026-12.jpg/330px-Diogo_Dalot_USMNT_v_Portugal_Mar_31_2026-12.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "dalot": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1f/Diogo_Dalot_USMNT_v_Portugal_Mar_31_2026-12.jpg/330px-Diogo_Dalot_USMNT_v_Portugal_Mar_31_2026-12.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "noussair mazraoui": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/52/Noussair_Mazraoui_France_v_Morocco_9_July_2026-125_%28cropped%29.jpg/330px-Noussair_Mazraoui_France_v_Morocco_9_July_2026-125_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "mazraoui": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/52/Noussair_Mazraoui_France_v_Morocco_9_July_2026-125_%28cropped%29.jpg/330px-Noussair_Mazraoui_France_v_Morocco_9_July_2026-125_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "manuel ugarte": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2e/M.UGARTE.jpg/330px-M.UGARTE.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "ugarte": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2e/M.UGARTE.jpg/330px-M.UGARTE.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "son heungmin": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b0/BFA_2023_-2_Heung-Min_Son_%28cropped%29.jpg/330px-BFA_2023_-2_Heung-Min_Son_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "son heung-min": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b0/BFA_2023_-2_Heung-Min_Son_%28cropped%29.jpg/330px-BFA_2023_-2_Heung-Min_Son_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "heungmin": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b0/BFA_2023_-2_Heung-Min_Son_%28cropped%29.jpg/330px-BFA_2023_-2_Heung-Min_Son_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "james maddison": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/James_Maddison_pre-match_training_%28cropped%29.jpg/330px-James_Maddison_pre-match_training_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "maddison": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/James_Maddison_pre-match_training_%28cropped%29.jpg/330px-James_Maddison_pre-match_training_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "dominic solanke": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d0/Dominic_Solanke_at_Avatar_fire_and_ash_premiere_London_2025.jpg/330px-Dominic_Solanke_at_Avatar_fire_and_ash_premiere_London_2025.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "solanke": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d0/Dominic_Solanke_at_Avatar_fire_and_ash_premiere_London_2025.jpg/330px-Dominic_Solanke_at_Avatar_fire_and_ash_premiere_London_2025.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "brennan johnson": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dc/Brennan_Johnson_%28cropped%29.jpg/330px-Brennan_Johnson_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "johnson": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dc/Brennan_Johnson_%28cropped%29.jpg/330px-Brennan_Johnson_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "dejan kulusevski": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2f/Sweden-Slovenia_Nations_League_2022-09-27_17_Kulusevski_%28cropped%29.jpg/330px-Sweden-Slovenia_Nations_League_2022-09-27_17_Kulusevski_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "kulusevski": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2f/Sweden-Slovenia_Nations_League_2022-09-27_17_Kulusevski_%28cropped%29.jpg/330px-Sweden-Slovenia_Nations_League_2022-09-27_17_Kulusevski_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "richarlison": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7a/Richarlison_%C3%A9_homenageado_na_ALES_%2810.July.2019%29_08_%28cropped%29.jpg/330px-Richarlison_%C3%A9_homenageado_na_ALES_%2810.July.2019%29_08_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "pedro porro": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5e/Pedro_Porro_Argentina_v_Spain_19_July_2026-177_%28cropped%29.jpg/330px-Pedro_Porro_Argentina_v_Spain_19_July_2026-177_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "porro": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5e/Pedro_Porro_Argentina_v_Spain_19_July_2026-177_%28cropped%29.jpg/330px-Pedro_Porro_Argentina_v_Spain_19_July_2026-177_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "destiny udogie": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/Norway_Italy_-_June_2025_A_29_%28cropped%29.jpg/330px-Norway_Italy_-_June_2025_A_29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "udogie": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/Norway_Italy_-_June_2025_A_29_%28cropped%29.jpg/330px-Norway_Italy_-_June_2025_A_29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "cristian romero": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Cristian_Romero_Argentina_v_Egypt_7_July_2026-108.jpg/330px-Cristian_Romero_Argentina_v_Egypt_7_July_2026-108.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "romero": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Cristian_Romero_Argentina_v_Egypt_7_July_2026-108.jpg/330px-Cristian_Romero_Argentina_v_Egypt_7_July_2026-108.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "micky van de ven": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3f/Micky_Van_De_Ven_pre-match_training_%28cropped%29.jpg/330px-Micky_Van_De_Ven_pre-match_training_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "guglielmo vicario": "https://upload.wikimedia.org/wikipedia/commons/f/f1/Guglielmo_Vicario.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
  "vicario": "https://upload.wikimedia.org/wikipedia/commons/f/f1/Guglielmo_Vicario.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
  "pape matar sarr": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6d/Pape_Matar_Sarr_France_v_Senegal_16_June_2026-227.jpg/330px-Pape_Matar_Sarr_France_v_Senegal_16_June_2026-227.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "sarr": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6d/Pape_Matar_Sarr_France_v_Senegal_16_June_2026-227.jpg/330px-Pape_Matar_Sarr_France_v_Senegal_16_June_2026-227.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "yves bissouma": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b4/Bissouma_2018.jpg/330px-Bissouma_2018.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "bissouma": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b4/Bissouma_2018.jpg/330px-Bissouma_2018.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "ollie watkins": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4a/Ollie_Watkins_England_v_Ghana_23_June_2026-035.jpg/330px-Ollie_Watkins_England_v_Ghana_23_June_2026-035.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "watkins": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4a/Ollie_Watkins_England_v_Ghana_23_June_2026-035.jpg/330px-Ollie_Watkins_England_v_Ghana_23_June_2026-035.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "emiliano martinez": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d9/Emiliano_Martinez_Argentina_v_Spain_19_July_2026-269.jpg/330px-Emiliano_Martinez_Argentina_v_Spain_19_July_2026-269.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "emiliano martínez": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d9/Emiliano_Martinez_Argentina_v_Spain_19_July_2026-269.jpg/330px-Emiliano_Martinez_Argentina_v_Spain_19_July_2026-269.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "leon bailey": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f7/Leon_Bailey_bei_der_Saisoneroeffnung_August_2018.jpg/330px-Leon_Bailey_bei_der_Saisoneroeffnung_August_2018.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "bailey": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f7/Leon_Bailey_bei_der_Saisoneroeffnung_August_2018.jpg/330px-Leon_Bailey_bei_der_Saisoneroeffnung_August_2018.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "ezri konsa": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c7/Ezri_Konsa_England_v_Panama_27_June_26-259_%28cropped%29.jpg/330px-Ezri_Konsa_England_v_Panama_27_June_26-259_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "konsa": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c7/Ezri_Konsa_England_v_Panama_27_June_26-259_%28cropped%29.jpg/330px-Ezri_Konsa_England_v_Panama_27_June_26-259_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "pau torres": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ca/Pau_Torres_April_2026_%28cropped%29.jpg/330px-Pau_Torres_April_2026_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "torres": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ca/Pau_Torres_April_2026_%28cropped%29.jpg/330px-Pau_Torres_April_2026_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "youri tielemans": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Youri_Tielemans_USMNT_v_Belgium_Mar_28_2026-20_%28cropped%29.jpg/330px-Youri_Tielemans_USMNT_v_Belgium_Mar_28_2026-20_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "tielemans": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Youri_Tielemans_USMNT_v_Belgium_Mar_28_2026-20_%28cropped%29.jpg/330px-Youri_Tielemans_USMNT_v_Belgium_Mar_28_2026-20_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "lucas digne": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/21/Lucas_Digne_France_v_Norway_26_June_26-043.jpg/330px-Lucas_Digne_France_v_Norway_26_June_26-043.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "digne": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/21/Lucas_Digne_France_v_Norway_26_June_26-043.jpg/330px-Lucas_Digne_France_v_Norway_26_June_26-043.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "anthony gordon": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dc/Anthony_Gordon_England_v_Ghana_23_June_2026-017_%28cropped%29.jpg/330px-Anthony_Gordon_England_v_Ghana_23_June_2026-017_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "gordon": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dc/Anthony_Gordon_England_v_Ghana_23_June_2026-017_%28cropped%29.jpg/330px-Anthony_Gordon_England_v_Ghana_23_June_2026-017_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "bruno guimaraes": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/70/Bruno_Guimaraes_Brazil_V_Morocco_13_June_2026-78_%28cropped%29.jpg/330px-Bruno_Guimaraes_Brazil_V_Morocco_13_June_2026-78_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "bruno guimarães": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/70/Bruno_Guimaraes_Brazil_V_Morocco_13_June_2026-78_%28cropped%29.jpg/330px-Bruno_Guimaraes_Brazil_V_Morocco_13_June_2026-78_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "guimaraes": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/70/Bruno_Guimaraes_Brazil_V_Morocco_13_June_2026-78_%28cropped%29.jpg/330px-Bruno_Guimaraes_Brazil_V_Morocco_13_June_2026-78_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "joelinton": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5f/Joelinton_%28cropped%29.jpg/330px-Joelinton_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "kieran trippier": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d8/Kieran_Trippier_2018-07-14_1.jpg/330px-Kieran_Trippier_2018-07-14_1.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "trippier": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d8/Kieran_Trippier_2018-07-14_1.jpg/330px-Kieran_Trippier_2018-07-14_1.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "dan burn": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/14/Dan_Burn_England_v_Panama_27_June_26-048.jpg/330px-Dan_Burn_England_v_Panama_27_June_26-048.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "burn": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/14/Dan_Burn_England_v_Panama_27_June_26-048.jpg/330px-Dan_Burn_England_v_Panama_27_June_26-048.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "fabian schar": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6d/Fabian_Sch%C3%A4r.jpg/330px-Fabian_Sch%C3%A4r.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "fabian schär": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6d/Fabian_Sch%C3%A4r.jpg/330px-Fabian_Sch%C3%A4r.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "schar": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6d/Fabian_Sch%C3%A4r.jpg/330px-Fabian_Sch%C3%A4r.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "nick pope": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/93/Nick_Pope_24052026_%283%29.jpg/330px-Nick_Pope_24052026_%283%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "pope": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/93/Nick_Pope_24052026_%283%29.jpg/330px-Nick_Pope_24052026_%283%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "sandro tonali": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f5/Norway_Italy_-_June_2025_B_03.jpg/330px-Norway_Italy_-_June_2025_B_03.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "tonali": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f5/Norway_Italy_-_June_2025_B_03.jpg/330px-Norway_Italy_-_June_2025_B_03.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "kaoru mitoma": "https://upload.wikimedia.org/wikipedia/commons/6/65/Kaoru_Mitoma_2026.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
  "mitoma": "https://upload.wikimedia.org/wikipedia/commons/6/65/Kaoru_Mitoma_2026.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
  "danny welbeck": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/46/Danny_Welbeck_2018-06-13_1.jpg/330px-Danny_Welbeck_2018-06-13_1.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "welbeck": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/46/Danny_Welbeck_2018-06-13_1.jpg/330px-Danny_Welbeck_2018-06-13_1.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "lewis dunk": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/58/BHA_5_v_Espanyol_1_pre_season_30_07_2022_03.jpg/330px-BHA_5_v_Espanyol_1_pre_season_30_07_2022_03.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "dunk": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/58/BHA_5_v_Espanyol_1_pre_season_30_07_2022_03.jpg/330px-BHA_5_v_Espanyol_1_pre_season_30_07_2022_03.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "carlos baleba": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/de/Carlos_Baleba_24012026_%282%29.jpg/330px-Carlos_Baleba_24012026_%282%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "baleba": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/de/Carlos_Baleba_24012026_%282%29.jpg/330px-Carlos_Baleba_24012026_%282%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "georginio rutter": "https://upload.wikimedia.org/wikipedia/commons/6/62/Georginio_Rutter_%28cropped%29.jpeg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
  "rutter": "https://upload.wikimedia.org/wikipedia/commons/6/62/Georginio_Rutter_%28cropped%29.jpeg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
  "yankuba minteh": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bb/Yankuba_Minteh_24012026_%281%29.jpg/330px-Yankuba_Minteh_24012026_%281%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "minteh": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bb/Yankuba_Minteh_24012026_%281%29.jpg/330px-Yankuba_Minteh_24012026_%281%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "eberechi eze": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c5/Eberechi_Eze_England_v_Ghana_23_June_2026-039.jpg/330px-Eberechi_Eze_England_v_Ghana_23_June_2026-039.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "jeanphilippe mateta": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/Jean-Philippe_Mateta_France_v_Senegal_16_June_2026-408_%28cropped%29.jpg/330px-Jean-Philippe_Mateta_France_v_Senegal_16_June_2026-408_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "jean-philippe mateta": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/Jean-Philippe_Mateta_France_v_Senegal_16_June_2026-408_%28cropped%29.jpg/330px-Jean-Philippe_Mateta_France_v_Senegal_16_June_2026-408_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "mateta": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/Jean-Philippe_Mateta_France_v_Senegal_16_June_2026-408_%28cropped%29.jpg/330px-Jean-Philippe_Mateta_France_v_Senegal_16_June_2026-408_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "marc guehi": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dd/Marc_Guehi_England_v_Panama_27_June_26-182.jpg/330px-Marc_Guehi_England_v_Panama_27_June_26-182.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "marc guéhi": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dd/Marc_Guehi_England_v_Panama_27_June_26-182.jpg/330px-Marc_Guehi_England_v_Panama_27_June_26-182.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "guehi": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dd/Marc_Guehi_England_v_Panama_27_June_26-182.jpg/330px-Marc_Guehi_England_v_Panama_27_June_26-182.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "daniel munoz": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/Daniel_Mu%C3%B1oz%2C_Colombia_NT_presidential_send-off%2C_Jun_2026.jpg/330px-Daniel_Mu%C3%B1oz%2C_Colombia_NT_presidential_send-off%2C_Jun_2026.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "daniel muñoz": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/Daniel_Mu%C3%B1oz%2C_Colombia_NT_presidential_send-off%2C_Jun_2026.jpg/330px-Daniel_Mu%C3%B1oz%2C_Colombia_NT_presidential_send-off%2C_Jun_2026.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "munoz": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/Daniel_Mu%C3%B1oz%2C_Colombia_NT_presidential_send-off%2C_Jun_2026.jpg/330px-Daniel_Mu%C3%B1oz%2C_Colombia_NT_presidential_send-off%2C_Jun_2026.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "dean henderson": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0d/Dean_Henderson_England_v_Panama_27_June_26-039.jpg/330px-Dean_Henderson_England_v_Panama_27_June_26-039.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "henderson": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0d/Dean_Henderson_England_v_Panama_27_June_26-039.jpg/330px-Dean_Henderson_England_v_Panama_27_June_26-039.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "adam wharton": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b6/Fredrikstad_Fotballklubb_v_Crystal_Palace_FC%2C_28_August_2025_B06_%28cropped%29.jpg/330px-Fredrikstad_Fotballklubb_v_Crystal_Palace_FC%2C_28_August_2025_B06_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "wharton": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b6/Fredrikstad_Fotballklubb_v_Crystal_Palace_FC%2C_28_August_2025_B06_%28cropped%29.jpg/330px-Fredrikstad_Fotballklubb_v_Crystal_Palace_FC%2C_28_August_2025_B06_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "yoane wissa": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9b/CAN_2023RD_Congo_2-1_Guin%C3%A9e_9939_%28cropped%29.jpg/330px-CAN_2023RD_Congo_2-1_Guin%C3%A9e_9939_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "wissa": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9b/CAN_2023RD_Congo_2-1_Guin%C3%A9e_9939_%28cropped%29.jpg/330px-CAN_2023RD_Congo_2-1_Guin%C3%A9e_9939_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "vitaly janelt": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c6/Vitaly_Janelt.jpg/330px-Vitaly_Janelt.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "janelt": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c6/Vitaly_Janelt.jpg/330px-Vitaly_Janelt.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "ethan pinnock": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/54/Ethan_Pinnock%2C_Brentford_F.C._footballer%2C_November_2025.jpg/330px-Ethan_Pinnock%2C_Brentford_F.C._footballer%2C_November_2025.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "pinnock": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/54/Ethan_Pinnock%2C_Brentford_F.C._footballer%2C_November_2025.jpg/330px-Ethan_Pinnock%2C_Brentford_F.C._footballer%2C_November_2025.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "mark flekken": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/17/Flekken%2C_Mark_Greuther_F%C3%BCrth_15-16_WP_%28cropped%29.jpg/330px-Flekken%2C_Mark_Greuther_F%C3%BCrth_15-16_WP_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "flekken": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/17/Flekken%2C_Mark_Greuther_F%C3%BCrth_15-16_WP_%28cropped%29.jpg/330px-Flekken%2C_Mark_Greuther_F%C3%BCrth_15-16_WP_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "chris wood": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/67/Chris_Wood_%28cropped%29.jpg/330px-Chris_Wood_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "wood": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/67/Chris_Wood_%28cropped%29.jpg/330px-Chris_Wood_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "callum hudsonodoi": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b6/Callum_Hudson-Odoi_for_Nottingham_Forest_vs_AS_Monaco_by_Sebastian_Alston_%28cropped%29.jpg/330px-Callum_Hudson-Odoi_for_Nottingham_Forest_vs_AS_Monaco_by_Sebastian_Alston_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "callum hudson-odoi": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b6/Callum_Hudson-Odoi_for_Nottingham_Forest_vs_AS_Monaco_by_Sebastian_Alston_%28cropped%29.jpg/330px-Callum_Hudson-Odoi_for_Nottingham_Forest_vs_AS_Monaco_by_Sebastian_Alston_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "hudsonodoi": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b6/Callum_Hudson-Odoi_for_Nottingham_Forest_vs_AS_Monaco_by_Sebastian_Alston_%28cropped%29.jpg/330px-Callum_Hudson-Odoi_for_Nottingham_Forest_vs_AS_Monaco_by_Sebastian_Alston_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "anthony elanga": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c9/Anthony_Elanga_France_v_Sweden_6.30.26-040.jpg/330px-Anthony_Elanga_France_v_Sweden_6.30.26-040.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "elanga": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c9/Anthony_Elanga_France_v_Sweden_6.30.26-040.jpg/330px-Anthony_Elanga_France_v_Sweden_6.30.26-040.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "murillo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d7/Murillo_and_Tony_Loughlan_22122025_%281%29_%28Murillo_Santiago_Costa_dos_Santos%29.jpg/330px-Murillo_and_Tony_Loughlan_22122025_%281%29_%28Murillo_Santiago_Costa_dos_Santos%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "matz sels": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/31/Matz_Sels_USMNT_v_Belgium_Mar_28_2026-12_%28cropped%29.jpg/330px-Matz_Sels_USMNT_v_Belgium_Mar_28_2026-12_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "sels": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/31/Matz_Sels_USMNT_v_Belgium_Mar_28_2026-12_%28cropped%29.jpg/330px-Matz_Sels_USMNT_v_Belgium_Mar_28_2026-12_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "jarrod bowen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/31/JarrodBowen2023_%28cropped%29.jpeg/330px-JarrodBowen2023_%28cropped%29.jpeg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "bowen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/31/JarrodBowen2023_%28cropped%29.jpeg/330px-JarrodBowen2023_%28cropped%29.jpeg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "lucas paqueta": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0c/Lucas_Paqueta_Brazil_V_Morocco_13_June_2026-134_%28cropped%29.jpg/330px-Lucas_Paqueta_Brazil_V_Morocco_13_June_2026-134_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "lucas paquetá": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0c/Lucas_Paqueta_Brazil_V_Morocco_13_June_2026-134_%28cropped%29.jpg/330px-Lucas_Paqueta_Brazil_V_Morocco_13_June_2026-134_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "paqueta": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0c/Lucas_Paqueta_Brazil_V_Morocco_13_June_2026-134_%28cropped%29.jpg/330px-Lucas_Paqueta_Brazil_V_Morocco_13_June_2026-134_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "tomas soucek": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d6/Tom%C3%A1%C5%A1_Sou%C4%8Dek_WHU.jpeg/330px-Tom%C3%A1%C5%A1_Sou%C4%8Dek_WHU.jpeg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "tomáš souček": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d6/Tom%C3%A1%C5%A1_Sou%C4%8Dek_WHU.jpeg/330px-Tom%C3%A1%C5%A1_Sou%C4%8Dek_WHU.jpeg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "soucek": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d6/Tom%C3%A1%C5%A1_Sou%C4%8Dek_WHU.jpeg/330px-Tom%C3%A1%C5%A1_Sou%C4%8Dek_WHU.jpeg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "alphonse areola": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2c/2019-07-17_SG_Dynamo_Dresden_vs._Paris_Saint-Germain_by_Sandro_Halank%E2%80%93011_%28cropped%29.jpg/330px-2019-07-17_SG_Dynamo_Dresden_vs._Paris_Saint-Germain_by_Sandro_Halank%E2%80%93011_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "areola": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2c/2019-07-17_SG_Dynamo_Dresden_vs._Paris_Saint-Germain_by_Sandro_Halank%E2%80%93011_%28cropped%29.jpg/330px-2019-07-17_SG_Dynamo_Dresden_vs._Paris_Saint-Germain_by_Sandro_Halank%E2%80%93011_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "hwang heechan": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/240622_%ED%99%A9%ED%9D%AC%EC%B0%AC_%ED%92%8B%EB%B3%BC_%ED%8E%98%EC%8A%A4%ED%8B%B0%EB%B2%8C.jpg/330px-240622_%ED%99%A9%ED%9D%AC%EC%B0%AC_%ED%92%8B%EB%B3%BC_%ED%8E%98%EC%8A%A4%ED%8B%B0%EB%B2%8C.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "hwang hee-chan": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/240622_%ED%99%A9%ED%9D%AC%EC%B0%AC_%ED%92%8B%EB%B3%BC_%ED%8E%98%EC%8A%A4%ED%8B%B0%EB%B2%8C.jpg/330px-240622_%ED%99%A9%ED%9D%AC%EC%B0%AC_%ED%92%8B%EB%B3%BC_%ED%8E%98%EC%8A%A4%ED%8B%B0%EB%B2%8C.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "heechan": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/240622_%ED%99%A9%ED%9D%AC%EC%B0%AC_%ED%92%8B%EB%B3%BC_%ED%8E%98%EC%8A%A4%ED%8B%B0%EB%B2%8C.jpg/330px-240622_%ED%99%A9%ED%9D%AC%EC%B0%AC_%ED%92%8B%EB%B3%BC_%ED%8E%98%EC%8A%A4%ED%8B%B0%EB%B2%8C.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "mario lemina": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fc/RC_Lens_-_OGC_Nice_%2810-04-2022%29_50.jpg/330px-RC_Lens_-_OGC_Nice_%2810-04-2022%29_50.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "lemina": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fc/RC_Lens_-_OGC_Nice_%2810-04-2022%29_50.jpg/330px-RC_Lens_-_OGC_Nice_%2810-04-2022%29_50.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "rayan aitnouri": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7b/Rayan_A%C3%AFt-Nouri_playing_for_Algeria_in_2024.jpg/330px-Rayan_A%C3%AFt-Nouri_playing_for_Algeria_in_2024.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "rayan aït-nouri": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7b/Rayan_A%C3%AFt-Nouri_playing_for_Algeria_in_2024.jpg/330px-Rayan_A%C3%AFt-Nouri_playing_for_Algeria_in_2024.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "aitnouri": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7b/Rayan_A%C3%AFt-Nouri_playing_for_Algeria_in_2024.jpg/330px-Rayan_A%C3%AFt-Nouri_playing_for_Algeria_in_2024.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "jose sa": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/38/Jos%C3%A9_S%C3%A1_USMNT_v_Portugal_Mar_31_2026-185_%28cropped%29.jpg/330px-Jos%C3%A9_S%C3%A1_USMNT_v_Portugal_Mar_31_2026-185_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "josé sá": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/38/Jos%C3%A9_S%C3%A1_USMNT_v_Portugal_Mar_31_2026-185_%28cropped%29.jpg/330px-Jos%C3%A9_S%C3%A1_USMNT_v_Portugal_Mar_31_2026-185_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "jordan pickford": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4f/Jordan_Pickford_England_v_Ghana_23_June_2026-316_%28cropped%29.jpg/330px-Jordan_Pickford_England_v_Ghana_23_June_2026-316_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "pickford": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4f/Jordan_Pickford_England_v_Ghana_23_June_2026-316_%28cropped%29.jpg/330px-Jordan_Pickford_England_v_Ghana_23_June_2026-316_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "james tarkowski": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1c/James_Tarkowski_%28Oct_2017%29.jpg/330px-James_Tarkowski_%28Oct_2017%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "tarkowski": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1c/James_Tarkowski_%28Oct_2017%29.jpg/330px-James_Tarkowski_%28Oct_2017%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "jarrad branthwaite": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/86/Celebration%21_%2854493257432%29_%28Jarrad_Branthwaite%29.jpg/330px-Celebration%21_%2854493257432%29_%28Jarrad_Branthwaite%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "branthwaite": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/86/Celebration%21_%2854493257432%29_%28Jarrad_Branthwaite%29.jpg/330px-Celebration%21_%2854493257432%29_%28Jarrad_Branthwaite%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "idrissa gueye": "https://upload.wikimedia.org/wikipedia/commons/a/ac/Idrissa_Gueye_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
  "gueye": "https://upload.wikimedia.org/wikipedia/commons/a/ac/Idrissa_Gueye_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
  "vitalii mykolenko": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ca/%D0%92%D0%B8%D1%82%D0%B0%D0%BB%D0%B8%D0%B9_%D0%9C%D0%B8%D0%BA%D0%BE%D0%BB%D0%B5%D0%BD%D0%BA%D0%BE_%E2%80%94_1182449_%28cropped%29.jpg/330px-%D0%92%D0%B8%D1%82%D0%B0%D0%BB%D0%B8%D0%B9_%D0%9C%D0%B8%D0%BA%D0%BE%D0%BB%D0%B5%D0%BD%D0%BA%D0%BE_%E2%80%94_1182449_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "mykolenko": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ca/%D0%92%D0%B8%D1%82%D0%B0%D0%BB%D0%B8%D0%B9_%D0%9C%D0%B8%D0%BA%D0%BE%D0%BB%D0%B5%D0%BD%D0%BA%D0%BE_%E2%80%94_1182449_%28cropped%29.jpg/330px-%D0%92%D0%B8%D1%82%D0%B0%D0%BB%D0%B8%D0%B9_%D0%9C%D0%B8%D0%BA%D0%BE%D0%BB%D0%B5%D0%BD%D0%BA%D0%BE_%E2%80%94_1182449_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "justin kluivert": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/41/Justin_Kluivert_09052026_%281%29.jpg/330px-Justin_Kluivert_09052026_%281%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "kluivert": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/41/Justin_Kluivert_09052026_%281%29.jpg/330px-Justin_Kluivert_09052026_%281%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "kepa arrizabalaga": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/89/Kepa_Arrizabalaga_2021_%28cropped%29.jpg/330px-Kepa_Arrizabalaga_2021_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "arrizabalaga": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/89/Kepa_Arrizabalaga_2021_%28cropped%29.jpg/330px-Kepa_Arrizabalaga_2021_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "milos kerkez": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/Milot_Kerkez_%28cropped%29.png/330px-Milot_Kerkez_%28cropped%29.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "kerkez": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/Milot_Kerkez_%28cropped%29.png/330px-Milot_Kerkez_%28cropped%29.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "raul jimenez": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/de/Ra%C3%BAl_Jim%C3%A9nez_04032026_%281%29.jpg/330px-Ra%C3%BAl_Jim%C3%A9nez_04032026_%281%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "raúl jiménez": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/de/Ra%C3%BAl_Jim%C3%A9nez_04032026_%281%29.jpg/330px-Ra%C3%BAl_Jim%C3%A9nez_04032026_%281%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "jimenez": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/de/Ra%C3%BAl_Jim%C3%A9nez_04032026_%281%29.jpg/330px-Ra%C3%BAl_Jim%C3%A9nez_04032026_%281%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "alex iwobi": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b4/Issa_Diop%2C_Alex_Iwobi_and_Antonee_Robinson_04032026_%281%29_%28cropped%29.jpg/330px-Issa_Diop%2C_Alex_Iwobi_and_Antonee_Robinson_04032026_%281%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "iwobi": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b4/Issa_Diop%2C_Alex_Iwobi_and_Antonee_Robinson_04032026_%281%29_%28cropped%29.jpg/330px-Issa_Diop%2C_Alex_Iwobi_and_Antonee_Robinson_04032026_%281%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "andreas pereira": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b4/Andreas-Pereira-Palmeiras-Internacional-sep2025_%28cropped%29.jpg/330px-Andreas-Pereira-Palmeiras-Internacional-sep2025_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "pereira": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b4/Andreas-Pereira-Palmeiras-Internacional-sep2025_%28cropped%29.jpg/330px-Andreas-Pereira-Palmeiras-Internacional-sep2025_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "adama traore": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/68/Adama_Traor%C3%A9_14092024.jpg/330px-Adama_Traor%C3%A9_14092024.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "adama traoré": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/68/Adama_Traor%C3%A9_14092024.jpg/330px-Adama_Traor%C3%A9_14092024.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "traore": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/68/Adama_Traor%C3%A9_14092024.jpg/330px-Adama_Traor%C3%A9_14092024.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "antonee robinson": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3a/Antonee_Robinson_Australia_v_USA_19_June_2026-24_%28cropped%29.jpg/330px-Antonee_Robinson_Australia_v_USA_19_June_2026-24_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "robinson": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3a/Antonee_Robinson_Australia_v_USA_19_June_2026-24_%28cropped%29.jpg/330px-Antonee_Robinson_Australia_v_USA_19_June_2026-24_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "bernd leno": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/29/Bernd_Leno_24052026_%282%29.jpg/330px-Bernd_Leno_24052026_%282%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "leno": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/29/Bernd_Leno_24052026_%282%29.jpg/330px-Bernd_Leno_24052026_%282%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "de bruyne": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Kevin_De_Bruyne_USMNT_v_Belgium_Mar_28_2026-64_%28cropped%29.jpg/330px-Kevin_De_Bruyne_USMNT_v_Belgium_Mar_28_2026-64_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "kdb": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Kevin_De_Bruyne_USMNT_v_Belgium_Mar_28_2026-64_%28cropped%29.jpg/330px-Kevin_De_Bruyne_USMNT_v_Belgium_Mar_28_2026-64_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "bernardo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/Bernardo_Silva_Croatia_v_Portugal_2_July_2026-238.jpg/330px-Bernardo_Silva_Croatia_v_Portugal_2_July_2026-238.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "gabriel": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8e/Gabriel_Magalhaes_Brazil_V_Morocco_13_June_2026-132_%28cropped%29.jpg/330px-Gabriel_Magalhaes_Brazil_V_Morocco_13_June_2026-132_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "odegaard": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/13/Martin_Odegaard_France_v_Norway_26_June_26-014.jpg/330px-Martin_Odegaard_France_v_Norway_26_June_26-014.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "van dijk": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/20160604_AUT_NED_8876_%28cropped%29.jpg/330px-20160604_AUT_NED_8876_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "trent": "https://upload.wikimedia.org/wikipedia/commons/5/5d/Trent_Alexander-Arnold_2018_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
  "alisson": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4f/Alisson_Becker_Brazil_V_Morocco_13_June_2026-117_%28cropped%29.jpg/330px-Alisson_Becker_Brazil_V_Morocco_13_June_2026-117_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "mac allister": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/db/Alexis_Mac_Allister_Argentina_v_Spain_19_July_2026-162_%28cropped%29.jpg/330px-Alexis_Mac_Allister_Argentina_v_Spain_19_July_2026-162_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "hojlund": "https://upload.wikimedia.org/wikipedia/commons/d/d3/Rasmus_H%C3%B8jlund_with_a_fan.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
  "amad": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1a/Amad_Diallo_Cote_D%27Ivoire_v_Ecuador_14_June_2026-256_%28cropped_2%29.jpg/330px-Amad_Diallo_Cote_D%27Ivoire_v_Ecuador_14_June_2026-256_%28cropped_2%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "de ligt": "https://upload.wikimedia.org/wikipedia/commons/c/c9/2022-07-30_Fu%C3%9Fball%2C_M%C3%A4nner%2C_DFL-Supercup%2C_RB_Leipzig_-_FC_Bayern_M%C3%BCnchen_Matthijs_de_Ligt_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
  "son": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b0/BFA_2023_-2_Heung-Min_Son_%28cropped%29.jpg/330px-BFA_2023_-2_Heung-Min_Son_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "van de ven": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3f/Micky_Van_De_Ven_pre-match_training_%28cropped%29.jpg/330px-Micky_Van_De_Ven_pre-match_training_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "eze": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c5/Eberechi_Eze_England_v_Ghana_23_June_2026-039.jpg/330px-Eberechi_Eze_England_v_Ghana_23_June_2026-039.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "hudson-odoi": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b6/Callum_Hudson-Odoi_for_Nottingham_Forest_vs_AS_Monaco_by_Sebastian_Alston_%28cropped%29.jpg/330px-Callum_Hudson-Odoi_for_Nottingham_Forest_vs_AS_Monaco_by_Sebastian_Alston_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "kepa": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/89/Kepa_Arrizabalaga_2021_%28cropped%29.jpg/330px-Kepa_Arrizabalaga_2021_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
};

// In-memory cache for dynamic lookups
const memoryCache = new Map<string, string>();

/**
 * Returns a verified player photo with exact matching and intelligent short-name / alias resolution.
 */
export function getKnownPlayerPhoto(name: string, shortName?: string): string | undefined {
  if (!name && !shortName) return undefined;
  const norm = name ? normalizePlayerName(name) : '';
  const shortNorm = shortName ? normalizePlayerName(shortName) : '';

  // 1. Direct verified match on full name
  if (norm && VERIFIED_PORTRAITS[norm]) return VERIFIED_PORTRAITS[norm];

  // 2. Direct verified match on raw lowercase name
  if (name && VERIFIED_PORTRAITS[name.toLowerCase()]) return VERIFIED_PORTRAITS[name.toLowerCase()];

  // 3. Direct verified match on short name
  if (shortNorm && VERIFIED_PORTRAITS[shortNorm]) return VERIFIED_PORTRAITS[shortNorm];

  // 4. Memory cache lookup
  if (norm && memoryCache.has(norm)) return memoryCache.get(norm);
  if (shortNorm && memoryCache.has(shortNorm)) return memoryCache.get(shortNorm);

  // 5. Partial token match against verified dictionary
  if (norm) {
    const tokens = norm.split(' ').filter((t) => t.length > 2);
    for (const token of tokens) {
      if (VERIFIED_PORTRAITS[token]) {
        return VERIFIED_PORTRAITS[token];
      }
    }
  }

  // 6. Check localStorage if available in browser
  if (typeof window !== 'undefined' && window.localStorage && norm) {
    try {
      const stored = localStorage.getItem(`pl_photo_${norm}`);
      if (stored) {
        memoryCache.set(norm, stored);
        return stored;
      }
    } catch {
      // ignore
    }
  }

  return undefined;
}

/**
 * Dynamically resolves real footballer portrait from Wikipedia using the Search Generator API.
 */
export async function resolvePlayerPhoto(name: string, shortName?: string): Promise<string | undefined> {
  const cached = getKnownPlayerPhoto(name, shortName);
  if (cached) return cached;

  const norm = normalizePlayerName(name);
  if (!norm || norm.length < 3) return undefined;

  try {
    const cleanSearch = name.replace(/[\uFFFD]/g, ' ').replace(/\s+/g, ' ').trim();
    const query = encodeURIComponent(`${cleanSearch} footballer`);
    const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${query}&gsrlimit=1&prop=pageimages&pithumbsize=320&format=json&origin=*`;

    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) return undefined;

    const data = await res.json();
    const pages = data?.query?.pages;
    if (!pages) return undefined;

    for (const pageId in pages) {
      const page = pages[pageId];
      if (page?.thumbnail?.source) {
        const photo = page.thumbnail.source;
        memoryCache.set(norm, photo);
        if (shortName) {
          memoryCache.set(normalizePlayerName(shortName), photo);
        }
        if (typeof window !== 'undefined' && window.localStorage) {
          try {
            localStorage.setItem(`pl_photo_${norm}`, photo);
          } catch {
            // ignore quota
          }
        }
        return photo;
      }
    }
  } catch {
    // Network errors handled gracefully
  }

  return undefined;
}

/**
 * Generates a high-definition club-crested player avatar card
 * with official club colors, gradient, club abbreviation, and initials.
 */
export function getPlayerFallbackSvg(name: string, team: string): string {
  const initials = name
    .replace(/[\uFFFD]/g, '')
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const teamSchemes: Record<string, { bg1: string; bg2: string; accent: string; code: string }> = {
    Arsenal: { bg1: '#DB0007', bg2: '#060B14', accent: '#9C824A', code: 'ARS' },
    'Aston Villa': { bg1: '#670E36', bg2: '#0B1220', accent: '#95BFE5', code: 'AVL' },
    Bournemouth: { bg1: '#DA291C', bg2: '#060B14', accent: '#000000', code: 'BOU' },
    'AFC Bournemouth': { bg1: '#DA291C', bg2: '#060B14', accent: '#000000', code: 'BOU' },
    Brentford: { bg1: '#E30613', bg2: '#060B14', accent: '#FEE12B', code: 'BRE' },
    Brighton: { bg1: '#0057B8', bg2: '#060B14', accent: '#FFCD00', code: 'BHA' },
    'Brighton and Hove Albion': { bg1: '#0057B8', bg2: '#060B14', accent: '#FFCD00', code: 'BHA' },
    'Brighton & Hove Albion': { bg1: '#0057B8', bg2: '#060B14', accent: '#FFCD00', code: 'BHA' },
    Chelsea: { bg1: '#034694', bg2: '#060B14', accent: '#38bdf8', code: 'CHE' },
    'Crystal Palace': { bg1: '#1B458F', bg2: '#060B14', accent: '#C4122E', code: 'CRY' },
    Everton: { bg1: '#003399', bg2: '#060B14', accent: '#38bdf8', code: 'EVE' },
    Fulham: { bg1: '#111827', bg2: '#060B14', accent: '#CC0000', code: 'FUL' },
    Ipswich: { bg1: '#002B49', bg2: '#060B14', accent: '#E03A3E', code: 'IPS' },
    'Ipswich Town': { bg1: '#002B49', bg2: '#060B14', accent: '#E03A3E', code: 'IPS' },
    Leicester: { bg1: '#003090', bg2: '#060B14', accent: '#FDBE11', code: 'LEI' },
    'Leicester City': { bg1: '#003090', bg2: '#060B14', accent: '#FDBE11', code: 'LEI' },
    Liverpool: { bg1: '#C8102E', bg2: '#060B14', accent: '#00B2A9', code: 'LIV' },
    'Man City': { bg1: '#6CABDD', bg2: '#0B162C', accent: '#38bdf8', code: 'MCI' },
    'Manchester City': { bg1: '#6CABDD', bg2: '#0B162C', accent: '#38bdf8', code: 'MCI' },
    'Man Utd': { bg1: '#DA291C', bg2: '#060B14', accent: '#FBE122', code: 'MUN' },
    'Man United': { bg1: '#DA291C', bg2: '#060B14', accent: '#FBE122', code: 'MUN' },
    'Manchester United': { bg1: '#DA291C', bg2: '#060B14', accent: '#FBE122', code: 'MUN' },
    Newcastle: { bg1: '#1F2937', bg2: '#060B14', accent: '#38bdf8', code: 'NEW' },
    'Newcastle United': { bg1: '#1F2937', bg2: '#060B14', accent: '#38bdf8', code: 'NEW' },
    "Nott'm Forest": { bg1: '#DD0000', bg2: '#060B14', accent: '#FFFFFF', code: 'NFO' },
    'Nottingham Forest': { bg1: '#DD0000', bg2: '#060B14', accent: '#FFFFFF', code: 'NFO' },
    Southampton: { bg1: '#D71920', bg2: '#060B14', accent: '#FFC20E', code: 'SOU' },
    Spurs: { bg1: '#132257', bg2: '#060B14', accent: '#38bdf8', code: 'TOT' },
    Tottenham: { bg1: '#132257', bg2: '#060B14', accent: '#38bdf8', code: 'TOT' },
    'Tottenham Hotspur': { bg1: '#132257', bg2: '#060B14', accent: '#38bdf8', code: 'TOT' },
    'West Ham': { bg1: '#7A263A', bg2: '#060B14', accent: '#1BB1E7', code: 'WHU' },
    'West Ham United': { bg1: '#7A263A', bg2: '#060B14', accent: '#1BB1E7', code: 'WHU' },
    Wolves: { bg1: '#FDB913', bg2: '#060B14', accent: '#111827', code: 'WOL' },
    'Wolverhampton Wanderers': { bg1: '#FDB913', bg2: '#060B14', accent: '#111827', code: 'WOL' },
    'Hull City': { bg1: '#F5A623', bg2: '#060B14', accent: '#000000', code: 'HUL' },
    Leeds: { bg1: '#1D4ED8', bg2: '#060B14', accent: '#FACC15', code: 'LEE' },
    'Leeds United': { bg1: '#1D4ED8', bg2: '#060B14', accent: '#FACC15', code: 'LEE' },
    Sunderland: { bg1: '#DC2626', bg2: '#060B14', accent: '#FFFFFF', code: 'SUN' },
    Coventry: { bg1: '#38BDF8', bg2: '#060B14', accent: '#1E293B', code: 'COV' },
    'Coventry City': { bg1: '#38BDF8', bg2: '#060B14', accent: '#1E293B', code: 'COV' },
  };

  const scheme = teamSchemes[team] ?? { bg1: '#0f172a', bg2: '#060b14', accent: '#38bdf8', code: 'PL' };

  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140" width="100%" height="100%">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${scheme.bg1}"/>
          <stop offset="100%" stop-color="${scheme.bg2}"/>
        </linearGradient>
      </defs>
      <rect width="140" height="140" rx="20" fill="url(#bg)"/>
      <rect x="6" y="6" width="128" height="128" rx="16" fill="none" stroke="${scheme.accent}" stroke-width="1.5" stroke-opacity="0.3"/>
      
      <!-- Top Team Tag -->
      <rect x="42" y="14" width="56" height="18" rx="9" fill="rgba(0,0,0,0.5)" stroke="${scheme.accent}" stroke-width="1" stroke-opacity="0.4"/>
      <text x="70" y="27" text-anchor="middle" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif" font-size="10" font-weight="800" fill="#ffffff" letter-spacing="1.5">${scheme.code}</text>
      
      <!-- Player Initials Monogram -->
      <circle cx="70" cy="74" r="32" fill="rgba(255,255,255,0.06)" stroke="${scheme.accent}" stroke-width="2"/>
      <text x="70" y="82" text-anchor="middle" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif" font-size="22" font-weight="900" fill="#ffffff">${initials || 'PL'}</text>
      
      <!-- Subtle bottom floodlight bar -->
      <rect x="25" y="122" width="90" height="3" rx="1.5" fill="${scheme.accent}" fill-opacity="0.7"/>
    </svg>`
  )}`;
}

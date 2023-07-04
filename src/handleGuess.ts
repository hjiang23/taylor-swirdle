import data from './data.json';

const albumOrder = new Map();
albumOrder.set("Taylor Swift", 0);
albumOrder.set("Fearless (Taylor's Version)", 1);
albumOrder.set("Speak Now", 2);
albumOrder.set("Red (Taylor's Version)", 3);
albumOrder.set("1989", 4);
albumOrder.set("reputation", 5);
albumOrder.set("Lover", 6);
albumOrder.set("folklore", 7);
albumOrder.set("evermore", 8);
albumOrder.set("Midnights", 9);

interface DataEntry {
    album_name: string;
    ep: string;
    album_release: string;
    track_number: number;
    track_name: string;
    artist: string;
    featuring: string;
    bonus_track: string;
    duration_ms: number;
}
  
function makeGuess(guess: string, ans: number, map: any) {
    const guessObj = data[map.get(guess)];
    const ansObj = data[ans];
    return {
      track_name: {track_name: guessObj.track_name, correctness: guessObj.track_name === ansObj.track_name ? 2 : 0},
      first_letter: handleFirstLetter(guessObj, ansObj),
      album: handleAlbum(guessObj, ansObj),
      track_number: handleTrackNumber(guessObj, ansObj),
      ft: handleFeatures(guessObj, ansObj),
      bonus: handleBonus(guessObj, ansObj),
      duration: handleDuration(guessObj, ansObj)
    };
}
  
function handleFirstLetter(guessObj: DataEntry, ansObj: DataEntry) {
    let correctness;
    const a = guessObj.track_name.toUpperCase().charCodeAt(0);
    const b = ansObj.track_name.toUpperCase().charCodeAt(0);
    
    if (a === b) {
      correctness = 2;
    }
    else {
      correctness = Math.abs(a - b) > 2 ? 0 : 1;
    }
  
    return {letter: guessObj.track_name.toUpperCase().charAt(0), correctness: correctness, direction: correctness === 2 ? 0 : a < b ? 1 : -1};
}
  
function handleAlbum(guessObj: DataEntry, ansObj: DataEntry) {
  
    let correctness;
  
    if (guessObj.album_name === ansObj.album_name) {
      correctness = 2;
    }
    else {
      correctness = Math.abs(albumOrder.get(guessObj.album_name) - albumOrder.get(ansObj.album_name)) > 1 ? 0 : 1; 
    }
  
    return {album: guessObj.album_name, correctness: correctness};
}
  
function handleTrackNumber(guessObj: DataEntry, ansObj: DataEntry) {
    let correctness;
  
    if (guessObj.track_number === ansObj.track_number) {
      correctness = 2;
    }
    else {
      correctness = Math.abs(guessObj.track_number - ansObj.track_number) > 2 ? 0 : 1; 
    }
  
    return {track_number: guessObj.track_number, correctness: correctness, direction: correctness === 2 ? 0 : guessObj.track_number < ansObj.track_number ? 1 : -1};
}
  
function handleFeatures(guessObj: DataEntry, ansObj: DataEntry) {
    let correctness;
  
    if (guessObj.featuring === ansObj.featuring) {
      correctness = 2;
    }
    else {
      correctness = guessObj.featuring !== "NA" && ansObj.featuring !== "NA" ? 1 : 0;
    }
  
    return {featuring: guessObj.featuring === "NA" ? "None" : guessObj.featuring, correctness: correctness};
}
  
function handleBonus(guessObj: DataEntry, ansObj: DataEntry) {
  
    let bonus, ansBonus, correctness;
  
    bonus = guessObj.bonus_track === "TRUE" ? "Bonus Track" : guessObj.track_name.includes("From The Vault") ? "Vault Track" : "Neither";
    ansBonus = ansObj.bonus_track === "TRUE" ? "Bonus Track" : ansObj.track_name.includes("From The Vault") ? "Vault Track" : "Neither";
  
    correctness = bonus === ansBonus ? 2 : ansBonus !== "Neither" && bonus !== "Neither" ? 1 : 0;
  
    return {bonus: bonus, correctness: correctness};
}
  
function handleDuration(guessObj: DataEntry, ansObj: DataEntry) {
    const diff = Math.round(Math.abs(guessObj.duration_ms - ansObj.duration_ms) / 1000);
    let time: any = Math.round(guessObj.duration_ms / 1000);
    time = (time-(time%=60))/60+(9<time?':':':0')+time;
    const correctness = guessObj.track_name === ansObj.track_name ? 2 : diff <= 10 ? 1 : 0;
  
    return {duration: time, correctness: correctness, direction: correctness === 2 ? 0 : guessObj.duration_ms < ansObj.duration_ms ? 1 : -1};
}

export default makeGuess;
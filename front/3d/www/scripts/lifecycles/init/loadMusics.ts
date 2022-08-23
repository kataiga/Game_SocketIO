import { THREE } from "enable3d";
const audiosList: string[] = ["flair.wav", "background_town.mp3"];
export default async (): Promise<Map<string, AudioBuffer>> => {
    const audioLoader = new THREE.AudioLoader();
    let loadedMap: Map<string, AudioBuffer> = new Map();
    for (const audio of audiosList) {
        const load = await audioLoader.loadAsync("assets/audio/" + audio);
        loadedMap.set(audio, load);
    }
    return loadedMap;
}
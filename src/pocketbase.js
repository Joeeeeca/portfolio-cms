import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

// disable auto-cancellation so Vite StrictMode doesn't cancel requests
pb.autoCancellation(false);

window.pb = pb;

export default pb;
